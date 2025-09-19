import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { db } from "../../../../firebase/adminConfig";
import PDFParser from "pdf2json";

async function extractText(buffer:Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", (errData) => {
      if ('parserError' in errData) {
        reject(errData.parserError);
      } else {
        reject(errData);
      }
    });
    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      const text = pdfData.Pages.map((page: any) =>
        page.Texts.map((t: any) =>
          decodeURIComponent(t.R[0].T)
        ).join(" ")
      ).join("\n");
      resolve(text);
    });

    pdfParser.parseBuffer(buffer);
  });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const uid = formData.get("uid") as string;

    if (!uid) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const parsedText = await extractText(buffer);

    console.log("Uploading file to Cloudinary...");
    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: "raw", folder: "documents" },
        (err, result) => {
          if (err) {
            console.error("Cloudinary upload failed:", err);
            reject(err);
          } else {
            resolve(result);
          }
        }
      ).end(buffer);
    });

    console.log("Cloudinary response:", uploadResponse);

    const { original_filename, secure_url } = uploadResponse as any;

    const docRef = await db.collection("users").doc(uid).collection("documents").add(
      {
        original_filename,
        secure_url,
        createdAt: new Date(),
        parsedData: parsedText,
        status: "uploaded",
      }
    );

    return NextResponse.json({ uploadResponse, docId: docRef.id });
  } catch (error) {
    console.error("Upload route error:", error);
    return NextResponse.json({ error: (error as Error).message || "Upload failed" }, { status: 500 });
  }
}
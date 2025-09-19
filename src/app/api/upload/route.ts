import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { db } from "../../../../firebase/adminConfig";


export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const uid = formData.get("uid") as string;

    if(!uid){
      alert("Please login to upload documents.");
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

    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "raw", folder: "documents" }, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        })
        .end(buffer);
    });

    const { original_filename, secure_url } = uploadResponse as any;

    const docRef = await db.collection("users").doc(uid).collection("documents").add(
      {
        original_filename,
        secure_url,
        createdAt: new Date(),
        parsedData: null,
        status: "uploaded",
      }
    );

    return NextResponse.json({ uploadResponse, docId: docRef.id });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
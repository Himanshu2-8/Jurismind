import { NextResponse } from "next/server";
import { bucket,db } from "../../../../firebase/adminConfig";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const userId = formData.get("userId") as string | null;

    if (!file || !userId) {
      return NextResponse.json({ error: "Missing file or userId" }, { status: 400 });
    }

    const fileName = `${userId}/documents/${uuidv4()}-${file.name}`;
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const fileRef = bucket.file(fileName);
    await fileRef.save(fileBuffer, {
      contentType: file.type,
    });

    const [url] = await fileRef.getSignedUrl({
      action: "read",
      expires: "03-01-2030",
    });

    await db.collection("users").doc(userId).collection("documents").add({
      name: file.name,
      userId,
      createdAt: new Date(),
      fileUrl: url,
      parsedData: null,
    });

    return NextResponse.json({ success: true, url });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
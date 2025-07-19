import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyJWT } from "@/lib/auth";

const MAX_PHOTO_SIZE = 2 * 1024 * 1024;
const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const token = authHeader.replace("Bearer ", "");
    const payload = verifyJWT(token);
    if (!payload || typeof payload !== "object" || !("id" in payload)) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }
    const userId = (payload as any).id;

    const cvId = params.id;
    if (!cvId || isNaN(Number(cvId))) {
      return NextResponse.json({ error: "Invalid CV id." }, { status: 400 });
    }

    // Cek apakah CV milik user
    const cv = await prisma.cV.findUnique({
      where: { id: Number(cvId) },
      select: { id: true, userId: true, photo: true },
    });
    if (!cv || cv.userId !== userId) {
      return NextResponse.json(
        { error: "CV not found or access denied." },
        { status: 404 }
      );
    }

    // Cek content-type
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.startsWith("multipart/form-data")) {
      return NextResponse.json(
        { error: "Content-Type must be multipart/form-data for photo upload." },
        { status: 400 }
      );
    }

    // Parse form-data
    const formData = await req.formData();
    const template = formData.get("template");
    const contentRaw = formData.get("content");
    let content;
    try {
      content = JSON.parse(contentRaw as string);
    } catch {
      return NextResponse.json(
        { error: "Content must be valid JSON." },
        { status: 400 }
      );
    }

    if (!template || !["ats", "creative"].includes(template as string)) {
      return NextResponse.json(
        { error: "Template must be 'ats' or 'creative'." },
        { status: 400 }
      );
    }
    if (!content || typeof content !== "object") {
      return NextResponse.json(
        { error: "Content is required." },
        { status: 400 }
      );
    }

    // Validasi foto jika template creative
    let photoUrl: string | null = cv.photo;
    if (template === "creative") {
      const photo = formData.get("photo");
      if (photo && photo instanceof File && photo.size > 0) {
        if (!ALLOWED_PHOTO_TYPES.includes(photo.type)) {
          return NextResponse.json(
            { error: "Photo must be JPG, PNG, or WEBP." },
            { status: 400 }
          );
        }
        if (photo.size > MAX_PHOTO_SIZE) {
          return NextResponse.json(
            { error: "Photo size must be less than 2MB." },
            { status: 400 }
          );
        }
        // Simpan file ke public/uploads
        const buffer = Buffer.from(await photo.arrayBuffer());
        const fs = require("fs");
        const path = require("path");
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        if (!fs.existsSync(uploadDir))
          fs.mkdirSync(uploadDir, { recursive: true });
        const filename = `${Date.now()}-${photo.name.replace(/\s+/g, "_")}`;
        const filepath = path.join(uploadDir, filename);
        fs.writeFileSync(filepath, buffer);
        photoUrl = `/uploads/${filename}`;
      }
      // Jika tidak upload ulang, gunakan foto lama
    } else {
      photoUrl = null;
    }

    const updatedCV = await prisma.cV.update({
      where: { id: Number(cvId) },
      data: {
        template: template as string,
        content,
        photo: photoUrl,
      },
      select: {
        id: true,
        template: true,
        content: true,
        photo: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ cv: updatedCV }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

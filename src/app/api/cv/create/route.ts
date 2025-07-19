import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyJWT } from "@/lib/auth";

const MAX_PHOTO_SIZE = 2 * 1024 * 1024;
const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function POST(req: NextRequest) {
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

    const contentType = req.headers.get("content-type") || "";
    if (!contentType.startsWith("multipart/form-data")) {
      return NextResponse.json(
        { error: "Content-Type must be multipart/form-data for photo upload." },
        { status: 400 }
      );
    }

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

    let photoUrl: string | null = null;
    if (template === "creative") {
      const photo = formData.get("photo");
      if (!photo || !(photo instanceof File)) {
        return NextResponse.json(
          { error: "Photo is required for creative template." },
          { status: 400 }
        );
      }
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

    const cv = await prisma.cV.create({
      data: {
        userId,
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

    return NextResponse.json({ cv }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

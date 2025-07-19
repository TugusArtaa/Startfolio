import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyJWT } from "@/lib/auth";

export async function DELETE(
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
      select: { id: true, userId: true },
    });

    if (!cv || cv.userId !== userId) {
      return NextResponse.json(
        { error: "CV not found or access denied." },
        { status: 404 }
      );
    }

    await prisma.cV.delete({ where: { id: Number(cvId) } });

    return NextResponse.json(
      { message: "CV deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

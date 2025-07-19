import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/lib/auth";

const protectedRoutes = ["/api/cv", "/api/profile"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const payload = verifyJWT(token);

    if (!payload) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/cv/:path*", "/api/profile/:path*"],
};

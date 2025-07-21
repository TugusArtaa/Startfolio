import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/api/cv", "/api/profile", "/cv/new", "/cv"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/cv/:path*",
    "/api/profile/:path*",
    "/cv/new/:path*",
    "/cv/:path*",
  ],
};

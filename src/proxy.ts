import { NextRequest, NextResponse } from "next/server";
import { AUTH_KEYS } from "@/constants/auth";

const publicPaths = ["/login", "/signup", "/forgot-password"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow home page
  if (pathname === "/") {
    return NextResponse.next();
  }

  // Allow public routes
  if (
    publicPaths.some(
      (path) => pathname === path || pathname.startsWith(`${path}/`)
    )
  ) {
    return NextResponse.next();
  }

  const isProtected =
    pathname.startsWith("/student") ||
    pathname.startsWith("/intern") ||
    pathname.startsWith("/admin");

  if (!isProtected) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get(AUTH_KEYS.ACCESS_TOKEN)?.value;

  if (!accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Read your application's role from the cookie
  const role = request.cookies.get("user_role")?.value;

  if (!role) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/student") && role !== "student") {
    return NextResponse.redirect(
      new URL(`/${role}/dashboard`, request.url)
    );
  }

  if (pathname.startsWith("/intern") && role !== "intern") {
    return NextResponse.redirect(
      new URL(`/${role}/dashboard`, request.url)
    );
  }

  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(
      new URL(`/${role}/dashboard`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|logo-32.png|logo-48.png|api).*)",
  ],
};

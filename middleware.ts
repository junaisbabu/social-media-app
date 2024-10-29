import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

const authRoutes = ["/sign-in"];
const protectedRoutes = ["/", "people", "my-posts", "saved", "profile"];
const publicRoutes = ["/post/"];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isAuthRoute = authRoutes.includes(path);
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const token = cookies().get("userToken")?.value;

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.nextUrl));
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|assets|fonts|sw|workbox|manifest|ios|android|windows11).*)",
  ],
};

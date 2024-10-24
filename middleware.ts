import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const token = cookies().get("userToken")?.value;
  if (token) {
    if (pathname === "/sign-in") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else if (!pathname.includes("/post/") && pathname !== "/sign-in") {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|assets|fonts|sw|workbox|manifest|ios|android|windows11).*)",
  ],
};

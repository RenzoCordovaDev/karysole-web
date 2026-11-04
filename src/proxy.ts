import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE, isSessionTokenValid } from "@/lib/admin-session";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!(await isSessionTokenValid(token))) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // "/admin" en sí no tiene contenido propio: siempre va a la sección de productos.
  if (pathname === "/admin") {
    return NextResponse.redirect(new URL("/admin/productos", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

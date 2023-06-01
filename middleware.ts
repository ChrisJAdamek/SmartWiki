import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Add session logging
  console.log("Middleware session:", session);

  if (!session && path === "/protected") {
    console.log("Middleware Redirect: /protected -> /login");
    return NextResponse.redirect(new URL("/login", req.url));
  } else if (session && (path === "/login" || path === "/register")) {
    console.log("Middleware Redirect: /login or /register -> /protected");
    return NextResponse.redirect(new URL("/protected", req.url));
  }
  return NextResponse.next();
}

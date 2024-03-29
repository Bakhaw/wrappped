export { default } from "next-auth/middleware";

// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";

// export async function middleware(req: NextRequest) {
//   const { pathname, origin } = req.nextUrl;
//   const c = cookies();

//   const devCookieName = "next-auth.session-token";
//   const prodCookieName = "__Secure-next-auth.session-token";

//   const cookieName =
//     process.env.NODE_ENV === "development" ? devCookieName : prodCookieName;

//   if (pathname.includes("api/auth")) {
//     return NextResponse.next();
//   }

//   if (!c.get(cookieName)?.value?.trim() && pathname !== "/sign-in") {
//     return NextResponse.redirect(`${origin}/sign-in`);
//   }

//   return NextResponse.next();
// }

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   */
  // matcher: ["/((?!sign-up|api|_next/static|_next/image|favicon.ico).*)"],
  matcher: ["/", "/new-wrap"],
};

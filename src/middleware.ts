// Without a defined matcher, this one line applies next-auth
// to the entire project

// // protected routes just for one route
// export { default } from "next-auth/middleware";

// // Applies next-auth only to matching routes - can be regex
// // Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
// export const config = { matcher: ["/extra", "/dashboard"] };
// ********8 end ***************

// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage

import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request: NextRequestWithAuth) {
    // console.log(request.nextUrl.pathname, "midle");
    console.log(request.nextauth?.token?.user?.role, "midle w22");

    if (
      request.nextUrl.pathname.startsWith("/user") &&
      request.nextauth?.token?.user?.role !== 1
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }

    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      request.nextauth.token.user.role !== 2
    ) {
      return NextResponse.rewrite(new URL("/auth/login", request.url));
    }
    // if (
    //   request.nextUrl.pathname.startsWith("/client") &&
    //   request.nextauth.token?.role !== "admin" &&
    //   request.nextauth.token?.role !== "manager"
    // ) {
    //   return NextResponse.rewrite(new URL("/denied", request.url));
    // }
  },
  {
    callbacks: {
      // ye true hp a tp ,amtch er valy dekh skta
      authorized: ({ token }) => !!token,
    },
  }
);

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/", "/vender/:path*"],
};
// export const config = { matcher: ["/extra", "/client", "/dashboard", "/"] };
//   matcher: ["/admin/:path*", "/user/:path*"],

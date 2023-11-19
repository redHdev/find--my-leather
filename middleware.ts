// export { default } from "next-auth/middleware";

// export const config = {
//   // /dashboard/:path*
//   matcher: ["/"],
// };

import { withAuth } from "next-auth/middleware";

export default withAuth(
  // function middleware(req) {
  //   console.log("middleware ouput", req.nextauth.token);
  // },
  {
    callbacks: {
      authorized({ req, token }) {
        // `/admin` requires admin role
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return token?.role === "admin";
        }
        // `/` only requires the user to be logged in
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/", "/admin/:path*", "/orders/:path*", "/profile"],
};

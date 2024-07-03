// import type { NextRequest } from "next/server";
// import jwt from "jsonwebtoken";

// const protectedRoutes = ["/student", "/admin"];

// export function middleware(req: NextRequest) {
//   const accessToken = req.cookies.get("accessToken")?.value;
//   const isProtectedRoute = protectedRoutes.some((route) =>
//     req.nextUrl.pathname.startsWith(route)
//   );

//   if (isProtectedRoute && !accessToken) {
//     return Response.redirect(new URL("/login", req.url));
//   }

//   if (accessToken) {
//     try {
//       const decodedToken: any = jwt.decode(accessToken);
//       const userRole = decodedToken.role;

//       if (req.nextUrl.pathname.startsWith("/login")) {
//         if (userRole === "student") {
//           return Response.redirect(new URL("/student", req.url));
//         } else if (userRole === "secretary") {
//           return Response.redirect(new URL("/admin", req.url));
//         }
//       }

//       if (
//         userRole === "student" &&
//         !req.nextUrl.pathname.startsWith("/student")
//       ) {
//         return Response.redirect(new URL("/student", req.url));
//       } else if (
//         userRole === "secretary" &&
//         !req.nextUrl.pathname.startsWith("/admin")
//       ) {
//         return Response.redirect(new URL("/admin", req.url));
//       }
//     } catch (error) {
//       return Response.redirect(new URL("/login", req.url));
//     }
//   }
// }

// export const config = {
//   matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
// };

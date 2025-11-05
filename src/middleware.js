import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/webhook",
    "/fund/:slug",
    "/api/funds/:slug/transaction",
    "/api/funds/:slug/summary",
    "/api/funds/:id",
    "/razorpay/callback",
    "/api/razorpay/webhook",
    "/api/razorpay/payment-link",
    "/api/razorpay/fixed-payment-link",
    "/privacy",
    "/contact",
    "/terms",
    "/refunds",
    "/shipping",
    "/about",
    "/how-it-works",
    "/causes",
  ],
  afterAuth(auth, req) {
    // If user is signed in and trying to access home page, redirect to dashboard
    if (auth.userId && req.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // If user is not signed in and trying to access protected routes, redirect to sign in
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // Allow the request to continue
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

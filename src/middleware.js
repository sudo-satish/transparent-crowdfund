import { authMiddleware } from "@clerk/nextjs";

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
        "/api/razorpay/fixed-payment-link"
    ]
});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}; 
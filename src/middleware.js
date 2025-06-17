import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ["/", "/api/webhook", "/fund/:id", "/api/funds/:id/transaction", "/api/funds/:id/summary", "/api/funds/:id"]
});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}; 
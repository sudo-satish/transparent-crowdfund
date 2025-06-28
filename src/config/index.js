export const config = {
    razorpay: {
        link: process.env.NEXT_PUBLIC_PAYMENT_PAGE_LINK,
        webhook_secret: process.env.WEBHOOK_SECRET,
        server_url: process.env.NEXT_PUBLIC_BASE_URL || process.env.SERVER_URL,
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL || process.env.SERVER_URL}/razorpay/callback`,
    },
};
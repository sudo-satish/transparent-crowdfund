// Helper function to get the base URL
const getBaseUrl = () => {
    // For client-side, use NEXT_PUBLIC_BASE_URL
    if (typeof window !== 'undefined') {
        return process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
    }
    // For server-side, use NEXT_PUBLIC_BASE_URL or SERVER_URL
    return process.env.NEXT_PUBLIC_BASE_URL || process.env.SERVER_URL || 'http://localhost:3000';
};

export const config = {
    razorpay: {
        link: process.env.NEXT_PUBLIC_PAYMENT_PAGE_LINK,
        webhook_secret: process.env.WEBHOOK_SECRET,
        get server_url() {
            return getBaseUrl();
        },
        get callback_url() {
            return `${getBaseUrl()}/razorpay/callback`;
        },
    },
};
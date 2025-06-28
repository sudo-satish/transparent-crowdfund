import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { Fund } from "@/services/models/fund";
import { config } from "@/config";

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// prime-national-stinkbug.ngrok-free.app
const SERVER_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.SERVER_URL;
const CALLBACK_URL = `${SERVER_URL}/api/razorpay/webhook`;

export async function POST(request) {
    try {
        const body = await request.json();
        const { amount, fundId, name } = body;

        if (!amount || !fundId) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        // Validate amount
        if (amount <= 0) {
            return new NextResponse("Amount must be greater than 0", { status: 400 });
        }

        // Get fund details
        const fund = await Fund.findById(fundId);
        if (!fund) {
            return new NextResponse("Fund not found", { status: 404 });
        }

        // Convert amount to paise (Razorpay expects amount in paise)
        const amountInPaise = Math.round(amount * 100);

        const paymentLink = await razorpayInstance.paymentLink.create({
            amount: amountInPaise,
            currency: "INR",
            accept_partial: false,
            description: `Contribution for ${fund.title}`,
            customer: {
                name: name || "Anonymous Contributor",
                email: "contributor@example.com",
                contact: "+919000090000"
            },
            notify: {
                sms: true,
                email: true
            },
            reminder_enable: true,
            notes: {
                fund_id: fundId,
                fund_title: fund.title,
                name: name || "Anonymous"
            },
            callback_url: `${config.razorpay.callback_url}?fund_slug=${fund.slug}&fundId=${fundId}`,
            callback_method: "get",
        });

        return NextResponse.json({
            paymentLink: paymentLink.short_url,
            success: true
        });

    } catch (error) {
        console.error("Error creating payment link:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
} 
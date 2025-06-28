import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { Fund } from "@/services/models/fund";
import { config } from "@/config";

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
    try {
        const body = await request.json();
        const { fundId, name } = body;

        if (!fundId) {
            return new NextResponse("Missing fund ID", { status: 400 });
        }

        // Get fund details
        const fund = await Fund.findById(fundId);
        if (!fund) {
            return new NextResponse("Fund not found", { status: 404 });
        }

        if (!fund.contributionAmount) {
            return new NextResponse("No fixed contribution amount set for this fund", { status: 400 });
        }

        // Convert amount to paise (Razorpay expects amount in paise)
        const amountInPaise = Math.round(fund.contributionAmount * 100);

        const paymentLinkData = {
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
        }

        console.log({
            paymentLinkData
        })
        const paymentLink = await razorpayInstance.paymentLink.create(paymentLinkData);

        return NextResponse.json({
            paymentLink: paymentLink.short_url,
            success: true
        });

    } catch (error) {
        console.error("Error creating payment link:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
} 
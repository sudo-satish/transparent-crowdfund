import { auth } from "@clerk/nextjs";
import { Fund } from "@/services/models/fund";
import { NextResponse } from "next/server";
import { db } from "@/services/db";
import { Summary } from "@/services/models/summary";
import Razorpay from "razorpay";

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createPaymentLink = async (fundId) => {

    try {
        const paymentLink = await razorpayInstance.paymentLink.create({
            // Accept custom amount from the user
            amount: 50000,
            currency: "INR",
            accept_partial: false,
            // first_min_partial_amount: 100,
            description: "For " + fundId,
            customer: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "+919000090000"
            },
            notify: {
                sms: true,
                email: true
            },
            reminder_enable: true,
            notes: {
                policy_name: "Jeevan Bima"
            },
            callback_url: "https://example-callback-url.com/",
            callback_method: "get"
        });

        return paymentLink;
    } catch (error) {
        console.error("Error creating payment link:", error);
        return null;
    }
}

export async function POST(request) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await request.json();
        const { title, description, goal, createdBy } = body;

        // Validate required fields
        if (!title || !createdBy) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        // Verify that the user is creating the fund for themselves
        if (createdBy !== userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const fund = await Fund.create({
            title,
            description,
            goal,
            createdBy,
        });

        const summary = await Summary.create({
            fund: fund._id,
        });

        return NextResponse.json(fund);

    } catch (error) {
        console.error("Error creating fund:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function GET(request) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const funds = await Fund.find({ createdBy: userId }).sort({ createdAt: -1 });
        return NextResponse.json(funds);
    } catch (error) {
        console.error("Error fetching funds:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
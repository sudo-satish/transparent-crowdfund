import { auth } from "@clerk/nextjs";
import { Fund } from "@/services/models/fund";
import { NextResponse } from "next/server";
import { db } from "@/services/db";
import { Summary } from "@/services/models/summary";
import Razorpay from "razorpay";
import slugify from 'slugify';
import { sanitizeInput } from "@/utils/helper";

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

const createSlug = async (title) => {
    const slug = slugify(title, {
        lower: true,
        strict: true,
        locale: 'en',
        trim: true
    });

    const fund = await Fund.findOne({ slug });
    if (fund) {
        const randomString = Math.random().toString(36).substring(2, 15);
        return createSlug(title + " " + randomString);
    }

    return slug;
}

export async function POST(request) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await request.json();
        const { title, description, goal, createdBy, contributionAmount, customerDecidesAmount } = body;

        // Validate required fields
        if (!title || !createdBy) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        // Verify that the user is creating the fund for themselves
        if (createdBy !== userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Sanitize user input to prevent XSS attacks
        const sanitizedTitle = sanitizeInput(title);
        const sanitizedDescription = description ? sanitizeInput(description) : '';

        const slug = await createSlug(sanitizedTitle);

        const fund = await Fund.create({
            title: sanitizedTitle,
            description: sanitizedDescription,
            goal,
            slug,
            createdBy,
            contributionAmount,
            customerDecidesAmount,
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
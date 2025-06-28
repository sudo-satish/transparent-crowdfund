import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { Fund } from "@/services/models/fund";
import { Summary } from "@/services/models/summary";
import { Transaction } from "@/services/models/transactions";

export async function POST(request, { params }) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { id } = await params;
        const { accountNumber, ifscCode, accountHolderName, amount } = await request.json();

        // Validate required fields
        if (!accountNumber || !ifscCode || !accountHolderName) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        // Check if fund exists and belongs to the user
        const fund = await Fund.findById(id);

        if (!fund) {
            return new NextResponse("Fund not found", { status: 404 });
        }

        if (fund.createdBy !== userId) {
            return new NextResponse("Unauthorized - Only fund creator can redeem", { status: 401 });
        }

        // Get current balance
        const summary = await Summary.findOne({ fund: id });
        const currentBalance = summary?.totalBalance || 0;

        if (currentBalance <= 0) {
            return new NextResponse("No funds available to redeem", { status: 400 });
        }

        if (amount * 100 > currentBalance) {
            return new NextResponse("Insufficient funds to redeem", { status: 400 });
        }

        // Create a debit transaction for the redemption
        const redemptionTransaction = await Transaction.create({
            fund: id,
            amount: amount,
            transactionType: 'debit',
            contact: 'REDEMPTION',
            name: accountHolderName,
            date: new Date(),
            closingBalance: 0, // After redemption, balance becomes 0
            notes: `Redeemed to account: ${accountNumber} (${ifscCode})`
        });

        // Update summary to reflect the redemption
        await Summary.findOneAndUpdate(
            { fund: id },
            {
                totalDebited: (summary.totalDebited || 0) + amount,
                totalBalance: 0
            }
        );

        return NextResponse.json({
            success: true,
            message: "Funds redeemed successfully",
            amount: amount,
            transactionId: redemptionTransaction._id
        });

    } catch (error) {
        console.error("Error redeeming funds:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
} 
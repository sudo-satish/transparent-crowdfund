import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { Fund } from "@/services/models/fund";
import { Summary } from "@/services/models/summary";
import { Transaction } from "@/services/models/transactions";

// const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
// const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
// const RAZORPAYX_ACCOUNT_NO = process.env.RAZORPAYX_ACCOUNT_NO;

export async function POST(request, { params }) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { id } = await params;
        const { accountNumber, ifscCode, accountHolderName, amount } = await request.json();

        // Validate required fields
        if (!accountNumber || !ifscCode || !accountHolderName || !amount) {
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

        if (amount > currentBalance) {
            return new NextResponse("Insufficient funds to redeem", { status: 400 });
        }

        // // 1️⃣ Create Contact
        // const contactResponse = await fetch("https://api.razorpay.com/v1/contacts", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization:
        //       "Basic " +
        //       Buffer.from(
        //         `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
        //       ).toString("base64"),
        //   },
        //   body: JSON.stringify({
        //     name: accountHolderName,
        //     type: "employee",
        //     reference_id: `fund_${id}_${Date.now()}`,
        //     notes: {
        //       purpose: "Fund redemption",
        //     },
        //   }),
        // });
            
        // const contact = await contactResponse.json();
            
        // // 2️⃣ Create Fund Account (Bank Account)
        // const fundAccountResponse = await fetch(
        //   "https://api.razorpay.com/v1/fund_accounts",
        //   {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //       Authorization:
        //         "Basic " +
        //         Buffer.from(
        //           `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
        //         ).toString("base64"),
        //     },
        //     body: JSON.stringify({
        //       contact_id: contact.id,
        //       account_type: "bank_account",
        //       bank_account: {
        //         name: accountHolderName,
        //         ifsc: ifscCode,
        //         account_number: accountNumber,
        //       },
        //     }),
        //   }
        // );
            
        // const fundAccount = await fundAccountResponse.json();
            
        // // 3️⃣ Create Payout
        // const payoutResponse = await fetch("https://api.razorpay.com/v1/payouts", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization:
        //       "Basic " +
        //       Buffer.from(
        //         `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
        //       ).toString("base64"),
        //   },
        //   body: JSON.stringify({
        //     account_number: "2323230076543210", // your RazorpayX virtual account (test mode default)
        //     fund_account_id: fundAccount.id,
        //     amount: amount * 100, // amount in paise
        //     currency: "INR",
        //     mode: "IMPS", // or NEFT, UPI, etc.
        //     purpose: "payout",
        //     queue_if_low_balance: true,
        //     narration: `Redeem for fund ${id}`,
        //   }),
        // });
            
        // const payout = await payoutResponse.json();
            
        // if (!payout.id) {
        //   throw new Error("Payout creation failed");
        // }
            




        const newBalance = currentBalance - amount;

        // Create a debit transaction for the redemption
        const redemptionTransaction = await Transaction.create({
            fund: id,
            amount: amount,
            transactionType: 'debit',
            contact: 'REDEMPTION',
            name: accountHolderName,
            date: new Date(),
            closingBalance: newBalance, 
            notes: `Redeemed to account: ${accountNumber} (${ifscCode})`
            // payoutId: payout.id,
        });

        // Update summary to reflect the redemption
        await Summary.findOneAndUpdate(
            { fund: id },
            {
                $inc: {
                    totalDebited: amount,
                    totalBalance: -amount 
                }
            }
        );

        
        await Fund.findByIdAndUpdate(
            id,
            { $inc: { currentAmount: -amount } }
        );

        return NextResponse.json({
            success: true,
            message: "Funds redeemed successfully",
            amount: amount,
            // payoutId: payout.id,
            transactionId: redemptionTransaction._id
        });

    } catch (error) {
        console.error("Error redeeming funds:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
} 
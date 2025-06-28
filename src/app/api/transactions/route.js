import { NextResponse } from "next/server";
import { Transaction } from "@/services/models/transactions";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const fundId = searchParams.get('fundId');

    const transactions = await Transaction.find({ fund: fundId }).sort({ createdAt: -1 }).lean();
    return NextResponse.json(transactions);
}
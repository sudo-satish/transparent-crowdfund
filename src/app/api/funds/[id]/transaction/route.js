import { NextResponse } from "next/server";
import { Transaction } from "@/services/models/transactions";

export async function GET(req, { params }) {
    const { id } = await params;
    const transactions = await Transaction.find({ fund: id }).sort({ createdAt: -1 }).lean();
    return NextResponse.json(transactions);
}
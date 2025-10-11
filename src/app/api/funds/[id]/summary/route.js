import { NextResponse } from "next/server";
import { Summary } from "@/services/models/summary";
import { Transaction } from "@/services/models/transactions";
import mongoose from "mongoose";

export const getSummaryByFundId = async (id) => {
    let summary = await Summary.findOne({ fund: id }).lean();

    const topContributor = await Transaction.aggregate([
        {
            $match: {
                fund: new mongoose.Types.ObjectId(id),
                transactionType: 'credit',
            },
        },
        {
            $group: {
                _id: '$contact',
                totalAmount: { $sum: '$amount' },
            },
        },
        {
            $sort: { totalAmount: -1 },
        },
    ]).limit(1);

    const contributorCount = await Transaction.aggregate([
        {
            $match: {
                fund: new mongoose.Types.ObjectId(id),
                transactionType: 'credit'
            },
        },
        {
            $group: {
                _id: '$contact',
            },
        },
    ]).exec();
    console.log(contributorCount)

    summary.topContributor = topContributor[0] ?? {};
    summary.contributorCount = contributorCount.length ?? 0;

    return summary;
}

export async function GET(req, { params }) {
    const { id } = await params;

    const summary = await getSummaryByFundId(id);

    return NextResponse.json(summary);
}
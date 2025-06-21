import { NextResponse } from "next/server";
import { Fund } from "@/services/models/fund";
import { Summary } from "@/services/models/summary";
import { Transaction } from "@/services/models/transactions";
import { auth } from "@clerk/nextjs";

export async function GET(req, { params }) {
    const { id } = await params;
    const fund = await Fund.findById(id).lean();
    return NextResponse.json(fund);
}

export async function DELETE(req, { params }) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { id } = await params;

        // Check if fund exists and belongs to the user
        const fund = await Fund.findById(id);

        if (!fund) {
            return new NextResponse("Fund not found", { status: 404 });
        }

        if (fund.createdBy !== userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Delete related data first
        await Summary.deleteMany({ fund: id });
        await Transaction.deleteMany({ fund: id });

        // Delete the fund
        await Fund.findByIdAndDelete(id);

        return new NextResponse("Fund deleted successfully", { status: 200 });
    } catch (error) {
        console.error("Error deleting fund:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
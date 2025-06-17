import { NextResponse } from "next/server";
import { Fund } from "@/services/models/fund";

export async function GET(req, { params }) {
    const { id } = await params;
    const fund = await Fund.findById(id).lean();
    return NextResponse.json(fund);
}
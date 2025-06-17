import { NextResponse } from "next/server";
import { Summary } from "@/services/models/summary";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const fundId = searchParams.get('fundId');

    const summary = await Summary.findOne({ fund: fundId }).lean();
    return NextResponse.json(summary);
}
import { NextResponse } from "next/server";
import { Fund } from "@/services/models/fund";

export async function GET(req, { params }) {
  const { slug } = params;
  try {
    const fund = await Fund.findOne({ slug }).lean();
    if (!fund) {
      return NextResponse.json({ error: "Fund not found" }, { status: 404 });
    }
    return NextResponse.json(fund);
  } catch (err) {
    console.error("GET /api/funds/slug/[slug] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
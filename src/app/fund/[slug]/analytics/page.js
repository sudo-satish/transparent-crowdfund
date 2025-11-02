import { Transaction } from "@/services/models/transactions";
import { Summary } from "@/services/models/summary";
import { getSummaryByFundId } from "@/app/api/funds/[id]/summary/route";
import Analytics from "./components/analytics";
import { Fund } from "@/services/models/fund";

export default async function AnalyticsPage({ params }) {
    const { slug } = params;

    const fund = await Fund.findOne({ slug }).lean();
    const transactions = await Transaction.find({ fund: fund._id }).sort({ date: -1 }).lean();
    const summary = await getSummaryByFundId(fund._id);
    
    return (
        <Analytics
            transactions={JSON.parse(JSON.stringify(transactions ?? []))}
            summary={JSON.parse(JSON.stringify(summary ?? {}))}
            fund = {JSON.parse(JSON.stringify(fund ?? {}))}
        />
    );
} 
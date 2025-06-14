import { Transaction } from "@/services/models/transactions";
import { Summary } from "@/services/models/summary";
import Analytics from "./components/analytics";

export default async function AnalyticsPage() {
    const transactions = await Transaction.find({}).sort({ date: -1 }).lean();
    const summary = await Summary.findOne({}).lean();

    return (
        <Analytics
            transactions={JSON.parse(JSON.stringify(transactions))}
            summary={JSON.parse(JSON.stringify(summary))}
        />
    );
} 
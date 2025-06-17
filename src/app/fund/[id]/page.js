import Transactions from "@/app/components/transactions";
import { Fund } from "@/services/models/fund";
import { getSummaryByFundId } from "@/app/api/funds/[id]/summary/route";

export const dynamic = 'force-dynamic';

export default async function Home({ params }) {

    const { id } = await params;

    const summary = await getSummaryByFundId(id);
    const fund = await Fund.findOne({ _id: id });

    return (
        <Transactions fundId={id} summary={JSON.parse(JSON.stringify(summary))} fund={JSON.parse(JSON.stringify(fund))} />
    );
}

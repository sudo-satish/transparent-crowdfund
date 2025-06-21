import Transactions from "@/app/components/transactions";
import { Fund } from "@/services/models/fund";
import { getSummaryByFundId } from "@/app/api/funds/[id]/summary/route";

export const dynamic = 'force-dynamic';

export default async function Home({ params }) {

    const { slug } = await params;

    const fund = await Fund.findOne({ slug });

    const summary = await getSummaryByFundId(fund._id);

    return (
        <Transactions fundId={fund._id.toString()} summary={JSON.parse(JSON.stringify(summary))} fund={JSON.parse(JSON.stringify(fund))} />
    );
}

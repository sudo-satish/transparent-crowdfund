import { Transaction } from "@/services/models/transactions";
import Transactions from "./components/transactions";
import { Summary } from "@/services/models/summary";

export const dynamic = 'force-dynamic';

export default async function Home() {

  const transactions = await Transaction.find({}).sort({ date: -1 }).lean();
  const summary = await Summary.findOne({}).lean();

  return (
    <Transactions transactions={JSON.parse(JSON.stringify(transactions ?? []))} summary={JSON.parse(JSON.stringify(summary ?? {}))} />
  );
}

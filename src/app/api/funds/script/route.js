import { Fund } from "@/services/models/fund";
import { Transaction } from "@/services/models/transactions";

export async function GET(request) {
    // const funds = await Fund.find({});

    await Transaction.updateMany({}, [
        {
            $set: {
                closingBalance: "$closing_balance",
                transactionId: "$transaction_id",
                transactionType: "$transaction_type"
            }
        }
    ])
    return new Response(JSON.stringify(funds), { status: 200 });


}
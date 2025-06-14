// const body = {
//     entity: 'event',
//     account_id: 'acc_JoYtSwUDHbV74Q',
//     event: 'payment.captured',
//     contains: ['payment'],
//     payload: { payment: { entity: [Object] } },
//     created_at: 1749833960
// }

import { Summary } from "@/services/models/summary";
import { Transaction } from "@/services/models/transactions";

export async function POST(request) {
    const body = await request.json();
    console.log(body);

    await Transaction.create({
        amount: body.payload.payment.entity.amount,
        date: body.payload.payment.entity.created_at * 1000,
        type: body.payload.payment.entity.event,
        transaction_type: body.event === 'payment.captured' ? 'credit' : 'debit',
        transaction_id: body.payload.payment.entity.id,
        description: body.payload.payment.entity.description,
        email: body.payload.payment.entity.email,
        contact: body.payload.payment.entity.contact,
    });

    const summary = await Summary.findOne({});
    if (!summary) {
        await Summary.create({
            total_credited: body.event === 'payment.captured' ? body.payload.payment.entity.amount : 0,
            total_balance: body.event === 'payment.captured' ? body.payload.payment.entity.amount : -body.payload.payment.entity.amount,
        });
    } else {
        await Summary.findByIdAndUpdate(summary._id, {
            $inc: {
                total_credited: body.event === 'payment.captured' ? body.payload.payment.entity.amount : 0,
                total_balance: body.event === 'payment.captured' ? body.payload.payment.entity.amount : -body.payload.payment.entity.amount,
            }
        });
    }

    return new Response('Webhook received', { status: 200 });
}
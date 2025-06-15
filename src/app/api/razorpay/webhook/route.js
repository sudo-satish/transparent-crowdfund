// const body = {
//     entity: 'event',
//     account_id: 'acc_JoYtSwUDHbV74Q',
//     event: 'payment.captured',
//     contains: ['payment'],
//     payload: { payment: { entity: [Object] } },
//     created_at: 1749833960
// }

import { headers } from 'next/headers'
import { db } from "@/services/db";
import { Summary } from "@/services/models/summary";
import { Transaction } from "@/services/models/transactions";
import { validateWebhookSignature } from 'razorpay/dist/utils/razorpay-utils';
import { config } from '@/config';

export async function POST(request) {
    const body = await request.json();
    const headersList = await headers();
    const signature = headersList.get('x-razorpay-signature');

    const webhookSecret = config.razorpay.webhook_secret;

    await db.collection('webhook_audit_trail').insertOne({
        body,
        created_at: new Date(),
    });

    const isValid = await validateWebhookSignature(JSON.stringify(body), signature, webhookSecret);

    if (!isValid) {
        return new Response('Invalid signature', { status: 400 });
    }

    if (body.event !== 'payment.captured') {
        return new Response('Webhook received', { status: 200 });
    }

    const summary = await Summary.findOne({});
    if (!summary) {
        await Summary.create({
            total_credited: body.event === 'payment.captured' ? body.payload.payment.entity.amount : 0,
            total_balance: body.event === 'payment.captured' ? body.payload.payment.entity.amount : -body.payload.payment.entity.amount,
            total_debited: body.event === 'payment.captured' ? 0 : body.payload.payment.entity.amount,
        });
    } else {
        await Summary.findByIdAndUpdate(summary._id, {
            $inc: {
                total_credited: body.event === 'payment.captured' ? body.payload.payment.entity.amount : 0,
                total_balance: body.event === 'payment.captured' ? body.payload.payment.entity.amount : -body.payload.payment.entity.amount,
                total_debited: body.event === 'payment.captured' ? 0 : body.payload.payment.entity.amount,
            }
        });
    }

    const updatedSummary = await Summary.findOne();

    await Transaction.create({
        amount: body.payload.payment.entity.amount,
        date: body.payload.payment.entity.created_at * 1000,
        type: body.payload.payment.entity.event,
        transaction_type: body.event === 'payment.captured' ? 'credit' : 'debit',
        transaction_id: body.payload.payment.entity.id,
        description: body.payload.payment.entity.description,
        email: body.payload.payment.entity.email,
        contact: body.payload.payment.entity.contact,
        closing_balance: updatedSummary.total_balance,
        name: body.payload.payment?.entity?.notes?.name || "",
    });

    return new Response('Webhook received', { status: 200 });
}
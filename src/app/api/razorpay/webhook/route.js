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
    console.log('Webhook received');
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

    // Extract fund_id from payment notes
    const fundId = body.payload.payment.entity.notes?.fund_id;

    if (!fundId) {
        console.error('No fund_id found in payment notes');
        return new Response('No fund_id found', { status: 400 });
    }

    // Find or create summary for the specific fund
    let summary = await Summary.findOne({ fund: fundId });
    if (!summary) {
        summary = await Summary.create({
            fund: fundId,
            totalCredited: body.event === 'payment.captured' ? body.payload.payment.entity.amount : 0,
            totalBalance: body.event === 'payment.captured' ? body.payload.payment.entity.amount : -body.payload.payment.entity.amount,
            totalDebited: body.event === 'payment.captured' ? 0 : body.payload.payment.entity.amount,
        });
    } else {
        await Summary.findByIdAndUpdate(summary._id, {
            $inc: {
                totalCredited: body.event === 'payment.captured' ? body.payload.payment.entity.amount : 0,
                totalBalance: body.event === 'payment.captured' ? body.payload.payment.entity.amount : -body.payload.payment.entity.amount,
                totalDebited: body.event === 'payment.captured' ? 0 : body.payload.payment.entity.amount,
            }
        });
    }

    const updatedSummary = await Summary.findOne({ fund: fundId });

    await Transaction.create({
        amount: body.payload.payment.entity.amount, // Convert from paise to rupees
        date: new Date(body.payload.payment.entity.created_at * 1000),
        type: body.payload.payment.entity.event,
        transactionType: body.event === 'payment.captured' ? 'credit' : 'debit',
        transactionId: body.payload.payment.entity.id,
        description: body.payload.payment.entity.description,
        email: body.payload.payment.entity.email,
        contact: body.payload.payment.entity.contact,
        closingBalance: updatedSummary.totalBalance,
        name: body.payload.payment?.entity?.notes?.name || body.payload.payment?.entity?.customer?.name || "Anonymous",
        fund: fundId,
    });

    return new Response('Webhook received', { status: 200 });
}

export async function GET(request) {
    return new Response('Webhook received', { status: 200 });
}
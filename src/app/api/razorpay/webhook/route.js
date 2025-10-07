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
import { Fund } from '@/services/models/fund';
import { Summary } from "@/services/models/summary";
import { Transaction } from "@/services/models/transactions";
import { validateWebhookSignature } from 'razorpay/dist/utils/razorpay-utils';
import { config } from '@/config';
import { sanitizeInput } from '@/utils/helper';
import mongoose from 'mongoose';

export async function POST(request) {
    console.log('Webhook received');
    const body = await request.json();
    console.log(body);
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
    const fundIdStr = body?.payload?.payment?.entity?.notes?.fund_id;
    if (!fundIdStr) return new Response('No fund_id found', { status: 400 });
    const fundId = new mongoose.Types.ObjectId(fundIdStr);

    const isCredit = body.event === 'payment.captured';
    const amount = body.payload.payment.entity.amount;

    // Find or create summary for the specific fund
    let summary = await Summary.findOne({ fund: fundId });
    if (!summary) {
        summary = await Summary.create({
            fund: fundId,
            totalCredited: isCredit ? amount : 0,
            totalDebited:  isCredit ? 0      : amount,
            totalBalance:  isCredit ? amount : -amount,
        });
    } else {
        await Summary.findByIdAndUpdate(summary._id, {
            $inc: {
                 totalCredited: isCredit ? amount : 0,
                 totalDebited:  isCredit ? 0      : amount,
                 totalBalance:  isCredit ? amount : -amount,
            }
        });
    }

    const updatedSummary = await Summary.findOne({ fund: fundId });

    // Sanitize user input to prevent XSS attacks
    const rawName = body.payload.payment?.entity?.notes?.name || body.payload.payment?.entity?.customer?.name || "Anonymous";
    const sanitizedName = sanitizeInput(rawName);

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
        name: sanitizedName,
        fund: fundId,
    });

    await Fund.findByIdAndUpdate(
        fundId,
        { $inc: { currentAmount: isCredit ? amount : -amount } }, // if you store paise
        { new: false }
      );

    return new Response('Webhook received', { status: 200 });
}

export async function GET(request) {
    return new Response('Webhook received', { status: 200 });
}
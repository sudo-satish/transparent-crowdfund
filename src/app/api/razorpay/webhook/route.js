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

    // Extract fund_id and slug safely
    const fundIdStr = body?.payload?.payment?.entity?.notes?.fund_id;
    // const slug = body?.payload?.payment?.entity?.notes?.slug;
    const slug = body?.qr_code?.entity?.notes?.slug;

    if (!fundIdStr && !slug) {
      return new Response('No fund_id or slug found', { status: 400 });
    }

    let fundId;

    if (fundIdStr) {
      if (!mongoose.isValidObjectId(fundIdStr)) {
        return new Response('Invalid fund_id format', { status: 400 });
      }
      fundId = new mongoose.Types.ObjectId(fundIdStr);
    } else {
      const fund = await Fund.findOne({ slug }).select('_id');
      if (!fund) {
        return new Response('Fund not found for given slug', { status: 404 });
      }
      fundId = fund._id;
    }



    const isCredit = body.event === 'payment.captured' || body.event === 'qr_code.credited';
    const amountInPaise = body.payload.payment.entity.amount;
    const amount = (amountInPaise / 100);

    // Find or create summary for the specific fund
    let summary = await Summary.findOne({ fund: fundId });
    let newClosingBalance;
    if (!summary) {
        summary = await Summary.create({
            fund: fundId,
            totalCredited: isCredit ? amount : 0,
            totalDebited:  isCredit ? 0      : amount,
            totalBalance:  isCredit ? amount : -amount,
        });
        newClosingBalance = summary.totalBalance;
    } else {
        newClosingBalance = summary.totalBalance + (isCredit ? amount : -amount);
        await Summary.findByIdAndUpdate(summary._id, {
            $inc: {
                 totalCredited: isCredit ? amount : 0,
                 totalDebited:  isCredit ? 0      : amount,
                 totalBalance:  isCredit ? amount : -amount,
            }
        });
    }


    // Sanitize user input to prevent XSS attacks
    const rawName = body.payload.payment?.entity?.notes?.name || body.payload.payment?.entity?.customer?.name || "Anonymous";
    const sanitizedName = sanitizeInput(rawName);

    await Transaction.create({
        amount: amount, 
        date: new Date(body.payload.payment.entity.created_at * 1000),
        type: body.payload.payment.entity.event,
        transactionType: isCredit  ? 'credit' : 'debit',
        transactionId: body.payload.payment.entity.id,
        description: body.payload.payment.entity.description,
        email: body.payload.payment.entity.email,
        contact: body.payload.payment.entity.contact,
        closingBalance: newClosingBalance,
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
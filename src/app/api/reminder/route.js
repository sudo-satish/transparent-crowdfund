import { ReminderEmailTemplate } from '@/components/email-template';
import { config } from '@/config';
import { db } from '@/services/db';
import { Transaction } from '@/services/models/transactions';

import moment from 'moment';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    // Check if today is 2 days before month end
    const isTwoDaysBeforeMonthEnd = moment().isSame(moment().endOf('month').subtract(1, 'day'), 'day');

    if (!isTwoDaysBeforeMonthEnd) {
      return NextResponse.json({
        message: 'Not the right day',
      });
    }

    const thisMonthTransactions = await Transaction.aggregate([
      {
        $match: {
          date: { $gte: moment().startOf('month').toDate() },
        },
      },
      {
        $group: {
          _id: '$email',
        },
      },
    ]).exec();

    const usersWithoutTransactions = await Transaction.aggregate([
      {
        $match: {
          email: { $nin: thisMonthTransactions.map((t) => t._id) },
        },
      },
      {
        $group: {
          _id: '$email',
        },
      },
    ]).exec();

    for (const user of usersWithoutTransactions) {
      const data = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: user._id,
        subject: 'Reminder to pay your contribution',
        react: ReminderEmailTemplate({
          recipientName: user._id,
          dueDate: moment().format('MMMM'),
          amount: 10000,
          paymentLink: config.razorpay.link,
        }),
      });

      console.log(data);
    }

    return NextResponse.json({
      message: 'Reminder sent',
      data: usersWithoutTransactions,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: 'Error',
      error: error.message,
    });
  }
}

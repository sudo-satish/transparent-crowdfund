import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    amount: Number,
    description: String,
    date: Date,
    type: String,
    transactionType: String,
    transactionId: String,
    email: String,
    contact: String,
    closingBalance: Number,
    name: String,
    fund: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fund',
    },
});

export const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);
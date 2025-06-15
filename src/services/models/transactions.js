import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    amount: Number,
    description: String,
    date: Date,
    type: String,
    transaction_type: String,
    transaction_id: String,
    email: String,
    contact: String,
    closing_balance: Number,
});

export const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);
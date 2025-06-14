import mongoose from "mongoose";

const summarySchema = new mongoose.Schema({
    total_credited: Number,
    total_debited: Number,
    total_balance: Number,
});

export const Summary = mongoose.models.Summary || mongoose.model('Summary', summarySchema);
import mongoose from "mongoose";

const summarySchema = new mongoose.Schema({
    totalCredited: {
        type: Number,
        default: 0,
    },
    totalDebited: {
        type: Number,
        default: 0,
    },
    totalBalance: {
        type: Number,
        default: 0,
    },
    fund: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fund',
    },
});

export const Summary = mongoose.models.Summary || mongoose.model('Summary', summarySchema);
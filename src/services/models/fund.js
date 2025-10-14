import mongoose from "mongoose";

const fundSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    goal: {
        type: Number,
    },
    currentAmount: {
        type: Number,
        default: 0,
    },
    createdBy: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'cancelled'],
        default: 'active',
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    contributionAmount: {
        type: Number,
    },
    customerDecidesAmount: {
        type: Boolean,
        default: false,
    },
    isPrivate: {
        type: Boolean,
        default: false,
    },
});

// Update the updatedAt timestamp before saving
fundSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

export const Fund = mongoose.models.Fund || mongoose.model('Fund', fundSchema); 
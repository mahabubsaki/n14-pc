import { models, model, Schema, Types } from "mongoose";


const premiumScema = Schema({
    package: {
        type: String,
        required: true,
        enum: ['silver', 'gold', 'daimond'],
    },
    price: {
        type: Number,
        required: true,
    },
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    userEmail: {
        type: String,
        required: true
    },
    transactionId: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true,
    },
}, { timestamps: true });


const Premium = models.Premium || model('Premium', premiumScema);

export default Premium;

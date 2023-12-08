
import { models, model, Schema, Types } from "mongoose";


const articleSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    publisher: {
        type: Types.ObjectId,
        ref: 'Publisher',
        required: true,
    },
    tags: {
        type: [{ type: String, required: true }],
        required: true,
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'approved', 'rejected'],
    },
    reason: {
        type: String,
        default: "",
    },
    isPremium: {
        type: Boolean,
        default: false,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    description: {
        type: String,
        required: true,
    },
    authorEmail: {
        type: String,
        required: true,
    },
    authorId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    views: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });


const Article = models.Article || model('Article', articleSchema);

export default Article;

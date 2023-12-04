
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
    description: {
        type: String,
        required: true,
    },
    authorEmail: {
        type: String,
        required: true,
    },
}, { timestamps: true });


const Article = models.Article || model('Article', articleSchema);

export default Article;

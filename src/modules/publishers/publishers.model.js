
import { models, model, Schema } from "mongoose";


const publisherSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
}, { timestamps: true });


const Publisher = models.Publisher || model('Publisher', publisherSchema);

export default Publisher;

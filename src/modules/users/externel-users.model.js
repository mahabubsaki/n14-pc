const { model, models } = require("mongoose");
const { Schema } = require("mongoose");


const externelUserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });


const ExternelUser = models.Externel || model('Externel', externelUserSchema);

export default ExternelUser




const { Schema, model, models } = require('mongoose');


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    premium: {
        type: Boolean,
        default: false
    },
    premiumTimestamp: {
        type: Date,
        default: Date.now()
    },
    role: {
        type: String,
        default: "user"
    }
}, { timestamps: true });


const User = models.User || model('User', userSchema);

export default User;

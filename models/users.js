import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    avatar: String,
    website: String,
    description: String,
    password: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('User', UserSchema);


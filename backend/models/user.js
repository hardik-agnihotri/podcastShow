import mongoose from "mongoose";

const user = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // Change to 'username'
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    podcasts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'podcasts' }]
}, { timestamps: true });


export default mongoose.model('user', user)
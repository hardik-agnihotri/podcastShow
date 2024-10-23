import mongoose from "mongoose";

const podcasts = new mongoose.Schema({
    frontImage: {type: String, required: true,unique: true},
    audioFile: {type: String, required: true,unique: true},
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'category'}
},{timestamps: true})


export default mongoose.model('podcasts', podcasts)
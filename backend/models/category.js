import mongoose from "mongoose";

const category = new mongoose.Schema({
    categoryName: {type: String, required: true,unique: true},
    podcasts: [{type: mongoose.Schema.Types.ObjectId, ref: 'podcasts'}]
},{timestamps: true})


export default mongoose.model('category', category)
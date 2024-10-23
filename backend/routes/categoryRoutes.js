import express from 'express';
import Cat from '../models/category.js'

const router = express.Router();

router.post('/add-category', async (req, res) => {
    const { categoryName } = req.body;
    const cat  =  new Cat({categoryName})
    await cat.save()
    return res.status(200).json({msg :"category added successfully"})
} )


export default router;
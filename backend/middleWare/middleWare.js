import jwt from "jsonwebtoken"
import User from "../models/user.js"


const middleware = async (req,res,next) =>{
    const token = req.cookies.podcasterUserToken;
    try {
        if(token){
            const decode = jwt.verify(token,process.env.JWT_SECRET)
            const user = await User.findById(decode.id)
            if(!user){
                return res.status(404).json({msg:"user not found"})
            }
            req.user = user;
            next()
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({msg: "Not authorized, token is missing or invalid"})
    }
}

export default middleware;
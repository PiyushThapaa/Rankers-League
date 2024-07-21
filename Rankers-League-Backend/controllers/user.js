import errorHandler from "../Middlewares/error.js";
import { User } from "../models/user.js";
import {sendCookie} from "../utils/features.js"
import bcrypt from "bcrypt"

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email })
        if (user) return next(new errorHandler("User already exist", 400))
        const hashedPassword = await bcrypt.hash(password, 10)
        user = await User.create({ name, email, password: hashedPassword })
        sendCookie(user, res, `Registered Successfully as ${user.name}`, 201)
    } catch (error) {
        next(error)
    } 
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email }).select("+password");
        if (!user) return next(new errorHandler("Invalid username or password", 404))
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return next(new errorHandler("Invalid username or password", 404))
        sendCookie(user, res, `Welcome back ${user.name}`, 200)
    } catch (error) {
        next(error)
    }
}

export const logout = (req,res,next)=>{
    try {
        res.status(200).cookie("token","",{
            httpOnly:true,
            expires : new Date(Date.now())
            // sameSite:process.env.NODE_ENV === "development" ? "lax" : "none",
            // secure:process.env.NODE_ENV === "development" ? "false" : "true"
        }).json({
            success:true,
            message:"Logged Out Successfully",
            token:req.cookies.token
        })
    } catch (error) {
        next(error)
    }
}

export const profile = async (req,res,next) => {
        res.status(200).json({
            success:true,
            user:req.user
        })
}
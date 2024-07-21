import express from "express"
import { profile, login, logout, register } from "../controllers/user.js";
import { isAuthenticated } from "../Middlewares/auth.js";

const router = express.Router()

//route - /api/v1/user

//register api
router.post('/new',register)

//login api
router.post('/login',login)

//logout api
router.get('/logout',logout)

//user profile details api 
router.get('/me',isAuthenticated,profile)

export default router;
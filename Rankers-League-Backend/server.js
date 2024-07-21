import express from "express"
import cookieParser from "cookie-parser"
import { connectDB } from "./data/database.js"
import userRouter from "./routes/user.js"
import leagueRouter from "./routes/league.js"
import { errorMiddleware } from "./Middlewares/error.js"
import cors from "cors"
import {config} from "dotenv"

//configuration for dotenv
config({
    path:"./data/config.env"
})

//Middlewares
const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())

//Connecting Database
connectDB()

//Routes Middleware
app.use('/api/v1/user',userRouter)
app.use('/api/v1/league',leagueRouter)

app.get("/",(req,res)=>{
    res.send("Server is working")
})

//Error Middleware
app.use(errorMiddleware)

app.listen(process.env.PORT,()=>{
    console.log("Server is working on PORT",process.env.PORT)
})
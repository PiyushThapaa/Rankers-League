import mongoose from "mongoose";

//database connection function
export const connectDB = () =>{mongoose.connect(process.env.MONGO_URI,{
    dbName:"RankersLeagueBackend"  
}).then((e)=>console.log(`Connected to`,e.connection.host)).catch((err)=>console.log(err))
}

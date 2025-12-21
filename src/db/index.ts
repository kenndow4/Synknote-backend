import mongoose from "mongoose";
import env from "../config/env";


export const connectDB = async() => {
    try{
        await mongoose.connect(env.database_url as string);
        console.log("MongoDB connected");

    }catch(e){
         console.error("MongoDB connection error ❌", e);
    }
};
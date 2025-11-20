import mongoose from "mongoose";

export const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{ 
            serverSelectionTimeoutMS: 5000 // prevents hanging);
        });
       console.log(`MongoDB connected: ${conn.connection.host}`);  
    }catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1);// 0 means success 1 means exit with failure
    }
}
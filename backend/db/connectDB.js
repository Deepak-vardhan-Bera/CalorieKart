import mongoose from "mongoose";

export const connectDB=async()=>{
    try {
        const con=await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDb succesfully Connected to",con.connection.host);
        
    } catch (error) {
        console.error("Failed to connect to DB:", error);
        console.log("Mongo URI:", process.env.MONGO_URI);
        process.exit(1);
    }
}
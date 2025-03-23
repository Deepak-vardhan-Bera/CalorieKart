import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import { connectDB } from './db/connectDB.js';
import userRoutes from './routes/user.router.js'
import FoodRoutes from './routes/FoodItem.route.js'
import UploadRoutes from './routes/upload.route.js'
import { errorHandler } from './middleware/errormiddleware.js';


dotenv.config();
const port=process.env.PORT||9000

const app=express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"*"
}))




app.use("/api/users", userRoutes);
app.use("/api/food", FoodRoutes);
app.use("/api/upload", UploadRoutes);

app.use(errorHandler)

app.listen(port,()=>{
    console.log("Server Started Running On http://localhost:"+port);
    connectDB()
})
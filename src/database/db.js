import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const mongoDBURI = process.env.MONGODB_URI;

async function connectDB() {
    try{
        await mongoose.connect(mongoDBURI);
        console.log("MongoDB Connected!")
        const db = mongoose.connection;
        db.on('error',console.error.bind(console,'connection error : '));
    }
    catch(error){
        console.error("MongoDB Connection failed: ",error);
        process.exit(1);
    }
}
export default connectDB;
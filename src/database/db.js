import mongoose from "mongoose";
async function connectDB() {
    try{
        mongoose.connect('mongodb://127.0.0.1:27017/habitude_1');
        const db = mongoose.connection;
        db.on('error',console.error.bind(console,'connection error : '));
    
        db.once('open', function(){
            console.log("Connected to mongoDB!");
        });
    }
    catch(error){
        console.error("Connection failed: ",error);
    }
}
export default connectDB;
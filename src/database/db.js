import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/habitude_1');
const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error : '));

db.once('open', function(){
    console.log("Connected to mongoDB!");
});
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  };

// module.default=db;

export default connectDB;
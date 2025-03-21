import open from 'open';
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import fs from 'fs';
import mongoose from 'mongoose';
import {MongoClient} from 'mongodb';
import cors from 'cors';
//import User from './src/backend/models/modelschema.js';
dotenv.config();
<<<<<<< HEAD
//import clientschema from './src/backend/models/modelschema.js';
=======
import clientschema from "./models/modelschema.js";
import authRouter from "./routes/auth.js"
import { truncates } from "bcryptjs";
>>>>>>> c8cd0a467bdff617325b48a782e4435facb82276
const router = express.Router();
fs.promises;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mongoURIdb = process.env.mongoURI;

const app = express();
<<<<<<< HEAD
const appPath = process.env.APP_PATH
  ? path.resolve(process.env.APP_PATH)
  : path.join(__dirname, "frontend", "pages");
const staticPath = process.env.STATIC_PATH
  ? path.resolve(process.env.STATIC_PATH)
  : path.join(__dirname, "css");
=======
const appPath = process.env.APP_PATH ? path.resolve(process.env.APP_PATH) : path.join(__dirname,"frontend","pages");
const staticPath = process.env.STATIC_PATH ? path.resolve(process.env.STATIC_PATH) : path.join(__dirname,"css");
const mongoURI = "mongodb://shah:shah@localhost:27017/habitude_1?authSource=admin";
// const appDB = mongoose.connect(mongoURI);
const client = new MongoClient(mongoURI);

console.log("App Path : ",appPath);
console.log("Static Path : ",staticPath);

// MongoDB Connection
// mongoose.connect(mongoURIdb, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log('MongoDB connected')).catch((err) => console.log(err));

 // Create and save a new document
//  const newUser = new clientschema({
//   name: 'shivampatel',
//   email: 'shivamp@yahoo.com',
//   password: 25,
//   birthdate:13052000
// });

<<<<<<< HEAD
// newUser.save()
//   .then((user) => {
//     console.log('User saved:', user);
//   })
//   .catch((err) => {
//     console.error('Error saving user:', err);
//   });
=======
newUser.save()
  .then((user) => {
    console.log('User saved:', user);
  })
  .catch((err) => {
    console.error('Error saving user:', err);
  });
>>>>>>> ab1f29b1fecffa4d377602809750442aa5da4a5b
>>>>>>> c8cd0a467bdff617325b48a782e4435facb82276

console.log("App Path : ", appPath);
console.log("Static Path : ", staticPath);

app.use(express.static(appPath));
app.use("/css", express.static(staticPath));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: truncates }));
app.use(
  express.static(__dirname, {
    extensions: ["webp", "jpg", "svg"],
  })
);


app.listen(process.env.PORT, () =>{

  console.log('Listening to the port')
});

// MongoDB Connection
mongoose
  .connect(mongoURIdb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));


app.use("/api/auth", authRouter);

app.use('/api/new',authRouter);


<<<<<<< HEAD
=======
// app.post("/register", async (req,res) => {

//   try{

//       const {firstname, lastname,email, password} = req.body
//       if(!(firstname && lastname && email && password) ){

//           res.status(400).send("Kindly fill all the required fileds");
      

//       }

//       const alreadyRegistred = await userInfo.findOne({email})
//           if(alreadyRegistred) {
//               res.status(400).send("User already exists with this email address");

//           }

//           //password encryption
//           const encryptedPass = await bcrypt.hash(password,10)
          
//           const user = await User_db.create({

//               firstname,
//               lastname,
//               email,
//               password: encryptedPass
      
//           })

//           //To generate token

//           const token = jwt.sign(
//               {

//                   id: user._id,email

//               }


//           )
          


//       }
//   catch(error){

//       console.log(error)


//   }
// })
  

//const newUser = new User(
//  {name : "Edith",
//  email : "abc@example.com",
//  password:"Abc#12345",
//  birthdate:1093938382
//});

app.post("/shutdown",async (req,res) => {
  console.log("Server is shut down!")
  res.send("Server will now shut down!");
  process.exit(0);


  
})
>>>>>>> ab1f29b1fecffa4d377602809750442aa5da4a5b

import open from 'open';
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import fs from 'fs';
import mongoose from 'mongoose';
import {MongoClient} from 'mongodb';
import cors from 'cors';
dotenv.config();
import clientschema from './src/backend/models/modelschema.js';
const router = express.Router();
fs.promises;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mongoURIdb = process.env.mongoURI;


const app = express();
const appPath = process.env.APP_PATH ? path.resolve(process.env.APP_PATH) : path.join(__dirname,"frontend","pages");
const staticPath = process.env.STATIC_PATH ? path.resolve(process.env.STATIC_PATH) : path.join(__dirname,"css");

console.log("App Path : ",appPath);
console.log("Static Path : ",staticPath);

// MongoDB Connection
mongoose.connect(mongoURIdb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected')).catch((err) => console.log(err));

 // Create and save a new document
 const newUser = new clientschema({
  name: 'shivampatel',
  email: 'shivamp@yahoo.com',
  password: 25,
  birthdate:13052000
});

newUser.save()
  .then((user) => {
    console.log('User saved:', user);
  })
  .catch((err) => {
    console.error('Error saving user:', err);
  });


app.use(express.static(appPath));
app.use('/css',express.static(staticPath));
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname,{
  extensions:["webp","jpg","svg"],
}));


app.get("/", (req,res) => {
  const pageName = req.params.pageName;
  const pagePath = path.resolve(appPath,"${pageName}.html");

  // console.log("Found Path!")
  res.redirect("frontend/pages/homepage.html");
  // res.status(200).sendFile(pagePath, (error) => {
  //   if(error){
  //     console.error(`Error reading or sending ${pageName}.html:`, error);
  //     res.status(404).send(`Page ${pageName} not found.`);
  //   }
  // });
});
app.get("*", (req, res) => {
  return res.sendStatus(404);
});

app.listen(3000, async () => {
  console.log('Running on http://localhost:3000')
  await open('http://localhost:3000',{app:{name:"C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"}});
});


app.get("/", (req,res) => {

  res.send("Server is running");

})


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
  

app.post("/shutdown",async (req,res) => {
  console.log("Server is shut down!")
  res.send("Server will now shut down!");
  process.exit(0);


  
})
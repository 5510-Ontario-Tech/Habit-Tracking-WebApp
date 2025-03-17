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
import clientschema from "./models/modelschema.js";
import authRouter from "./routes/auth.js"
import { truncates } from "bcryptjs";
const router = express.Router();
fs.promises;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mongoURIdb = process.env.mongoURI;

const app = express();
const appPath = process.env.APP_PATH
  ? path.resolve(process.env.APP_PATH)
  : path.join(__dirname, "frontend", "pages");
const staticPath = process.env.STATIC_PATH
  ? path.resolve(process.env.STATIC_PATH)
  : path.join(__dirname, "css");

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



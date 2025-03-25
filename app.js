import open from 'open';
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import fs from 'fs';
import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import User from './src/backend/models/modelschema.js';
import connectDB from './src/database/db.js';
import authMiddleware from './src/backend/middleware/jwtAuth.js';
import authRoutes from './src/backend/routes/auth.js';
import signinauthRoutes from './src/backend/routes/signinAuth.js';

dotenv.config();
const router = express.Router();
fs.promises;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const appPath = process.env.APP_PATH ? path.resolve(process.env.APP_PATH) : path.join(__dirname, "src", "frontend", "pages");
const staticPath = process.env.STATIC_PATH ? path.resolve(process.env.STATIC_PATH) : path.join(__dirname, "src", "frontend", "css");
const mongoDBURI = process.env.MONGODB_URI;

console.log("App Path : ", appPath);
console.log("Static Path : ", staticPath);

mongoose.connect(mongoDBURI)
.then(() => console.log("MongoDB URI:", process.env.MONGODB_URI))
.then(()=>console.log("MongoDB Connected!"))
.catch(err => console.error("MongoDB Connection error:",err));

app.use(express.json());  //for parsing json request
app.use(cors());
app.use(express.static(appPath));
app.use('/css', express.static(staticPath));

app.use(express.static(__dirname, {
    extensions: ["webp", "jpg", "svg"],
}));

app.use('/auth', authRoutes);  //  /auth/register, /auth/verify-email
app.use('/auth', signinauthRoutes); // /auth/signin

app.get("/dashboard.html", authMiddleware, (req, res) => {
    res.status(200).sendFile(path.join(appPath,'dashboard.html'), (error) => {
        if (error) {
            console.error(`Error reading or sending dashboard.html:`, error);
            res.status(500).send('Error serving Dashboard!');
        }
    });
});
app.get('/dashboard.html', (req, res) => {
    res.redirect('/signin.html'); // Redirect if no token
  });

app.get("/", (req, res) => {
    res.redirect("./src/frontend/pages/index.html");
});

app.get("*", (req, res) => {
    return res.sendStatus(404);
});

app.listen(3000, async () => {
    console.log('Running on http://localhost:3000');
    await open('http://localhost:3000', { app: { name: "/usr/bin/firefox-esr" } });
    await connectDB();
});

/*app.post("/shutdown", async (req, res) => {
    console.log("Server is shut down!");
    res.send("Server will now shut down!");
    process.exit(0);
});*/
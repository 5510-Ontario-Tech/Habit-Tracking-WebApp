import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.get('/set-cookie', (req, res) => {
    res.cookie('userToken', process.env.JWT_SECRET, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: 'Strict' // prevents CSRF
    });
    res.send('Cookie set!');
});
app.listen(3000);
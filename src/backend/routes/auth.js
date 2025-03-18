import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import User from '../../backend/models/modelschema.js'; //Changed here
import connectDB from '../../database/db.js';
const router = express.Router();

// Retrieve environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'YOUR_SUPER_SECRET_KEY'; // Provide a default
const EMAIL_USER = process.env.EMAIL_USER || 'YOUR_EMAIL@gmail.com';
const EMAIL_PASS = process.env.EMAIL_PASS || 'YOUR_EMAIL_PASSWORD';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
});

router.post('/register', async (req, res) => {
        const { email, name, password } = req.body;  // Expect name

        try {
           await connectDB();
           const hashedPassword = await bcrypt.hash(password, 10);

           const newUser = new User({
                email,
                name,
                password: hashedPassword,
            });

            // 3. Generate unique verification token
            const verificationToken = crypto.randomBytes(20).toString('hex');
            newUser.verificationToken = verificationToken;

            await newUser.save();
            const verificationLink = `http://localhost:3000/verify-email?token=${verificationToken}`; // Create full URL

            const mailOptions = {
                from: EMAIL_USER,
                to: email,
                subject: 'Verify Your Email',
                html: `<p>Hi! We have noticed a sign up attempt from your side. To make sure it's you; please click this link to verify your email: <a href="${verificationLink}">${verificationLink}</a></p>`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending verification email:', error);
                    return res.status(500).json({ message: 'Error sending verification email.' });
                } else {
                    console.log('Verification email sent:', info.response);
                    return res.json({ message: 'Registration successful. Please check your email to verify your account.' });
                }
            });

        } catch (error) {
            console.error('Error registering user:', error);
            if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
                return res.status(400).json({ message: 'Email address is already registered.' });
            }
            return res.status(500).json({ message: 'Internal server error.' });
        }
    });

router.get('/verify-email', async (req, res) => {
    const { token } = req.query;

    try {
        await connectDB();
        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return res.status(400).send('Invalid verification link.');
        }

        user.isVerified = true;
        user.verificationToken = null;
        await user.save();
        return res.redirect('/signin.html');
    } catch (error) {
        console.error('Error verifying email:', error);
        return res.status(500).send('Internal server error.');
    }
});

export default router;
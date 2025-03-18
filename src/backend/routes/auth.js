const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../database/schema');

const router = express.Router();

const JWT_SECRET = 'YOUR_SUPER_SECRET_KEY';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'YOUR_EMAIL@gmail.com',
        pass: 'YOUR_EMAIL_PASSWORD'
    }
});

router.post('/register', async (req, res) => {
    const { email, name, password, birthdate } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            name,
            password: hashedPassword,
            birthdate: new Date(birthdate)
        });

        // 3. Generate unique verification token
        const verificationToken = crypto.randomBytes(20).toString('hex');
        newUser.verificationToken = verificationToken;

        await newUser.save();
        const verificationLink = `http://localhost:3000/verify-email?token=${verificationToken}`; // Create full URL

        const mailOptions = {
            from: 'YOUR_EMAIL@gmail.com',
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

module.exports = router;
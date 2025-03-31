import User from "../models/modelschema.js";
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";
import nodemailer from 'nodemailer';
  import { singupHash } from "../utils/addhashing.js";
import Habit from "../models/habitschema.js"

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'amaya.langworth88@ethereal.email',
    pass: 'a3v5wCkfMK8ngGE5fK',
  },
});

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ Success: false, message: "User already registered" });
      }
      const hashedPassword = await singupHash(password, 10); // hashfunction is working
      const verificationToken = Math.random().toString(36).slice(2);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        verificationToken,
      });
      const result = await newUser.save();
      const verificationLink = `http://localhost:3000/auth/verify-email?token=${verificationToken}`;
        await transporter.sendMail({
        from: '"Habitude" <no-reply@habitude.com>',
        to: email,
        subject: 'Verify Your Email',
        html: `<p>You have asked to be registered at our website. So please take a step.</p>
        <p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
      });
      result.password = undefined; // No hashed password returned!
      res.status(201).json({
          success: true,
          message: "User successfully registered",
          verificationToken:verificationToken,
          result
      });
    }
  catch (error) {
    console.error("Signup error:", error);
    if(!res.headersSent){
      res.status(500).json({success:false,message:"Error registering User!"});
    }
  }
};
// Verify-email
export const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOneAndUpdate({verificationToken: token},{isVerified:true},{new:true});
    if (!user) return res.status(400).json({success:false, message: 'Invalid or expired token' });
    user.verificationToken = undefined; // Clear token after verification
    // await user.save();
    res.redirect('/dashboard.html'); // redirect to dashboard
  }catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};

  // Sign In
export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user || !user.isVerified) {
        return res.status(400).json({ message: 'User not found or not verified' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({success:false, message: 'Invalid credentials' });
      res.json({success:true,message:"Login Successful!"});
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET || 'b0b8e28c0e0ccb75fe78493f52daa193a222938fec5f1531877097fd4e1c7050ffccddcc129e8b8974dd53413b1485d4d435fc25c9b1272f817a49f99638c006',
        { expiresIn: '1h' }
      );
      res.status(200).json({ token });
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
//Add Habits
export const addHabits = async (req,res) => {
  try{
    const {habitName, habitDuration, createDate} = req.body;
    const habit = new Habit({
      habitName,
      habitDuration,
      createDate: new Date(),
      isFinished:false
    });
    await habit.save();
    res.status(201).json(habit);
  }catch(error){
    res.status(500).json({ error: 'Failed to save habit' });
  }
};
// Get All Habits
export const getHabits = async (req, res) => {
  try {
      const habits = await Habit.find();
      res.json(habits);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch habits' });
  }
};
// Update habit
export const updateHabit = async (req, res) => {
  try {
      const { id } = req.params;
      const { isFinished } = req.body;
      const habit = await Habit.findByIdAndUpdate(
          id,
          { isFinished },
          { new: true }
      );
      if (!habit) return res.status(404).json({ error: 'Habit not found' });
      res.json(habit);
  } catch (error) {
      res.status(500).json({ error: 'Failed to update habit' });
  }
};
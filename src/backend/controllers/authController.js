import userModel from "../models/modelschema.js";
  import { singupHash } from "../utils/addhashing.js"; // Ensure this exists and works

  export const signup = async (req, res) => {
      const { email, password, name } = req.body; // Expecting name in signup

      try {
          const existingUser = await userModel.findOne({ email });

          if (existingUser) {
              return res.status(401).json({ Success: false, message: "User already registered" });
          }

          const hashPassword = await singupHash(password, 10); // Ensure this function is working

          const newUser = new userModel({
              email,
              password: hashPassword,
              name // Add name
          });

          const result = await newUser.save();

          result.password = undefined; // Don't send the hashed password back
          res.status(201).json({
              Success: true,
              message: "User successfully registered",
              result
          });

      } catch (error) {
          console.error("Signup error:", error);
          res.status(500).send("Internal server error");
      }
  };

  export default signup;
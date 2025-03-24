// import { signupschema } from "../middleware/verify.js";
// import { signinschema } from "../middleware/verify.js";

// // import userModel from "../models/modelschema.js";

// // import jwt from "jsonwebtoken";

// import { loginHash, singupHash } from "../utils/addhashing.js";

// export const signup = async (req, res) => {
//   const { name, email, password } = req.body;

//   console.log(req.body);
  

//   try {
//     console.log(req.body);

//     const existingUser = await userModel.findOne({ email });
//     console.log(existingUser);

//     if (existingUser) {
//       return res
//         .status(401)
//         .json({ Success: false, message: "User already regsited" });
//     }

//     console.log("entered c");
//     const hashPassword = await singupHash(password, 10);
//     console.log("hashing doen", hashPassword);

//     const newUser = new userModel({
//       name,
//       email,
//       password: hashPassword,
//     });

//     console.log("entered d ");
//     const result = await newUser.save();
//     result.password = undefined;

//     console.log("entered 2".result);

//     if (result) {
//       res.status(201).json({
//         Success: true,
//         message: "User successfully registered",
//         result,
//       });
//     }
//     // res.send("Signup successful");
//   } catch (error) {
//     res.status(500).send("Internal server error");
//     console.log("fghgh");
//   }
// };

// //User-login
// export const signin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
  
//     const existingUser = await userModel.findOne({ email }).select('+password');
//     if (!existingUser) {
//       return res
//         .status(401)
//         .json({ Success: false, message: "User does not registered" });
//     }

//     const result = await loginHash(password, existingUser.password);
//     if (!result) {
//       return res
//         .status(401)
//         .json({ Success: false, message: "Invalid user credential" });
//     }

//     const token = jwt.sign(
//       {
//         userID: existingUser._id,
//         email: existingUser.email,
//         verify: existingUser.isVerified,
//       },

//       process.env.TOKEN_SECRET,
//       {
//         expiresIn: '5h',


//       }
//     );

//     res
//       .cookie("Authorization", "Bearer" + token, {
//         expire: new Date(Date.now() + 5 * 400000),

//         httpOnly: process.env.NODE_ENV === "producation",
//         secure: process.env.NODE_ENV === "producation",
//       })

//       .json({
//         Success: true,
//         token,
//         message: "User login sucessfull",
//       });
//   } catch (error) {
//     res.status(500).send("Internal server error");
//     console.log("fghgh");
//   }
// };

// // Export the router to use it in your app
// export default signup; signin;


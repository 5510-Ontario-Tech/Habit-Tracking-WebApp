import { signupschema } from "../middleware/verify.js";

import userModel from "../models/modelschema.js";

import { singupHash } from "../utils/addhashing.js";

export const signup = async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);

  try {
    console.log("entered bdf ");

    console.log("entered b ");
    const existingUser = await userModel.findOne({ email });
    console.log(existingUser);

    if (existingUser) {
      return res
        .status(401)
        .json({ Success: false, message: "User already regsited" });
    }

    console.log("entered c ");
    const hashPassword = await singupHash(password, 10);
    console.log("hashing doen", hashPassword);

    const newUser = new userModel({
      email,
      password: hashPassword,
    });
    console.log("saving 1", newUser);



    
    console.log("entered d ");
    const result = await newUser.save();
    console.log("saving 2222", result);

    result.password = undefined;
    res.status(201).json({
      Success: true,
      message: "User successfully registered",
      result,
    });

    console.log("entered 2".result);

    // res.send("Signup successful");
  } catch (error) {
    res.status(500).send("Internal server error");
    console.log("fghgh");
  }
};

// Export the router to use it in your app
export default signup;

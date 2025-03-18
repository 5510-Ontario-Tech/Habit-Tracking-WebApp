import { signupschema } from "../middleware/verify.js";
import { signinschema } from "../middleware/verify.js";

import userModel from "../models/modelschema.js";

import { singupHash } from "../utils/addhashing.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

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

    console.log("entered c");
    const hashPassword = await singupHash(password, 10);
    console.log("hashing doen", hashPassword);

    const newUser = new userModel({
      name,
      email,
      password: hashPassword,
    });

    console.log("entered d ");
    const result = await newUser.save()
    result.password = undefined;

    console.log("entered 2".result);

    if(result){
    
      res.status(201).json({
        Success: true,
        message: "User successfully registered",
        result,
      });

    }
    // res.send("Signup successful");
  } catch (error) {
    res.status(500).send("Internal server error");
    console.log("fghgh");
  }

}


//User-login
export const signin = async (req, res) => {
  const {email, password } = req.body;


  try {

    const {error, value} = signinschema({email,password});

    if(error){
      return res.status(401)
      .json({

        Success: false,
        message: error.details[0].message
      })
    }
  

  }


  catch (error) {
    res.status(500).send("Internal server error");
    console.log("fghgh");
  }

}

// Export the router to use it in your app
export default signup;
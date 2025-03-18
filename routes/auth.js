import express from 'express';
import { signup } from '../controllers/authController.js'; 
import { signin} from '../controllers/authController.js'; 

// Create a router
const authRouter = express.Router(); 

// Define the route and attach the controller function
//// Linked signup controller to POST /signup
authRouter.post("/signup", signup);  

//login
authRouter.post("/signin", signin);  


// Export the router to use it in your app
export default authRouter; 





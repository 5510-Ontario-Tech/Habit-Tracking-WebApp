import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization') || localStorage.getItem('jwtToken');  //Try getting it from header and also from local storage.

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret

    req.user = decoded.user; // Attach the user data to the request
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(400).json({ message: 'Token is not valid' });
  }
};

export default authMiddleware;
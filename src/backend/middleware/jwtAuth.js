import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // (format: "Bearer <token>")
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  
  jwt.verify(token, process.env.JWT_SECRET || 'b0b8e28c0e0ccb75fe78493f52daa193a222938fec5f1531877097fd4e1c7050ffccddcc129e8b8974dd53413b1485d4d435fc25c9b1272f817a49f99638c006',(err,decoded) => {
    if(err) return res.status(403).json({ message: 'Token is not valid' });
    req.user = decoded; // Attach the user data to the request
    next();
  });
};

export default authMiddleware;
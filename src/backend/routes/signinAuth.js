import express from 'express';
  import bcrypt from 'bcrypt';
  import jwt from 'jsonwebtoken';
  import User from '../../backend/models/modelschema.js';
  import connectDB from '../../database/db.js';

  const router = express.Router();
  const JWT_SECRET = process.env.JWT_SECRET || 'b0b8e28c0e0ccb75fe78493f52daa193a222938fec5f1531877097fd4e1c7050ffccddcc129e8b8974dd53413b1485d4d435fc25c9b1272f817a49f99638c006';

  router.post('/signin', async (req, res) => {
      const { email, password } = req.body;

      try {
          await connectDB();
          const user = await User.findOne({ email });

          if (!user) {
              return res.status(401).json({ message: 'Invalid email or password' });
          }

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
              return res.status(401).json({ message: 'Invalid email or password' });
          }

          const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
          return res.json({ token, user });

      } catch (error) {
          console.error('Error signing in user:', error);
          return res.status(500).json({ message: 'Internal server error' });
      }
  });

export default router;
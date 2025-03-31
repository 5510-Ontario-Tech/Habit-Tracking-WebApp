import express from 'express';
import { register, signin, verifyEmail } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/verify-email', verifyEmail);
router.post('/signin',signin);

export default router;
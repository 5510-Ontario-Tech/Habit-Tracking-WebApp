import express from 'express';
import { addHabits,getHabits, register, signin, updateHabit, verifyEmail } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/verify-email', verifyEmail);
router.post('/signin',signin);
router.post('/addHabit',addHabits);
router.get('/habits',getHabits);
router.patch('/habits/:id',updateHabit)

export default router;
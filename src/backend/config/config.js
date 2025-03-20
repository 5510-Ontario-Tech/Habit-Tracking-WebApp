// config/config.js
import dotenv from 'dotenv';
dotenv.config();

export const port = process.env.PORT || 3000;
export const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/habitude_1';
export const jwtSecret = process.env.JWT_SECRET || 'b0b8e28c0e0ccb75fe78493f52daa193a222938fec5f1531877097fd4e1c7050ffccddcc129e8b8974dd53413b1485d4d435fc25c9b1272f817a49f99638c006';
export const emailUser = process.env.EMAIL_USER || 'amaya.langworth88@ethereal.email';
export const emailPass = process.env.EMAIL_PASS || 'a3v5wCkfMK8ngGE5fK';
// src/backend/utils/addhashing.js
import bcrypt from 'bcrypt';

export const singupHash = async (password, saltRounds) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);  // Generate the salt
    const hash = await bcrypt.hash(password, salt); // Hash the password with the salt
    return hash;
  } catch (err) {
    console.error("Hashing error:", err);
    throw err; 
}
};
import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    },
  city: {
    type: String,
  },
  province: {
    type: String,
  },
  country: {
    type: String,
  },
  isVerified: {
    type: Boolean,
  },
  verificationToken: {
    type: String,
  },
});

export default mongoose.model("userDb", clientSchema);


// src/backend/models/habitschema.js
import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    createDate: {
        type: Date,
        required: true
    },
    isFinished: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model('Habit', habitSchema);
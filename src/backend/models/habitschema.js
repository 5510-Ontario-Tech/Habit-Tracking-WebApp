// src/backend/models/habitschema.js
import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
    habitName: {
        type: String,
        required: true
    },
    habitDuration: {
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
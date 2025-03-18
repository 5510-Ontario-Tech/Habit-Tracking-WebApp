import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    birthdate:{
        type:Date,
        required:true
    },
    city:{
        type:String,

    },
    province:{
        type:String,
    },
    country:{
        type:String,
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    verificationToken:{
        type:String,
        default:null
    }
});

export default mongoose.model('User',userSchema);
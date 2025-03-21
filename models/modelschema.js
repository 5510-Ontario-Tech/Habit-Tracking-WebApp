import mongoose from "mongoose";
// 
// const userSchema = new mongoose.Schema({
    //name:{
      //  type:String,
      //  required:true
   // },
   // email:{
   //     type:String,
   //     required:true,
    //    unique:true
    //},
    //password:{
    //    type:String,
     //   required:true
   // },
   // birthdate:{
    //    type:Date,
    //    required:true
    // },
    // city:{
    //     type:String,

    // },
    // province:{
    //     type:String,
    // },
    // country:{
    //     type:String,
    // },
    // isVerified:{
    //     type:Boolean,
    //     default:false
    // },
    // verificationToken:{
    //     type:String,
    //     default:null
    // }
// });

<<<<<<< HEAD:src/backend/models/modelschema.js
// export default mongoose.model('User',userSchema);
=======
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
=======
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
    default:false
  },
  verificationToken: {
    type: String,
    select:false,
  },
},{
  timestamps: true,
  
});

export default mongoose.model("userDb", clientSchema);

>>>>>>> 3b9c8bd365e4292d6d669ba00037eba9a611f5e0
>>>>>>> c8cd0a467bdff617325b48a782e4435facb82276:models/modelschema.js

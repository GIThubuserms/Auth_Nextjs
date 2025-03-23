import mongoose from "mongoose";
import { Schema } from "mongoose";
import jwt from 'jsonwebtoken'

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    unique: [true, "Username should be unique"],
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  Isverified: {
    type: Boolean,
    default: false,
  },
  ForgetPasswordToken: {
    type: String,
  },
  ForgetPasswordExpiry: {
    type: Date,
  },
  VerifyToken: {
    type: String,
  },
  VerifyExpiry: {
    type: Date,
  },
});

UserSchema.methods.Signjwt=function(){
  return jwt.sign({
      username:this.username,
      email:this.email,
      _id:this._id
    },process.env.JWT_TOKEN!,{expiresIn:"1d"})

}

export const User=mongoose.models.users || mongoose.model('users',UserSchema)
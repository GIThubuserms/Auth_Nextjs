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

UserSchema.methods.Signjwt=async function(){
  return jwt.sign

}

export const User=mongoose.models.users || mongoose.model('users',UserSchema)
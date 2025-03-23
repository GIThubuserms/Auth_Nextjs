import { dbconnect } from "@/db/dbconnect";
import { User } from "@/models/User/User.model";
import { NextResponse,NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { SendEmail } from "@/lib/mailer";


export async function POST(req:NextRequest){
  await dbconnect()

  try {
     const user=await req.json()     
     const {email,password,username}=user
     
     if(!(email && password)){
      console.log("Email and Password is required");
      return NextResponse.json({message:"Email and Password are required credentials"})       
     }

   const isuseralreadyexists=await User.findOne({
    $or:[{email},{username}]
   })

   if(isuseralreadyexists){
    console.log("Email and Password is required");
    return NextResponse.json({message:"User already exists with username or email"})       
   }

   const hashedpassword=await bcrypt.hash(password,10)

   const newUser=await User.create({
    username:username,
    email:email,
    password:hashedpassword,
   })

   if(!newUser){
    console.log("Error in creating User");
    return NextResponse.json({
      message:"Error while requesting for signup",
      status:400
   })
   }

  //  await SendEmail({email,emailType:"VERIFY",id:String(newUser._id)})

   return NextResponse.json({
    message:"User Created Successfully",
    status:200,
    data:newUser
  })

   } catch (error) {
    console.log("Error in signup"+error);
    return NextResponse.json({
      message:"Error while requesting for signup",
      status:500
    })
    
   }

}
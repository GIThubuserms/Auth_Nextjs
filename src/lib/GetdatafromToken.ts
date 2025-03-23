import { dbconnect } from "@/db/dbconnect";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export const GetDataFromToken=async(req:NextRequest)=>{
try {
    await dbconnect()

    const token=req.cookies.get("token")?.value||""
    console.log(token);
    if(!token){
        throw new Error("Token is Not found")
    }

    const DecodedToken:any=jwt.verify(token,process.env.JWT_TOKEN!)
    console.log(DecodedToken);
      if(!DecodedToken){
        throw new Error("User is Not Verified")
    }
  
    return DecodedToken._id
    

} catch (error) {
    console.log("Error in GetdataFromToken" + error);
        return NextResponse.json({
          message: "Error while getting data from token",
          status: 500,
        });
}
}
import { dbconnect } from "@/db/dbconnect";
import { GetDataFromToken } from "@/lib/GetdatafromToken";
import { User } from "@/models/User/User.model";
import mongoose from "mongoose";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbconnect();
   const decodedTokenId= await GetDataFromToken(req)
 
   
   if (!decodedTokenId ||!mongoose.isValidObjectId(decodedTokenId)) {
    return NextResponse.json({
      message: "User Not Authenticated",
      status: 400,
    })}

    const mongoose_decodedTokenId = new mongoose.Types.ObjectId(decodedTokenId);
    const dbincominguser=await User.findById(mongoose_decodedTokenId)

   if(!dbincominguser){
    return NextResponse.json({
      message: "User Not Found",
      status: 400,
    })   }

   return NextResponse.json({
    message: "User Found Successfully",
    user:dbincominguser,
    status: 200,
  });
   
  } catch (error) {
    console.log("Error in AboutMe " + error);
    return NextResponse.json({
      message: "Error while requesting for AboutMe",
      status: 500,
    });
  }
}

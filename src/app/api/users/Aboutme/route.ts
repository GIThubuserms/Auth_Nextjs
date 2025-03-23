import { dbconnect } from "@/db/dbconnect";
import { GetDataFromToken } from "@/lib/GetdatafromToken";
import { User } from "@/models/User/User.model";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbconnect();
   const decodedTokenId= GetDataFromToken(req)
   const dbincominguser=await User.findOne({_id:decodedTokenId}).select('+_id +username +email')
   if(!dbincominguser){
    throw new Error("No User Found from Token")
   }

   return NextResponse.json({
    message: "User Found Successfully",
    user:dbincominguser,
    status: 500,
  });
   
  } catch (error) {
    console.log("Error in AboutMe" + error);
    return NextResponse.json({
      message: "Error while requesting for AboutMe",
      status: 500,
    });
  }
}

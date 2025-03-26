import { dbconnect } from "@/db/dbconnect";
import { User } from "@/models/User/User.model";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    await dbconnect()
    try {
        const body=await req.json()
        const {token}=body
        console.log(body);
        console.log("xxxxxxxx"+token);
        
        const isUserExistWithToken=await User.findOne({VerifyToken:token})
 
        console.log("YYYYYYYYYYYYY"+isUserExistWithToken);
        
        if(!isUserExistWithToken){
          return NextResponse.json({
                message:"User Credentials Incorrect",
                status:400
            })
        }

        isUserExistWithToken.Isverified=true
        await isUserExistWithToken.save()
        
        return NextResponse.json({
            message:"User Verified Successfully",
            status:200
        })
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message:"User Verified  Failed",
            status:404
        })
    }
}
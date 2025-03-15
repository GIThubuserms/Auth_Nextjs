import { dbconnect } from "@/db/dbconnect";
import { User } from "@/models/User/User.model";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest,res:NextResponse) {
  try {
    await dbconnect();
    const user = await req.json();
    const { email, password } = user;

    if (!(email && password)) {
      console.log("Email and Password is required");
      return NextResponse.json({
        message: "Email and Password are required credentials",
      });
    }

    const dbIncomingUser = await User.findOne({
      email,
    });

    if (!dbIncomingUser) {
        console.log("User Doesnot exists with that credentials");
        return NextResponse.json({
          message: "User Doesnot exists ",
        });
      }
    const hashedpassword = await bcrypt.compare(password,user.password);

    if(!hashedpassword){
        console.log("Password is not correct");
        return NextResponse.json({
          message: "Incorrect Password",
        }); 
    }

     
 
    return NextResponse.json({
      message: "User Created Successfully",
      status: 200,
      data: dbIncomingUser,
    });
  } catch (error) {
    console.log("Error in signin" + error);
    return NextResponse.json({
      message: "Error while requesting for signin",
      status: 500,
    });
  }
}

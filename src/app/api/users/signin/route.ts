import { dbconnect } from "@/db/dbconnect";
import { User } from "@/models/User/User.model";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    await dbconnect();
    const user = await req.json();
    const { email, password } = user;

    if (!(email && password)) {
      return NextResponse.json({
        message: "Email and Password are required credentials",
        status: 400,

      });
    }

    const dbIncomingUser = await User.findOne({
      email:email
    });

    if (!dbIncomingUser) {
        return NextResponse.json({
          message: "User Doesnot exists ",
          status: 400,

        });
      }
    const hashedpassword = await bcrypt.compare(password,dbIncomingUser.password);

    if(!hashedpassword){
        return NextResponse.json({
          message: "Incorrect Password",
          status: 400,

        }); 
    }
    const token=dbIncomingUser.Signjwt() 
     
    const response=NextResponse.json({
      message: "User Login Successfully",
      status: 200,
      data: dbIncomingUser,
    });

    response.cookies.set('token',token,{httpOnly:true})
    return response

  } catch (error) {
    console.log("Error in signin" + error);
    return NextResponse.json({
      message: "Error while requesting for signin",
      status: 500,
    });
  }
}

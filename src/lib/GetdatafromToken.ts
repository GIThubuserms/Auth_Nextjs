import { dbconnect } from "@/db/dbconnect";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const GetDataFromToken = async (req: NextRequest) => {
  try {
    await dbconnect();

    const token = req.cookies.get("token")?.value || "";
    if (!token) {
      return NextResponse.json({
        message: "User is Not verified",
        status: 403,
      });
    }
    // console.log("My Token from cokkie :-  " + token);
    // console.log("My Token Type        :-  " + typeof(token))

   

    const DecodedToken: any = jwt.verify(token, process.env.JWT_TOKEN!);

    if (!DecodedToken) {
      return NextResponse.json({
        message: "User is Not verified",
        status: 403,
      });
    }
    console.log("My decoded Token :- " + DecodedToken);

    return DecodedToken._id;

  } catch (error) {
    console.log("Error in GetdataFromToken" + error);
    return NextResponse.json({
      message: "Error while getting data from token",
      status: 500,
    });
  }
};

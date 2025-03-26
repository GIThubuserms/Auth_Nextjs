import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({
      message: "User Logout Successfully",
      status: 200,
    });

    response.cookies.set("token", "", {
      httpOnly: true,
    });

    return response;

  } catch (error) {
    console.log("Error in signin" + error);
    return NextResponse.json({
      message: "Error while requesting for signin",
      status: 500,
    });
  }
}

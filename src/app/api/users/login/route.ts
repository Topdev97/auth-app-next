import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.schema";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect();

// handle Post request
export async function POST(request: NextRequest) {
  try {
    // Response from frontend
    const reqbody = await request.json();
    const { email, password } = reqbody;
    console.log(`email is ${email} and password is ${password}`);

    // check if user exist or not
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return NextResponse.json(
        { error: "User does not Exist " },
        { status: 400 }
      );
    }

    // check if password is correct
    const validPassword = await bcryptjs.compare(password, userExist.password);
    if (!validPassword) {
      NextResponse.json(
        { error: "Invalid Password Please Check" },
        { status: 400 }
      );
    }

    // create token data like what data we need to pass in token
    const tokenData = {
      id: userExist._id,
      username: userExist.username,
      email: userExist.email,
    };

    // create jwt  token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    // store it in a cookies
    const response = NextResponse.json({
      message: "login Suesfully",
      sucess: true,
    });

    //  setting cookies in response
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    // now return response to frontend
    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: "An Error Occured during login" },
      { status: 500 }
    );
  }
}

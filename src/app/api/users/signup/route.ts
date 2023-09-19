import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.schema";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

// Handle Post Request
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { password, email, username } = reqBody;

    console.log(reqBody);
    // check if user Already exist
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User Already Exist" },
        { status: 400 }
      );
    }

    // Hash Password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // save into a database
    const savedUser = await newUser.save();
    console.log(savedUser);
    return NextResponse.json({
      message: "User Created Succesfully",
      sucess: true,
      savedUser,
    });


  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

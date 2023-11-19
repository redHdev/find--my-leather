"use server";

import getErrorMessage from "@/lib/getErrorMessage";
import { SignUpSchema, SignUpType } from "@/lib/user/AuthSchema";
import { connectMongoDB } from "@/lib/MongoDB";
import UserModel from "@/lib/user/UserModel";
import bcrypt from "bcryptjs";

export async function SignUpUser(data: SignUpType) {
  const result = SignUpSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: getErrorMessage(result.error.format()) };
  }

  try {
    const { name, email, password } = result.data;

    if (!name || !email || !password) {
      return { success: false, error: "Please fill all the fields" };
    }

    await connectMongoDB();

    // Check if user already exist
    const userExist = await UserModel.findOne({ email }).select("_id");
    if (userExist) {
      return {
        success: false,
        code: "USER_ALREADY_EXIST",
        error: "You have already registered, Please login to your account!",
      };
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    // Save user
    const savedUser = await newUser.save();

    // Send verification email
    // await sendVerificationEmail(savedUser);

    const responseData = {
      _id: savedUser._id.toString(),
      name: savedUser.name,
      email: savedUser.email,
    };

    return {
      success: true,
      data: responseData,
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}

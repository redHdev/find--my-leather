import mongoose from "mongoose";

const UserModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
      minlength: [4, "Name must be at least 4 characters long"],
      maxlength: [20, "Name must be at most 20 characters long"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      dropDups: true,
      trim: true,
      lowercase: true,
      index: true,
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
    role: {
      type: String,
      enum: ["user", "customer", "seller", "agent", "admin", "superAdmin"],
      default: "user",
    },
    customers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    image: {
      type: String,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    verifyToken: String,
    verifyTokenExpiry: Date,
    passwordResetToken: String,
    passwordResetTokenExpiry: Date,
  },
  { timestamps: true }
);

const UserModel =
  mongoose.models.User || mongoose.model("User", UserModelSchema);

export default UserModel;

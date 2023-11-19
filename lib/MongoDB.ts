import mongoose from "mongoose";
import getErrorMessage from "./getErrorMessage";

export async function connectMongoDB() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined!");
    }
    await mongoose.connect(process.env.MONGODB_URI!);

    // const connection = mongoose.connection;
    // connection.on("error", (err) => {
    //   console.log(
    //     "MongoDB connection error. Please make sure MongoDB is running. " + err
    //   );
    //   process.exit();
    // });
    // connection.once("open", () => {
    //   console.log("MongoDB database connection established successfully");
    // });

    // console.log("MongoDB database connection established successfully");
  } catch (err) {
    // console.log("Error connecting to MongoDB: " + err);
    throw new Error("connectMongoDB : " + getErrorMessage(err));
  }
}

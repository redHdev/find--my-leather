"use server";

import { connectMongoDB } from "@/lib/MongoDB";
import UserModel from "@/lib/user/UserModel";
import getErrorMessage from "@/lib/getErrorMessage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/NextAuthOption";

export async function FetchCustomerList() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return { success: false, error: "You're not Logged In, Please Log In!" };
    }

    if (session.user?.role !== "seller") {
      return {
        success: false,
        error: "You're not Authorized to perform this action!",
      };
    }

    await connectMongoDB();

    const sellerCustomers = await UserModel.findById(session.user?.id, {
      customers: 1,
    }).populate("customers", "name email id");

    if (!sellerCustomers) {
      return {
        success: false,
        error: "No Customer Found!",
      };
    }

    const customerList = sellerCustomers.customers.map((customer: any) => ({
      name: customer.name,
      email: customer.email,
      id: customer._id.toString(),
    }));

    const userData = {
      sellerId: session.user?.id,
      customerList: customerList,
    };

    return {
      success: true,
      data: userData,
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}

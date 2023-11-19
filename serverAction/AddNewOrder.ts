"use server";

import getErrorMessage from "@/lib/getErrorMessage";
import { connectMongoDB } from "@/lib/MongoDB";
import OrderModel from "@/lib/order/OrderModel";
import { OrderSchema, OrderType } from "@/lib/order/OrderZodSchema";

export async function AddNewOrder(data: OrderType) {
  const result = OrderSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: getErrorMessage(result.error.format()) };
  }

  try {
    await connectMongoDB();

    const newOrder = await OrderModel.create(result.data);

    const savedOrder = await newOrder.save();

    return {
      success: true,
      message: "Order created successfully",
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}

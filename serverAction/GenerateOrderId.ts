"use server";

import getErrorMessage from "@/lib/getErrorMessage";
import { connectMongoDB } from "@/lib/MongoDB";
import OrderModel from "@/lib/order/OrderModel";

export async function GenerateOrderId() {
  try {
    await connectMongoDB();

    const date = new Date();
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based in JS
    const year = date.getFullYear().toString().slice(-2); // Get last two digits of year

    const prefix = `${day}${month}${year}`;

    // Fetch the highest orderId for today from the database
    const order = await OrderModel.find({ orderId: new RegExp("^" + prefix) })
      .sort({ orderId: -1 })
      .limit(1)
      .exec();

    const latestOrderId = order.length > 0 ? order[0].orderId : null;

    let orderId;
    if (latestOrderId) {
      const number = parseInt(latestOrderId.slice(-2)) + 1;
      orderId = `${latestOrderId.slice(0, -2)}${number
        .toString()
        .padStart(2, "0")}`;
    } else {
      const date = new Date();
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based in JS
      const year = date.getFullYear().toString().slice(-2); // Get last two digits of year
      orderId = `${day}${month}${year}01`;
    }

    return {
      success: true,
      data: orderId,
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}

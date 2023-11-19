import mongoose from "mongoose";
import {
  complianceCertificates,
  orderStatus,
  paymentTerms,
  selection,
  shippingMethod,
  shippingTerms,
} from "./DefaultOrderValues";

const OrderModelSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    rfqDate: { type: Date, required: true },
    article: { type: String, required: true, trim: true },
    colour: { type: String, required: true, trim: true },
    size: { type: Number, required: true },
    thickness: { type: Number, required: true },
    selection: { type: String, enum: selection, required: true },
    estimatedShipmentDate: { type: Date, required: true },
    shippingTerms: { type: String, enum: shippingTerms, required: true },
    shippingMethod: { type: String, enum: shippingMethod, required: true },
    complianceCertificates: {
      type: String,
      enum: complianceCertificates,
      required: true,
    },
    specialRequirement: { type: String, trim: true },
    paymentTerms: { type: String, enum: paymentTerms, required: true },
    quantity: { type: Number, required: true },
    pricePerSqFt: { type: Number, required: true },
    totalOrderValue: { type: Number, required: true },
    expectedDeliveryDate: { type: Date, required: true },
    orderStatus: { type: String, enum: orderStatus, required: true },
  },
  { timestamps: true }
);

const OrderModel =
  mongoose.models.Order || mongoose.model("Order", OrderModelSchema);

export default OrderModel;

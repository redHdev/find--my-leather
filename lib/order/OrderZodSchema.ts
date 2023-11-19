import * as z from "zod";
import {
  complianceCertificates,
  orderStatus,
  paymentTerms,
  selection,
  shippingMethod,
  shippingTerms,
} from "./DefaultOrderValues";

const trimmedString = z
  .string()
  .trim()
  .refine((value) => value !== "", "This field is required");
const positiveNumber = z.number().min(1, "Must be greater than 0");
const nonEmptyEnum = (values: readonly [string, ...string[]]) =>
  z.enum(values).refine((value) => value !== null, "This field is required");
const nonNullDate = z
  .date()
  .refine((value) => value !== null, "This field is required");

export const OrderSchema = z.object({
  orderId: trimmedString,
  customerId: trimmedString,
  sellerId: trimmedString,
  rfqDate: nonNullDate,
  article: trimmedString,
  colour: trimmedString,
  size: positiveNumber,
  thickness: positiveNumber,
  selection: nonEmptyEnum(selection),
  estimatedShipmentDate: nonNullDate,
  shippingTerms: nonEmptyEnum(shippingTerms),
  shippingMethod: nonEmptyEnum(shippingMethod),
  complianceCertificates: nonEmptyEnum(complianceCertificates),
  specialRequirement: z.string().trim().optional(),
  paymentTerms: nonEmptyEnum(paymentTerms),
  quantity: positiveNumber,
  pricePerSqFt: positiveNumber,
  totalOrderValue: positiveNumber,
  expectedDeliveryDate: nonNullDate,
  orderStatus: nonEmptyEnum(orderStatus),
});

export type OrderType = z.infer<typeof OrderSchema>;

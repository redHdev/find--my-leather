"use client";

import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import { useRouter } from "next/navigation";
import getErrorMessage from "@/lib/getErrorMessage";
import { toast } from "react-toastify";
import { GenerateOrderId } from "@/serverAction/GenerateOrderId";
import { OrderSchema, OrderType } from "@/lib/order/OrderZodSchema";
import { CustomerList } from "@/types/CustomerListType";
import {
  complianceCertificates,
  orderStatus,
  paymentTerms,
  selection,
  shippingMethod,
  shippingTerms,
} from "@/lib/order/DefaultOrderValues";
import { AddNewOrder } from "@/serverAction/AddNewOrder";

const AddNewOrderForm = ({
  customerList,
  sellerId,
}: {
  customerList: CustomerList[];
  sellerId: string;
}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<OrderType>({
    resolver: zodResolver(OrderSchema),
  });

  const [isFormEnabled, setIsFormEnabled] = useState(false);
  const [isFormProcessing, setIsFormProcessing] = useState(false);
  const [isOrderIdGenerated, setIsOrderIdGenerated] = useState(false);

  const onSubmit: SubmitHandler<OrderType> = async (data) => {
    setIsFormProcessing(true);
    setIsFormEnabled(false);
    let temp = false;
    try {
      const res = await AddNewOrder(data);

      if (!res) {
        toast.warn("Something went wrong, Please try again later!");
      } else if (res.error) {
        toast.error(res.error);
      } else if (res.success) {
        temp = true;
        toast.success(res.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsFormProcessing(false);

      if (temp) {
        reset();
        setIsOrderIdGenerated(false);
      } else {
        setIsFormEnabled(true);
      }
    }
  };

  const handleGenerateOrderId = async () => {
    setIsFormProcessing(true);
    try {
      const newOrderId = await GenerateOrderId();

      if (newOrderId && newOrderId.data) {
        setValue("orderId", newOrderId.data);
        setValue("sellerId", sellerId);
        toast.success(`Order ID Generated: ${newOrderId.data}`);
        setIsFormEnabled(true);
        setIsOrderIdGenerated(true);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsFormProcessing(false);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          New Order Form
        </h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Order ID <span className="text-meta-1">*</span>
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  placeholder="Generate Order ID"
                  disabled
                  {...register("orderId")}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input"
                />
                <button
                  className="inline-flex items-center justify-center gap-3.5 cursor-pointer rounded-md bg-findmyleather py-3 px-4 text-center font-medium text-white transition hover:bg-opacity-90 disabled:bg-bodydark lg:px-8 xl:px-10"
                  type="button"
                  onClick={() => {
                    handleGenerateOrderId();
                  }}
                  disabled={isOrderIdGenerated || isFormProcessing}
                >
                  {!isOrderIdGenerated && isFormProcessing ? (
                    <>
                      Generating
                      <Spinner />
                    </>
                  ) : (
                    "Generate"
                  )}
                </button>
              </div>
              <ErrorMessage>{errors.orderId?.message}</ErrorMessage>
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Select Customer <span className="text-meta-1">*</span>
              </label>
              <select
                className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
                disabled={!isFormEnabled}
                defaultValue={""}
                {...register("customerId")}
              >
                <option value="" disabled hidden>
                  Choose Customer
                </option>
                {customerList.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name} - {customer.email}
                  </option>
                ))}
              </select>
              <ErrorMessage>{errors.customerId?.message}</ErrorMessage>
            </div>
          </div>

          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                RFQ Date <span className="text-meta-1">*</span>
              </label>
              <input
                type="date"
                placeholder="Select RFQ Date"
                disabled={!isFormEnabled}
                {...register("rfqDate", {
                  valueAsDate: true,
                })}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-findmyleather focus:border-findmyleather focus:focus:border-findmyleather"
              />
              <ErrorMessage>{errors.rfqDate?.message}</ErrorMessage>
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Article <span className="text-meta-1">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Product Name"
                disabled={!isFormEnabled}
                {...register("article")}
                className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
              />
              <ErrorMessage>{errors.article?.message}</ErrorMessage>
            </div>
          </div>

          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Color <span className="text-meta-1">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Color"
                disabled={!isFormEnabled}
                {...register("colour")}
                className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
              />
              <ErrorMessage>{errors.colour?.message}</ErrorMessage>
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Size in Sq.feet <span className="text-meta-1">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="Enter Size"
                disabled={!isFormEnabled}
                {...register("size", {
                  valueAsNumber: true,
                })}
                className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
              />
              <ErrorMessage>{errors.size?.message}</ErrorMessage>
            </div>
          </div>

          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Thickness in mm <span className="text-meta-1">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="Enter Thickness"
                disabled={!isFormEnabled}
                {...register("thickness", {
                  valueAsNumber: true,
                })}
                className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
              />
              <ErrorMessage>{errors.thickness?.message}</ErrorMessage>
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Selection <span className="text-meta-1">*</span>
              </label>
              <select
                className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
                disabled={!isFormEnabled}
                defaultValue={""}
                {...register("selection")}
              >
                <option value="" disabled hidden>
                  Choose Selection
                </option>
                {selection.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <ErrorMessage>{errors.selection?.message}</ErrorMessage>
            </div>
          </div>

          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Estimated Shipment Date <span className="text-meta-1">*</span>
              </label>
              <input
                type="date"
                placeholder="Enter Shipment Date"
                disabled={!isFormEnabled}
                {...register("estimatedShipmentDate", {
                  valueAsDate: true,
                })}
                className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
              />
              <ErrorMessage>
                {errors.estimatedShipmentDate?.message}
              </ErrorMessage>
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Shipping Terms <span className="text-meta-1">*</span>
              </label>
              <select
                className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
                disabled={!isFormEnabled}
                defaultValue={""}
                {...register("shippingTerms")}
              >
                <option value="" disabled hidden>
                  Choose Shipping Terms
                </option>
                {shippingTerms.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <ErrorMessage>{errors.shippingTerms?.message}</ErrorMessage>
            </div>
          </div>

          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Shipping Methods <span className="text-meta-1">*</span>
              </label>
              <select
                className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
                disabled={!isFormEnabled}
                defaultValue={""}
                {...register("shippingMethod")}
              >
                <option value="" disabled hidden>
                  Choose Shipping Method
                </option>
                {shippingMethod.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <ErrorMessage>{errors.shippingMethod?.message}</ErrorMessage>
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Compliance Certificates <span className="text-meta-1">*</span>
              </label>
              <select
                className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
                disabled={!isFormEnabled}
                defaultValue={""}
                {...register("complianceCertificates")}
              >
                <option value="" disabled hidden>
                  Choose Compliance Certificates
                </option>
                {complianceCertificates.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <ErrorMessage>
                {errors.complianceCertificates?.message}
              </ErrorMessage>
            </div>
          </div>

          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Payment Terms <span className="text-meta-1">*</span>
              </label>
              <select
                className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
                disabled={!isFormEnabled}
                defaultValue={""}
                {...register("paymentTerms")}
              >
                <option value="" disabled hidden>
                  Choose Payment Terms
                </option>
                {paymentTerms.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <ErrorMessage>{errors.paymentTerms?.message}</ErrorMessage>
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Quantity in Sq.feet <span className="text-meta-1">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="Enter Quantity"
                disabled={!isFormEnabled}
                {...register("quantity", {
                  valueAsNumber: true,
                })}
                className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
              />
              <ErrorMessage>{errors.quantity?.message}</ErrorMessage>
            </div>
          </div>

          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Price Per Sq.feet <span className="text-meta-1">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="Enter your Price"
                disabled={!isFormEnabled}
                {...register("pricePerSqFt", {
                  valueAsNumber: true,
                })}
                className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
              />
              <ErrorMessage>{errors.pricePerSqFt?.message}</ErrorMessage>
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Total Order Value <span className="text-meta-1">*</span>
              </label>
              <input
                type="number"
                placeholder="Enter Total Order Value"
                disabled={!isFormEnabled}
                {...register("totalOrderValue", {
                  valueAsNumber: true,
                })}
                className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
              />
              <ErrorMessage>{errors.totalOrderValue?.message}</ErrorMessage>
            </div>
          </div>

          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Expected Delivery Date <span className="text-meta-1">*</span>
              </label>
              <input
                type="date"
                placeholder="Enter Expected Delivery Date"
                disabled={!isFormEnabled}
                {...register("expectedDeliveryDate", {
                  valueAsDate: true,
                })}
                className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
              />
              <ErrorMessage>
                {errors.expectedDeliveryDate?.message}
              </ErrorMessage>
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Order Status <span className="text-meta-1">*</span>
              </label>
              <select
                className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
                disabled={!isFormEnabled}
                defaultValue={""}
                {...register("orderStatus")}
              >
                <option value="" disabled hidden>
                  Choose Payment Terms
                </option>
                {orderStatus.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <ErrorMessage>{errors.orderStatus?.message}</ErrorMessage>
            </div>
          </div>

          <div className="mb-6">
            <label className="mb-2.5 block text-black dark:text-white">
              Special Requirements
            </label>
            <textarea
              rows={3}
              placeholder="Enter Special Requirements"
              disabled={!isFormEnabled}
              {...register("specialRequirement")}
              className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:disabled:bg-strokedark dark:border-form-strokedark dark:bg-form-input focus:ring-0 focus:border-findmyleather focus:focus:border-findmyleather"
            ></textarea>
            <ErrorMessage>{errors.specialRequirement?.message}</ErrorMessage>
          </div>

          <div className="flex justify-center items-center">
            <button
              className="flex w-full md:w-1/2 items-center justify-center rounded gap-3.5 cursor-pointer bg-findmyleather p-3 font-medium text-white transition hover:bg-opacity-90 disabled:bg-bodydark2 dark:disabled:bg-body"
              disabled={!isFormEnabled}
              type="submit"
            >
              {isFormProcessing && isOrderIdGenerated ? (
                <>
                  Adding New Order
                  <Spinner />
                </>
              ) : (
                "Add New Order"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewOrderForm;

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import OrderTabs from "@/components/DataTable/OrderTabs";
import ErrorPage from "@/components/ErrorPage/ErrorPage";
import { FetchOrderDetails } from "@/serverAction/FetchOrderDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Details - Find My Leather",
  description: "India's first global leather sourcing and procurement platform",
  // other metadata
};

const Orders = async () => {
  const userOrderDetails = await FetchOrderDetails();

  return (
    <>
      <Breadcrumb pageName="Order Detials" />
      {userOrderDetails.success && userOrderDetails.data != undefined ? (
        <OrderTabs userOrderDetails={userOrderDetails.data} />
      ) : (
        <ErrorPage message={userOrderDetails.error} />
      )}
    </>
  );
};

export default Orders;

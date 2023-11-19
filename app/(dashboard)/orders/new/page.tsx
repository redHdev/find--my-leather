import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ErrorPage from "@/components/ErrorPage/ErrorPage";
import AddNewOrderForm from "@/components/Form/AddNewOrder";
import { FetchCustomerList } from "@/serverAction/FetchCustomerList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add New Order - Find My Leather",
  description: "India's first global leather sourcing and procurement platform",
  // other metadata
};

const AddNewOrder = async () => {
  const res = await FetchCustomerList();

  return (
    <>
      <Breadcrumb pageName="Add New Order" />
      {res.success && res.data && res.data.sellerId ? (
        <AddNewOrderForm
          customerList={res.data.customerList}
          sellerId={res.data.sellerId}
        />
      ) : (
        <ErrorPage message={res.error} />
      )}
    </>
  );
};

export default AddNewOrder;

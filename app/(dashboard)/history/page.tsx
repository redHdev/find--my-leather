import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ErrorPage from "@/components/ErrorPage/ErrorPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order History - Find My Leather",
  description: "India's first global leather sourcing and procurement platform",
  // other metadata
};

const History = async () => {
  return (
    <>
      <Breadcrumb pageName="Order History" />
      <ErrorPage message="This page is under construction. Please check back later." />
    </>
  );
};

export default History;

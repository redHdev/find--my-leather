import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ErrorPage from "@/components/ErrorPage/ErrorPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Documents - Find My Leather",
  description: "India's first global leather sourcing and procurement platform",
  // other metadata
};

const Documents = async () => {
  return (
    <>
      <Breadcrumb pageName="Order Documents" />
      <ErrorPage message="This page is under construction. Please check back later." />
    </>
  );
};

export default Documents;

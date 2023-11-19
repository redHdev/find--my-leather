import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ErrorPage from "@/components/ErrorPage/ErrorPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Production Tracking - Find My Leather",
  description: "India's first global leather sourcing and procurement platform",
  // other metadata
};

const Track = async () => {
  return (
    <>
      <Breadcrumb pageName="Production Tracking" />
      <ErrorPage message="This page is under construction. Please check back later." />
    </>
  );
};

export default Track;

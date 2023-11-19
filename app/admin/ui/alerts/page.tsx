import AlertPage from "@/components/Alert/AlertPage";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Alerts Page",
  description: "This is Alerts page for FindMyLeather",
  // other metadata
};

const Alerts = () => {
  return (
    <>
      <Breadcrumb pageName="Alerts" />
      <AlertPage />
    </>
  );
};

export default Alerts;

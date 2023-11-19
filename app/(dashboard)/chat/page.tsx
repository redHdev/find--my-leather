import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ErrorPage from "@/components/ErrorPage/ErrorPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat - Find My Leather",
  description: "India's first global leather sourcing and procurement platform",
  // other metadata
};

const Chat = async () => {
  return (
    <>
      <Breadcrumb pageName="Chat" />
      <ErrorPage message="This page is under construction. Please check back later." />
    </>
  );
};

export default Chat;

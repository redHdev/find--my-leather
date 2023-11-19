import Demo from "@/components/Dashboard/Demo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find My Leather",
  description: "India's first global leather sourcing and procurement platform",
  // other metadata
};

export default function Home() {
  return (
    <>
      <Demo />
    </>
  );
}

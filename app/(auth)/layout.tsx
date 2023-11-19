"use client";
import "@/app/globals.css";
import "@/app/data-tables-css.css";
import "@/app/satoshi.css";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader/Loader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <section>
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        {loading ? (
          <Loader />
        ) : (
          <div className="flex h-screen overflow-hidden">
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              <main>
                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                  {children}
                </div>
              </main>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/">
          <Image
            width={250}
            height={100}
            priority={true}
            src={"/images/findmyleather/FindMyLeather-Black-Trans-bg.png"}
            alt="Logo"
          />
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Dashboard --> */}
              <li>
                <Link
                  href="/"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    (pathname === "/" || pathname.includes("dashboard")) &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z"
                      fill=""
                    />
                    <path
                      d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z"
                      fill=""
                    />
                    <path
                      d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z"
                      fill=""
                    />
                    <path
                      d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z"
                      fill=""
                    />
                  </svg>
                  Dashboard
                </Link>
              </li>

              {/* <!-- Menu Item Dashboard --> */}

              {/* <!-- Menu Item RFQ --> */}
              <li>
                <Link
                  href="/rfq"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("rfq") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    className="text-current"
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 8V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 7.828 1h8.239A.969.969 0 0 1 17 2v16a.969.969 0 0 1-.933 1H3.933A.97.97 0 0 1 3 18v-2M8 1v4a1 1 0 0 1-1 1H3m-2 6h10M9.061 9.232 11.828 12l-2.767 2.768"
                    />
                  </svg>
                  RFQ
                </Link>
              </li>
              {/* <!-- Menu Item RFQ --> */}

              {/* <!-- Menu Item Order Details --> */}
              <li>
                <Link
                  href="/orders"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("orders") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm1-4H5m0 0L3 4m0 0h5.501M3 4l-.792-3H1m11 3h6m-3 3V1"
                    />
                  </svg>
                  Order Details
                </Link>
              </li>
              {/* <!-- Menu Item Order Details --> */}

              {/* <!-- Menu Item Production Tracking --> */}
              <li>
                <Link
                  href="/track"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("track") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="23"
                    height="23"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    id="delivery"
                  >
                    <path d="M405.787 333.617c-36.042 0-65.362 29.32-65.362 65.362 0 36.042 29.32 65.362 65.362 65.362s65.362-29.32 65.362-65.362c0-36.042-29.32-65.362-65.362-65.362zm0 98.043c-18.023 0-32.681-14.657-32.681-32.681 0-18.023 14.657-32.681 32.681-32.681s32.681 14.657 32.681 32.681c0 18.023-14.657 32.681-32.681 32.681zM111.66 333.617c-36.042 0-65.362 29.32-65.362 65.362 0 36.042 29.32 65.362 65.362 65.362 36.042 0 65.362-29.32 65.362-65.362-.001-36.042-29.321-65.362-65.362-65.362zm0 98.043c-18.023 0-32.681-14.657-32.681-32.681 0-18.023 14.657-32.681 32.681-32.681s32.681 14.657 32.681 32.681c-.001 18.023-14.658 32.681-32.681 32.681z"></path>
                    <path d="m509.189 252.558-46.843-69.174a16.345 16.345 0 0 0-13.53-7.179H319.728v32.681h120.423l39.168 57.845v115.908h-24.511v32.681h40.851c9.025 0 16.34-7.315 16.34-16.34V261.72a16.32 16.32 0 0 0-2.81-9.162zM160.681 382.638h194.451v32.681H160.681z"></path>
                    <path d="M319.728 130.451h-53.379v32.681h37.038v235.847h32.681V146.791c0-9.025-7.315-16.34-16.34-16.34zM73.532 163.132v-32.681H16.34c-9.025 0-16.34 7.315-16.34 16.34v252.187c0 9.025 7.315 16.34 16.34 16.34h46.298v-32.681H32.681V163.132h40.851zm385.732 106.599-23.961-37.038a16.338 16.338 0 0 0-13.72-7.468h-49.021c-9.025 0-16.34 7.315-16.34 16.34v62.638c0 9.025 7.315 16.34 16.34 16.34h72.987c9.025 0 16.34-7.315 16.335-16.34V278.61c0-3.149-.91-6.237-2.62-8.879zm-30.055 18.133h-40.306v-29.952H412.7l16.509 25.524v4.428z"></path>
                    <path d="M169.94 47.66c-62.469 0-113.294 50.824-113.294 113.294S107.47 274.248 169.94 274.248s113.294-50.824 113.294-113.294S232.41 47.66 169.94 47.66zm0 193.906c-44.451 0-80.613-36.161-80.613-80.613S125.489 80.34 169.94 80.34s80.613 36.161 80.613 80.613-36.161 80.613-80.613 80.613z"></path>
                    <path d="m202.191 170.098-15.91-15.916v-35.17c0-9.025-7.315-16.34-16.34-16.34s-16.34 7.315-16.34 16.34v41.94c0 4.33 1.716 8.486 4.782 11.553l20.698 20.698c3.192 3.192 7.375 4.788 11.558 4.788s8.366-1.596 11.553-4.782c6.377-6.383 6.377-16.732-.001-23.111z"></path>
                  </svg>
                  Production Tracking
                </Link>
              </li>
              {/* <!-- Menu Item Production Tracking --> */}

              {/* <!-- Menu Item Documents --> */}
              <li>
                <Link
                  href="/documents"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("documents") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    className="text-current"
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M6 1v4a1 1 0 0 1-1 1H1m4 10v-2m3 2v-6m3 6v-4m4-10v16a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2Z"
                    />
                  </svg>
                  Order Documents
                </Link>
              </li>
              {/* <!-- Menu Item Documents --> */}

              {/* <!-- Menu Item Payment Details --> */}
              <li>
                <Link
                  href="/payment"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("payment") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="24"
                    height="24"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 256 256"
                    enableBackground="new 0 0 256 256"
                  >
                    <path d="M65.2,28.8C59,30.6,55.4,35,53.9,42.6c-0.5,2.5-0.8,4.7-0.7,4.8c0.1,0.1,43.1,8.7,95.5,19c63.6,12.5,95.3,18.5,95.5,18.2c0.2-0.3,0.7-2.8,1.2-5.6c0.7-4.1,0.8-5.5,0.3-7.5c-1.1-4.9-4.8-9.4-9.1-10.9C234.5,59.7,74.4,28.8,70,28.3C68.9,28.2,66.7,28.4,65.2,28.8z" />
                    <path d="M48.9,69.3c-0.8,3.2-4.7,24.7-4.6,24.9c0.1,0.1,31,0.1,68.8,0l68.6-0.1l-64.9-12.7c-35.7-7-65.5-12.8-66.2-13C49.4,68.2,49.1,68.3,48.9,69.3z" />
                    <path d="M205.3,100.3c1.5,1.4,3.4,3.9,4.3,5.5c3,5.6,3.1,6.4,3.1,43.8v34.1l2.2-0.4c5.4-0.9,10.4-4.7,12-9.3c0.9-2.3,13.6-68.6,13.3-68.9c-0.2-0.2-36.7-7.3-37.2-7.3C202.8,97.8,203.8,99,205.3,100.3z" />
                    <path d="M19.2,103.4c-3.4,1.3-6.9,4.9-8.2,8.3c-1,2.6-1,3.9-1,53.3c0,49.4,0,50.7,1,53.3c1.3,3.6,4.8,7.1,8.4,8.4c2.7,1,3.9,1,87.9,1c84.1,0,85.3,0,87.9-1c3.6-1.3,7.1-4.8,8.4-8.4c1-2.6,1-3.9,1-53.3c0-49.4,0-50.7-1-53.3c-1.3-3.6-4.8-7.1-8.4-8.4c-2.7-1-3.8-1-88.1-1C23.7,102.4,21.7,102.4,19.2,103.4z M193.9,110.6c0.8,0.6,1.9,1.7,2.4,2.4c1.1,1.4,1.1,1.7,1.1,51.9v50.5l-1.1,1.6c-0.6,0.9-1.8,2-2.5,2.5c-1.4,0.9-4,1-86.5,1H22.1l-2-1.6c-1.1-0.9-2.2-2.4-2.6-3.5c-0.5-1.5-0.6-12.5-0.5-51.4l0.1-49.5l1.4-1.8c2.8-3.7-5-3.4,89.3-3.3C192.4,109.6,192.5,109.6,193.9,110.6z" />
                    <path d="M137.7,126.7c-1.4,0.5-3.5,1.8-4.8,3c-6.4,5.8-6.4,15.7,0,21.5c7.3,6.5,18.4,4.4,22.7-4.3c1.6-3.1,1.8-7.9,0.5-11.5C153.8,128.2,145,124.2,137.7,126.7z" />
                    <path d="M159.9,126.3c0,0.3,0.3,0.7,0.7,1c0.4,0.3,1.4,2.2,2.4,4.2c1.6,3.5,1.7,4,1.7,8.9c0,5.7-0.8,8.5-3.5,12.4l-1.3,1.9l1.7,0.1c4.3,0.4,10.1-3.6,12.5-8.4c1.7-3.4,1.6-8.9-0.3-12.4c-1.7-3.4-5.3-6.5-8.5-7.5C162.5,125.8,159.9,125.6,159.9,126.3z" />
                    <path d="M61.8,171.5c-0.9,0.6-2.1,1.7-2.6,2.6c-2,3.3-0.8,7.8,2.6,9.9c1.6,1,2.6,1,18.7,1c16.1,0,17.2-0.1,18.7-1c4.8-2.9,4.8-9.6,0-12.5c-1.6-1-2.6-1-18.7-1C64.3,170.5,63.3,170.6,61.8,171.5z" />
                    <path d="M115.8,171.5c-4.9,2.6-4.9,10,0,12.6c1.6,0.9,3.1,1,18.7,1c18.7,0,18.8,0,21-3.1c2.4-3.4,1.1-8.8-2.6-10.7c-1.2-0.6-4.4-0.8-18.4-0.8C118.9,170.5,117.4,170.6,115.8,171.5z" />
                    <path d="M35.2,194.1c-4.8,2.9-4.8,9.6,0,12.5c1.6,1,2.6,1,18.7,1s17.2-0.1,18.7-1c4.8-2.9,4.8-9.6,0-12.5c-1.6-1-2.6-1-18.7-1S36.7,193.1,35.2,194.1z" />
                    <path d="M89.2,194c-4.9,2.6-4.9,10,0,12.6c1.6,0.9,3.1,1,18.7,1c14,0,17.2-0.1,18.4-0.8c5-2.6,5-10.4,0-13c-1.2-0.6-4.4-0.8-18.4-0.8C92.3,193.1,90.8,193.2,89.2,194z" />
                    <path d="M143.5,194.1c-4.8,2.9-4.8,9.6,0,12.5c1.6,1,2.6,1,18.2,1c15.2,0,16.7-0.1,18.3-1c4.9-2.6,4.9-10,0-12.6c-1.6-0.9-3.1-1-18.3-1C146.1,193.1,145.1,193.1,143.5,194.1z" />
                  </svg>
                  Payment Details
                </Link>
              </li>
              {/* <!-- Menu Item Payment Details --> */}

              {/* <!-- Menu Item Order History --> */}
              <li>
                <Link
                  href="/history"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("history") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 22"
                  >
                    <path d="m6.25,6c0-.414.336-.75.75-.75h8c.414,0,.75.336.75.75s-.336.75-.75.75H7c-.414,0-.75-.336-.75-.75Zm1.75,5.25h-1c-.414,0-.75.336-.75.75s.336.75.75.75h1c.414,0,.75-.336.75-.75s-.336-.75-.75-.75Zm-1-1.5h4c.414,0,.75-.336.75-.75s-.336-.75-.75-.75h-4c-.414,0-.75.336-.75.75s.336.75.75.75Zm9.955,5.5h-1.205v-1.285c0-.414-.336-.75-.75-.75s-.75.336-.75.75v2.035c0,.414.336.75.75.75h1.955c.414,0,.75-.336.75-.75s-.336-.75-.75-.75Zm3.795.75c0,3.17-2.579,5.75-5.75,5.75-1.199,0-2.313-.37-3.235-1h-5.765c-1.517,0-2.75-1.233-2.75-2.75V5c0-1.517,1.233-2.75,2.75-2.75h10c1.517,0,2.75,1.233,2.75,2.75v6.651c1.222,1.055,2,2.612,2,4.349Zm-14.75,3.25h4.261c-.637-.925-1.011-2.044-1.011-3.25,0-3.17,2.579-5.75,5.75-5.75.798,0,1.559.164,2.25.459v-5.709c0-.689-.561-1.25-1.25-1.25H6c-.689,0-1.25.561-1.25,1.25v13c0,.689.561,1.25,1.25,1.25Zm13.25-3.25c0-2.343-1.906-4.25-4.25-4.25s-4.25,1.907-4.25,4.25,1.906,4.25,4.25,4.25,4.25-1.907,4.25-4.25Z" />
                  </svg>
                  Order History
                </Link>
              </li>
              {/* <!-- Menu Item Order History --> */}
            </ul>
          </div>

          {/* <!-- Others Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              SUPPORT
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Chat --> */}
              <li>
                <Link
                  href="/chat"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("chat") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    className="text-current"
                    width="20"
                    height="18"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M16 5h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-2v3l-4-3H8m4-13H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h2v3l4-3h4a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                    />
                  </svg>
                  Chat With Us
                </Link>
              </li>
              {/* <!-- Menu Item Chat --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;

import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NextAuthProvider from "@/components/Context/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/NextAuthOption";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <NextAuthProvider session={session}>
          {children}
          <ToastContainer />
        </NextAuthProvider>
      </body>
    </html>
  );
}

import "./styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Lumilearn Courses",
  description: "Browse and enroll in courses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-[#F9FAFB] text-[#181A25] font-sans">
        <Toaster position="top-right" />
        <CartProvider>
          <Sidebar />
          <div className="md:ml-64">
            <Navbar />
            <main className="pt-16 p-4 md:p-6">{children}</main>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}

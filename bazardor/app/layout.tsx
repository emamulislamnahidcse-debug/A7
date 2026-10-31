import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body className="flex min-h-screen flex-col bg-[#f0f4ef] text-[#16221a]">
        <Navbar />
        <Ticker />
        <main className="flex-1 py-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Toast from "@/components/Toast";

export const metadata: Metadata = {
  title: "The Fun Food | Fast • Fresh • Fun",
  description: "Order delicious food online from The Fun Food. Fast delivery, fresh ingredients, and fun flavors!",
  keywords: "food delivery, online order, restaurant, fast food, The Fun Food",
  openGraph: {
    title: "The Fun Food | Fast • Fresh • Fun",
    description: "Order delicious food online from The Fun Food",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Toast />
      </body>
    </html>
  );
}


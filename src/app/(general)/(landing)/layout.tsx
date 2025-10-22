import { Footer } from "@/app/(general)/_components/Footer";
import { Navbar } from "@/app/(general)/_components/Navbar";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

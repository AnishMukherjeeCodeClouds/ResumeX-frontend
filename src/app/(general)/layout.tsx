import { Navbar } from "@/app/(general)/_components/Navbar";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-dvh">
      <Navbar />
      <div className="grow">{children}</div>
      {/*<Footer />*/}
    </div>
  );
}

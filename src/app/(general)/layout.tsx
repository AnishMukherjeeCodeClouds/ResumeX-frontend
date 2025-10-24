import { Footer } from "@/app/(general)/_components/Footer";
import { Navbar } from "@/app/(general)/_components/Navbar";
import { AuthContextProvider } from "@/app/(general)/_context/AuthContext";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthContextProvider>
      <div className="flex flex-col min-h-dvh">
        <Navbar />
        <div className="grow">{children}</div>
        <Footer />
      </div>
    </AuthContextProvider>
  );
}

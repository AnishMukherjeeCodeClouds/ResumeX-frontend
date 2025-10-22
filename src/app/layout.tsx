import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import "./globals.css";
import { Mulish } from "next/font/google";
import React from "react";

export const metadata: Metadata = {
  title: "ResumeX",
  description: "A friendly resume builder",
};

const mulish = Mulish({ weight: ["400"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${mulish.className}`}>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}

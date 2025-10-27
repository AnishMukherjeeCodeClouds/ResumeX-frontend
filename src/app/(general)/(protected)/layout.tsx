import { Protected } from "@/app/(general)/(protected)/_context/Protected";
import React from "react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Protected>{children}</Protected>;
}

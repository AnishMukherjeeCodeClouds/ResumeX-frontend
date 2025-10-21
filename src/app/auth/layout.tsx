import React from "react";
import "./authLayout.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div id="auth-layout" className="h-dvh w-dvw flex flex-col">
      {/*<Navbar />*/}
      <div className="flex justify-center items-center grow">
        {children}
        <div className="hidden lg:grow lg:block h-full bg-black/10 backdrop-blur-xs"></div>
      </div>
    </div>
  );
}

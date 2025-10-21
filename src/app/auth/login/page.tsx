import { LoginForm } from "@/app/auth/_components/LoginForm";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <div className="bg-white/40 backdrop-blur-sm shadow-lg rounded-md lg:h-full flex flex-col justify-center items-center lg:w-[42%] z-40 p-6 md:p-16">
      <Image
        className="relative z-40 justify-self-start invert md:hidden"
        src={"/logo.png"}
        height={250}
        width={250}
        alt={"Logo"}
      />
      <Image
        className="relative z-40 justify-self-start invert hidden md:block mb-4"
        src={"/logo.png"}
        height={360}
        width={360}
        alt={"Logo"}
      />
      <LoginForm />
    </div>
  );
}

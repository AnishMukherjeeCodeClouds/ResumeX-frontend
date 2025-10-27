import { LoginForm } from "@/app/auth/_components/LoginForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div className="bg-white/80 lg:bg-white/40 backdrop-blur-sm shadow-lg rounded-md lg:h-full flex flex-col justify-center items-center lg:w-[42%] z-40 p-6 md:p-16">
      <Link href="/">
        <Image
          className="relative z-40 invert md:hidden"
          src={"/logo.png"}
          height={250}
          width={250}
          alt={"Logo"}
        />
        <Image
          className="relative z-40 invert hidden md:block lg:hidden mb-8"
          src={"/logo.png"}
          height={360}
          width={360}
          alt={"Logo"}
        />
        <Image
          className="relative z-40 invert hidden lg:block mb-8 mr-28"
          src={"/logo.png"}
          height={360}
          width={360}
          alt={"Logo"}
        />
      </Link>
      <LoginForm />
    </div>
  );
}

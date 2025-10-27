"use client";

import { useAuth } from "@/app/(general)/(protected)/_context/AuthContext";
import SheetWithNavigationMenu from "@/app/(general)/_components/NavSidebar";
import { Button } from "@/components/ui/button";
import {
  HomeIcon,
  KeyRoundIcon,
  LayoutDashboardIcon,
  LogInIcon,
  LogOutIcon,
  SquarePlusIcon,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export function Navbar() {
  const { user, isAuthenticated, updateAuthState } = useAuth();

  useEffect(() => {
    if (isAuthenticated) updateAuthState();
  }, [isAuthenticated]);

  return (
    <nav className="bg-white/70 backdrop-blur-lg p-5 md:px-8 lg:px-20 flex items-center justify-between sticky top-0 shadow z-30">
      <Link href="/">
        <Image
          src={"/logo.png"}
          height={30}
          width={180}
          alt={"Logo"}
          className="invert md:w-58"
        />
      </Link>

      <div className="md:hidden">
        <SheetWithNavigationMenu
          navigationMenu={[
            ...(isAuthenticated
              ? [
                  <div className="flex gap-3 items-center">
                    <UserIcon className="size-7 p-2 rounded-full box-content bg-[#27407e] text-white" />
                    <p className="text-xl">{user?.name}</p>
                  </div>,
                ]
              : []),
            <Link href="/" className="flex gap-3 items-center">
              <HomeIcon className="size-5 shrink-0" />
              <p>Home</p>
            </Link>,
            ...(isAuthenticated
              ? [
                  <Link href="/dashboard" className="flex gap-3 items-center">
                    <LayoutDashboardIcon className="size-5 shrink-0" />
                    <p>Dashboard</p>
                  </Link>,
                  <Link href="/dashboard" className="flex gap-3 items-center">
                    <SquarePlusIcon className="size-5 shrink-0" />
                    <p>Create resume</p>
                  </Link>,
                ]
              : [
                  <Link href="/auth/signup" className="flex gap-3 items-center">
                    <KeyRoundIcon className="size-5 shrink-0" />
                    <p>Sign up</p>
                  </Link>,
                  <Link href="/auth/login" className="flex gap-3 items-center">
                    <LogInIcon className="size-5 shrink-0" />
                    <p>Log in</p>
                  </Link>,
                ]),
          ]}
        />
      </div>
      <div className="hidden md:flex gap-3 lg:gap-5">
        {!isAuthenticated ? (
          <>
            <Link
              href="/auth/signup"
              className="flex items-center gap-1.5 lg:gap-2"
            >
              <KeyRoundIcon className="size-7 lg:size-8 shrink-0" />
              <p className="text-lg lg:text-xl">Sign up</p>
            </Link>
            <Link
              href="/auth/login"
              className="flex items-center gap-1.5 lg:gap-2"
            >
              <LogInIcon className="size-7 lg:size-8 shrink-0" />
              <p className="text-lg lg:text-xl">Log in</p>
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-3 lg:gap-5">
            <Button variant="ghost">
              <LogOutIcon className="size-7 lg:size-8 shrink-0" />
              <p className="text-lg lg:text-xl">Log out</p>
            </Button>
            <div className="flex gap-3 items-center">
              <UserIcon className="size-7 p-2 rounded-full box-content bg-[#27407e] text-white" />
              <p className="text-lg lg:text-xl">{user?.name}</p>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

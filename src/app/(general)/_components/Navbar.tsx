import SheetWithNavigationMenu, {
  NavigationItem,
} from "@/components/shadcn-studio/sheet/sheet-06";
import {
  HomeIcon,
  KeyRoundIcon,
  LayoutDashboardIcon,
  LogInIcon,
  SquarePlusIcon,
} from "lucide-react";
import Image from "next/image";

const navigationMenu: NavigationItem[] = [
  {
    name: "Home",
    icon: HomeIcon,
  },
  {
    name: "Sign up",
    icon: KeyRoundIcon,
  },
  {
    name: "Log in",
    icon: LogInIcon,
  },
  {
    name: "Dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    name: "Create resume",
    icon: SquarePlusIcon,
  },
];

export function Navbar() {
  return (
    <nav className="bg-white/70 backdrop-blur-lg p-5 md:px-8 lg:px-20 flex items-center justify-between sticky top-0 shadow z-30">
      <Image
        src={"/logo.png"}
        height={30}
        width={180}
        alt={"Logo"}
        className="invert md:w-58"
      />
      <div className="md:hidden">
        <SheetWithNavigationMenu navigationMenu={navigationMenu} />
      </div>
      <div className="hidden md:flex gap-3 lg:gap-5">
        <div className="flex items-center gap-1.5 lg:gap-2">
          <KeyRoundIcon className="size-7 lg:size-8 shrink-0" />
          <p className="text-lg lg:text-xl">Sign up</p>
        </div>
        <div className="flex items-center gap-1.5 lg:gap-2">
          <LogInIcon className="size-7 lg:size-8 shrink-0" />
          <p className="text-lg lg:text-xl">Log in</p>
        </div>
      </div>
    </nav>
  );
}

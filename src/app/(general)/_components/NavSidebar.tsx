import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { TextAlignJustifyIcon } from "lucide-react";
import type { ReactNode } from "react";

const NavigationMenu = ({ item }: { item: ReactNode }) => {
  return (
    <div
      className="focus-visible:ring-ring/50 flex items-center gap-3 rounded-md p-1 outline-none focus-visible:ring-[3px]"
      style={{ paddingLeft: `0.25rem` }}
    >
      {item}
    </div>
  );
};

const SheetWithNavigationMenu = ({
  navigationMenu,
}: {
  navigationMenu: ReactNode[];
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <TextAlignJustifyIcon />
      </SheetTrigger>
      <SheetContent side="right" className="w-75 md:w-96">
        <SheetHeader>
          <SheetTitle></SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 p-4 md:pl-8">
          {navigationMenu.map((item, i) => (
            <SheetClose key={i}>
              <NavigationMenu item={item} />
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SheetWithNavigationMenu;

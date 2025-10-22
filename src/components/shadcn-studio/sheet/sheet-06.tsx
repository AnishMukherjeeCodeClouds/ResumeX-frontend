import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  CircleSmallIcon,
  type LucideProps,
  TextAlignJustifyIcon,
} from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

export type NavigationItem = {
  name: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  action?: () => void;
};

const NavigationMenu = ({
  item,
  level,
}: {
  level: number;
  item: NavigationItem;
}) => {
  // if (item.type === "page") {
  return (
    <div
      className="focus-visible:ring-ring/50 flex items-center gap-3 rounded-md p-1 outline-none focus-visible:ring-[3px]"
      style={{ paddingLeft: `${level === 0 ? 0.25 : 1.75}rem` }}
    >
      {level === 0 ? (
        <item.icon className="size-6 shrink-0" />
      ) : (
        <CircleSmallIcon className="size-4 shrink-0" />
      )}
      <span className="text-lg">{item.name}</span>
    </div>
  );
  // }
  //
  // return (
  //   <Collapsible
  //     className="flex flex-col gap-1.5"
  //     style={{ paddingLeft: `${level === 0 ? 0 : 1.5}rem` }}
  //   >
  //     <CollapsibleTrigger className="focus-visible:ring-ring/50 flex items-center gap-2 rounded-md p-1 outline-none focus-visible:ring-[3px]">
  //       {level === 0 ? (
  //         <item.icon className="size-4 shrink-0" />
  //       ) : (
  //         <CircleSmallIcon className="size-4 shrink-0" />
  //       )}
  //       <span className="flex-1 text-start text-sm">{item.name}</span>
  //       <ChevronRightIcon className='size-4 shrink-0 transition-transform [[data-state="open"]>&]:rotate-90' />
  //     </CollapsibleTrigger>
  //     <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down flex flex-col gap-1.5 overflow-hidden transition-all duration-300">
  //       {item.children.map((item) => (
  //         <NavigationMenu key={item.name} item={item} level={level + 1} />
  //       ))}
  //     </CollapsibleContent>
  //   </Collapsible>
  // );
};

const SheetWithNavigationMenu = ({
  navigationMenu,
}: {
  navigationMenu: NavigationItem[];
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
          {navigationMenu.map((item) => (
            <NavigationMenu key={item.name} item={item} level={0} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SheetWithNavigationMenu;

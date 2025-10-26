import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ReactNode, useId } from "react";

const members = [
  {
    image: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png",
    fallback: "HL",
    name: "Howard Lloyd",
    designation: "Product Manager",
  },
  {
    image: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png",
    fallback: "OS",
    name: "Olivia Sparks",
    designation: "Software Engineer",
  },
  {
    image: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png",
    fallback: "HR",
    name: "Hallie Richards",
    designation: "UI/UX Designer",
  },
];

export function PopoverSlideInBottom({
  trigger,
  children,
}: Record<"trigger" | "children", ReactNode>) {
  const id = useId();

  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className="data-[state=open]:slide-in-from-top-50 data-[state=closed]:slide-out-to-top-50 data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100 size-fit duration-400">
        {children}
      </PopoverContent>
    </Popover>
  );
}

export default PopoverSlideInBottom;

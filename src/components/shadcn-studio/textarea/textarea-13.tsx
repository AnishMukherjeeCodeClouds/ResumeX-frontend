import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ComponentProps, useId } from "react";

export function TextareaWithOverlappingLabel({
  label,
  className,
  labelClassName,
  ...props
}: {
  label: string;
  labelClassName?: string;
} & ComponentProps<"textarea">) {
  const id = useId();

  return (
    <div className="relative w-full">
      <Textarea
        {...props}
        id={id}
        className={cn(className, "!bg-background peer")}
      />
      <Label
        htmlFor={id}
        className={cn(
          labelClassName,
          "bg-background text-foreground absolute top-0 left-2 z-10 block -translate-y-1/2 px-1 text-xs font-medium group-has-disabled:opacity-50 peer-aria-invalid:text-destructive",
        )}
      >
        {label}
      </Label>
    </div>
  );
}

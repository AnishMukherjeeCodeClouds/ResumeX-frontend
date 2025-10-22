import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useId } from "react";

const InputOverlappingLabel = ({
  label,
  className,
  labelClassName,
  ...props
}: {
  label: string;
  labelClassName?: string;
} & React.ComponentProps<"input">) => {
  const id = useId();

  return (
    <div className="group relative w-full">
      <Input
        {...props}
        id={id}
        className={cn("dark:bg-background h-10 peer", className)}
      />
      <Label
        htmlFor={id}
        className={cn(
          labelClassName,
          "bg-background text-foreground absolute top-0 left-2 z-1 block -translate-y-1/2 px-1 text-xs peer-aria-invalid:text-destructive",
        )}
      >
        {label}
      </Label>
    </div>
  );
};

export default InputOverlappingLabel;

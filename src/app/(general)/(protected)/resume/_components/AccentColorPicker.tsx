import { ResumeSchemaType } from "@/app/(general)/(protected)/resume/resume-schema";
import PopoverSlideInBottom from "@/components/shadcn-studio/popover/popover-14";
import { Button } from "@/components/ui/button";
import { Chrome, ChromeInputType } from "@uiw/react-color";
import { useFormContext, useWatch } from "react-hook-form";

export function AccentColorPicker() {
  const { control, setValue } = useFormContext<ResumeSchemaType>();
  const { accentColor } = useWatch({
    control,
  });

  return (
    <>
      <PopoverSlideInBottom
        trigger={
          <Button variant="secondary" className="rounded-full cursor-pointer">
            <p className="md:text-lg">Accent</p>
            <p
              className="size-7 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
          </Button>
        }
      >
        <Chrome
          inputType={ChromeInputType.HEXA}
          showAlpha={false}
          color={accentColor ?? "#000"}
          onChange={(color) => setValue("accentColor", color.hex)}
          showTriangle={false}
        />
      </PopoverSlideInBottom>
    </>
  );
}

import { templates } from "@/app/(general)/(protected)/resume/_templates/template-source";
import { TEMPLATE_PREVIEW_DATA } from "@/app/(general)/(protected)/resume/data";
import { ResumeSchemaType } from "@/app/(general)/(protected)/resume/resume-schema";
import PopoverSlideInBottom from "@/components/shadcn-studio/popover/popover-14";
import { Button } from "@/components/ui/button";
import { LayoutTemplateIcon } from "lucide-react";
import { Fragment } from "react";
import { useFormContext, useWatch } from "react-hook-form";

export function TemplateSwitcher() {
  const { setValue, control } = useFormContext<ResumeSchemaType>();
  const { template, accentColor } = useWatch({ control });

  return (
    <PopoverSlideInBottom
      trigger={
        <Button variant="secondary" className="rounded-full cursor-pointer">
          <LayoutTemplateIcon />
          <p className="md:text-lg">{template}</p>
        </Button>
      }
    >
      <div className="[&_*]:transition-all [&_*]:duration-300 flex flex-col max-md:gap-3 md:grid md:grid-cols-2">
        {(
          Object.entries(templates) as [
            keyof typeof templates,
            (typeof templates)[keyof typeof templates],
          ][]
        ).map(([name, Template]) => (
          <Fragment key={name}>
            <div
              onClick={() => setValue("template", name)}
              className="md:hidden"
            >
              {name}
            </div>
            <div
              onClick={() => setValue("template", name)}
              className="hidden md:block cursor-pointer hover:bg-gray-200 group p-3 rounded-md"
            >
              <div className="w-[180px] h-[255px] overflow-hidden relative border rounded-md shadow-sm bg-gray-50 pointer-events-none">
                <div
                  className="origin-top-left absolute top-0 left-0 group-hover:scale-105"
                  style={{
                    transform: "scale(0.25)",
                    transformOrigin: "top left",
                    width: "210mm",
                    height: "297mm",
                  }}
                >
                  <Template
                    data={TEMPLATE_PREVIEW_DATA}
                    accentColor={accentColor ?? "#000"}
                  />
                </div>
              </div>
              <p className="text-center mt-2 lg:text-lg font-semibold">
                {name}
              </p>
            </div>
          </Fragment>
        ))}
      </div>
    </PopoverSlideInBottom>
  );
}

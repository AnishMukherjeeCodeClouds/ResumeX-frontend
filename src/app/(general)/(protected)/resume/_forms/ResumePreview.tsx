import { AccentColorPicker } from "@/app/(general)/(protected)/resume/_components/AccentColorPicker";
import { ResumeSave } from "@/app/(general)/(protected)/resume/_components/ResumeSave";
import { TemplateSwitcher } from "@/app/(general)/(protected)/resume/_components/TemplateSwitcher";
import { templates } from "@/app/(general)/(protected)/resume/_templates/template-source";
import { ResumeSchemaType } from "@/app/(general)/(protected)/resume/resume-schema";
import { useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";

export function ResumePreview() {
  const { control } = useFormContext<ResumeSchemaType>();
  const { accentColor, template, ...data } = useWatch({ control });
  const resumeTemplateRef = useRef<HTMLDivElement | null>(null);

  const K = templates[template ?? "Classic"];

  return (
    <div className=" bg-gray-300 relative">
      <div className="flex items-center sticky top-0 bg-gray-300 lg:w-[213mm] mx-auto py-3 pl-[1.5mm] gap-2">
        <AccentColorPicker />
        <ResumeSave resumeRef={resumeTemplateRef} />
        <TemplateSwitcher />
      </div>
      <K
        ref={resumeTemplateRef}
        data={data as ResumeSchemaType}
        accentColor={accentColor ?? "#27407e"}
      />
    </div>
  );
}

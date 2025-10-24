import { ModernTemplateReact } from "@/app/(general)/(protected)/resume/_templates/react/ModernTemplate";
import { ResumeDataType } from "@/app/(general)/(protected)/resume/_templates/resume-data-type";
import { ResumeSchemaType } from "@/app/(general)/(protected)/resume/resume-schema";
import { useFormContext, useWatch } from "react-hook-form";

export function ResumePreview() {
  const { control } = useFormContext<ResumeSchemaType>();
  const data = useWatch({ control });

  return (
    <div className="py-20">
      <ModernTemplateReact
        data={data as ResumeSchemaType}
        accentColor={"#060"}
      />
    </div>
  );
}

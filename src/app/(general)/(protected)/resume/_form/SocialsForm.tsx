import { ResumeSchemaType } from "@/app/(general)/(protected)/resume/resume-schema";
import { FormInput } from "@/components/form/FormInput";
import { FieldGroup } from "@/components/ui/field";
import { useFormContext } from "react-hook-form";

export function SocialsForm() {
  const { control } = useFormContext<ResumeSchemaType>();
  return (
    <div>
      <p className="text-2xl mb-5">Socials</p>
      <FieldGroup>
        <FormInput
          control={control}
          label={"LinkedIN URL"}
          name={"socials.linkedIn"}
        />
        <FormInput control={control} label={"X URL"} name={"socials.X"} />
        <FormInput
          control={control}
          label={"GitHub URL"}
          name={"socials.github"}
        />
        <FormInput
          control={control}
          label={"Portfolio Website URL"}
          name={"socials.portfolio"}
        />
      </FieldGroup>
    </div>
  );
}

import { useHookFormError } from "@/app/(general)/(protected)/resume/hooks";
import { ResumeSchemaType } from "@/app/(general)/(protected)/resume/resume-schema";
import { FormInput } from "@/components/form/FormInput";
import { FieldGroup } from "@/components/ui/field";
import { useFormContext } from "react-hook-form";

export function SocialsForm() {
  const { control } = useFormContext<ResumeSchemaType>();

  useHookFormError("socials");

  return (
    <div>
      <p className="text-2xl mb-5">Socials</p>
      <FieldGroup>
        <FormInput
          control={control}
          label={"LinkedIN URL"}
          name={"socials.linkedIn"}
          placeholder="E.g. https://linkedin.com/in/your-username"
        />
        <FormInput
          control={control}
          label={"GitHub URL"}
          name={"socials.github"}
          placeholder="E.g. https://github.com/your-username"
        />
        <FormInput
          control={control}
          label={"Portfolio Website URL"}
          name={"socials.portfolio"}
          placeholder="E.g. https://your-portfolio-url"
        />
      </FieldGroup>
    </div>
  );
}

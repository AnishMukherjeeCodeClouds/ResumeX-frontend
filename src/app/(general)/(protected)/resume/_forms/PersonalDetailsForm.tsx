import { useHookFormError } from "@/app/(general)/(protected)/resume/hooks";
import { ResumeSchemaType } from "@/app/(general)/(protected)/resume/resume-schema";
import { FormInput } from "@/components/form/FormInput";
import { FormTextarea } from "@/components/form/FormTextarea";
import { FieldGroup } from "@/components/ui/field";
import { useFormContext } from "react-hook-form";

export function PersonalDetailsForm() {
  const { control, setValue } = useFormContext<ResumeSchemaType>();

  useHookFormError("personalDetails");

  return (
    <div>
      <p className="text-2xl mb-5">Personal Details</p>
      <FieldGroup>
        <FormInput
          onChange={(e) => {
            const value = e.target.value.replace(/\s+/g, " ").trimStart();
            setValue("personalDetails.fullName", value, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
          control={control}
          label={"Full Name"}
          name={"personalDetails.fullName"}
        />
        <FormInput
          control={control}
          label={"Designation"}
          name={"personalDetails.designation"}
        />
        <FormInput
          control={control}
          label={"Email Address"}
          name={"personalDetails.email"}
        />
        <FormInput
          control={control}
          label={"Phone"}
          name={"personalDetails.phone"}
        />
        <FormInput
          control={control}
          label={"Location"}
          name={"personalDetails.location"}
        />
        <FormTextarea
          className="w-full"
          control={control}
          label={"Summary"}
          name={"summary"}
        />
      </FieldGroup>
    </div>
  );
}

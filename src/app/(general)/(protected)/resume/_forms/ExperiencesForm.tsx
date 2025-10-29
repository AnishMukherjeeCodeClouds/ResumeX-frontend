import { useHookFormError } from "@/app/(general)/(protected)/resume/hooks";
import {
  MAX_EXPERIENCES,
  ResumeSchemaType,
} from "@/app/(general)/(protected)/resume/resume-schema";
import { FormInput } from "@/components/form/FormInput";
import { FormTextarea } from "@/components/form/FormTextarea";
import { Button } from "@/components/ui/button";
import { FieldDescription, FieldGroup, FieldSet } from "@/components/ui/field";
import { PlusIcon, XIcon } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

export function ExperiencesForm() {
  const { control } = useFormContext<ResumeSchemaType>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  useHookFormError("experiences");

  return (
    <div>
      <p className="text-2xl mb-5">Experiences</p>
      <FieldSet>
        <div className="flex justify-between items-center">
          <FieldDescription className="text-lg">
            Add up to {MAX_EXPERIENCES} experiences
          </FieldDescription>
          <Button
            variant="outline"
            type="button"
            disabled={fields.length >= MAX_EXPERIENCES}
            onClick={() =>
              append({
                organization: "",
                position: "",
                description: "",
                startDate: "",
                endDate: "",
              })
            }
          >
            <PlusIcon />
          </Button>
        </div>
        <FieldGroup className="">
          {fields.map((field, index) => (
            <div className="flex flex-col gap-4" key={field.id}>
              <div className="flex justify-between items-center">
                <p className="text-lg mb-4">Experience {index + 1}</p>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => remove(index)}
                >
                  <XIcon />
                </Button>
              </div>
              <div className="flex flex-col gap-7">
                <FormInput
                  control={control}
                  label={"Organization Name"}
                  name={`experiences.${index}.organization`}
                />
                <FormInput
                  control={control}
                  label={"Position"}
                  name={`experiences.${index}.position`}
                />
                <FormTextarea
                  control={control}
                  label={"Description"}
                  name={`experiences.${index}.description`}
                />
                <div className="grid grid-cols-2 gap-7">
                  <FormInput
                    type="date"
                    control={control}
                    label={"Start Date"}
                    name={`experiences.${index}.startDate`}
                  />
                  <FormInput
                    type="date"
                    control={control}
                    label={"End Date"}
                    name={`experiences.${index}.endDate`}
                  />
                </div>
              </div>
            </div>
          ))}
        </FieldGroup>
      </FieldSet>
    </div>
  );
}

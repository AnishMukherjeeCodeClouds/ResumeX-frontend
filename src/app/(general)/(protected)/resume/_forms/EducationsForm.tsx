import { useHookFormError } from "@/app/(general)/(protected)/resume/hooks";
import {
  MAX_EDUCATIONS,
  ResumeSchemaType,
} from "@/app/(general)/(protected)/resume/resume-schema";
import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { FieldDescription, FieldGroup, FieldSet } from "@/components/ui/field";
import { PlusIcon, XIcon } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

export function EducationsForm() {
  const { control } = useFormContext<ResumeSchemaType>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "educations",
  });

  useHookFormError("educations");

  return (
    <div>
      <p className="text-2xl mb-5">Educations</p>
      <FieldSet>
        <div className="flex justify-between items-center">
          <FieldDescription className="text-lg">
            Add up to {MAX_EDUCATIONS} educations
          </FieldDescription>
          <Button
            variant="outline"
            type="button"
            disabled={fields.length >= 2} // Max educations limit is 2
            onClick={() =>
              append({
                institution: "",
                degree: "",
                field: "",
                startDate: "",
                endDate: "",
                grade: "0",
              })
            }
          >
            <PlusIcon />
          </Button>
        </div>
        <FieldGroup>
          {fields?.map((education, index) => (
            <div className="flex flex-col gap-4" key={education.id}>
              <div className="flex justify-between items-center">
                <p className="text-lg mb-4">Education {index + 1}</p>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => remove(index)}
                >
                  <XIcon />
                </Button>
              </div>
              <div className="flex flex-col gap-7">
                {/* Institution */}
                <FormInput
                  control={control}
                  label="Institution"
                  name={`educations.${index}.institution`}
                />

                {/* Degree */}
                <FormInput
                  control={control}
                  label="Degree"
                  name={`educations.${index}.degree`}
                />

                {/* Field of Study */}
                <FormInput
                  control={control}
                  label="Field of Study"
                  name={`educations.${index}.field`}
                />

                {/* Education Description */}
                {/*<FormTextarea*/}
                {/*  control={control}*/}
                {/*  label="Description"*/}
                {/*  name={`educations.${index}.description`}*/}
                {/*/>*/}

                {/* Date Fields */}
                <div className="grid grid-cols-2 gap-7">
                  <FormInput
                    type="date"
                    control={control}
                    label={"Start Date"}
                    name={`educations.${index}.startDate`}
                  />
                  <FormInput
                    type="date"
                    control={control}
                    label={"End Date"}
                    name={`educations.${index}.endDate`}
                  />
                </div>

                {/* Grade */}
                <FormInput
                  control={control}
                  label="Grade"
                  name={`educations.${index}.grade`}
                  type="number"
                />
              </div>
            </div>
          ))}
        </FieldGroup>
      </FieldSet>
    </div>
  );
}

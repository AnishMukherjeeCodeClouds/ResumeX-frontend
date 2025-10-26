import { useHookFormError } from "@/app/(general)/(protected)/resume/hooks";
import {
  MAX_CERTIFICATIONS,
  ResumeSchemaType,
} from "@/app/(general)/(protected)/resume/resume-schema";
import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { FieldDescription, FieldGroup, FieldSet } from "@/components/ui/field";
import { PlusIcon, XIcon } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

export function CertificationsForm() {
  const { control } = useFormContext<ResumeSchemaType>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "certifications",
  });

  useHookFormError("certifications");

  return (
    <div>
      <p className="text-2xl mb-5">Certifications</p>
      <FieldSet>
        <div className="flex justify-between items-center">
          <FieldDescription className="text-lg">
            Add up to {MAX_CERTIFICATIONS} certifications
          </FieldDescription>
          <Button
            variant="outline"
            type="button"
            disabled={fields.length >= MAX_CERTIFICATIONS}
            onClick={() =>
              append({
                title: "",
                issuer: "",
                date: "",
                url: "",
              })
            }
          >
            <PlusIcon />
          </Button>
        </div>

        <FieldGroup>
          {fields?.map((cert, index) => (
            <div className="flex flex-col gap-4" key={cert.id}>
              <div className="flex justify-between items-center">
                <p className="text-lg mb-4">Certification {index + 1}</p>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => remove(index)}
                >
                  <XIcon />
                </Button>
              </div>

              <div className="flex flex-col gap-7">
                {/* Title */}
                <FormInput
                  control={control}
                  label="Title"
                  name={`certifications.${index}.title`}
                />

                {/* Issuer */}
                <FormInput
                  control={control}
                  label="Issuer"
                  name={`certifications.${index}.issuer`}
                />

                {/* Date */}
                <FormInput
                  className="md:!pt-3 md:!pb-9"
                  type="date"
                  control={control}
                  label="Date"
                  name={`certifications.${index}.date`}
                />

                {/* URL */}
                <FormInput
                  control={control}
                  label="URL"
                  name={`certifications.${index}.url`}
                  type="url"
                />
              </div>
            </div>
          ))}
        </FieldGroup>
      </FieldSet>
    </div>
  );
}

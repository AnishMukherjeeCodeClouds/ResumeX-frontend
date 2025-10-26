import { useHookFormError } from "@/app/(general)/(protected)/resume/hooks";
import {
  MAX_LANGUAGES,
  ResumeSchemaType,
} from "@/app/(general)/(protected)/resume/resume-schema";
import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { FieldDescription, FieldGroup } from "@/components/ui/field";
import { PlusIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

export function LanguagesForm() {
  const { setValue, getValues } = useFormContext<ResumeSchemaType>();
  const [_, setRandom] = useState(0);
  const languageRef = useRef<HTMLInputElement | null>(null);

  useHookFormError("languages");

  return (
    <div>
      <p className="text-2xl mb-5">Languages</p>
      <FieldGroup>
        {getValues().languages.length < MAX_LANGUAGES && (
          <>
            <FieldDescription className="text-lg">
              Add up to {MAX_LANGUAGES} languages
            </FieldDescription>

            {/* Add a language */}
            <div className="flex items-center gap-2">
              <FormInput ref={languageRef} name={""} label="Add Language" />
              <Button
                variant="outline"
                type="button"
                disabled={getValues().languages.length >= MAX_LANGUAGES}
                onClick={() => {
                  const newLanguage = languageRef.current?.value;
                  if (newLanguage) {
                    const newLanguages = [
                      ...(getValues().languages ?? []),
                      newLanguage,
                    ];
                    setValue("languages", newLanguages);
                    setRandom(Math.random());
                  }
                  if (languageRef.current) languageRef.current.value = "";
                }}
              >
                <PlusIcon />
              </Button>
            </div>
          </>
        )}

        {/* List all languages */}
        <div className="flex gap-2 flex-wrap mt-2">
          {getValues().languages.map((lang, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-200 rounded-full pl-3"
            >
              <span>{lang}</span>
              <Button
                className="cursor-pointer"
                variant="ghost"
                type="button"
                onClick={() => {
                  const newLanguages = getValues().languages.filter(
                    (_, idx) => idx !== index,
                  );
                  setValue("languages", newLanguages);
                  setRandom(Math.random());
                }}
              >
                <XIcon />
              </Button>
            </div>
          ))}
        </div>
      </FieldGroup>
    </div>
  );
}

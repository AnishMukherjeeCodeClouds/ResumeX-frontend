import { useHookFormError } from "@/app/(general)/(protected)/resume/hooks";
import {
  MAX_SKILLS,
  ResumeSchemaType,
} from "@/app/(general)/(protected)/resume/resume-schema";
import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { FieldDescription, FieldGroup } from "@/components/ui/field";
import { PlusIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

export function SkillsForm() {
  const { setValue, getValues } = useFormContext<ResumeSchemaType>();
  const [_, setRandom] = useState(0);
  const skillRef = useRef<HTMLInputElement | null>(null);

  useHookFormError("skills");

  return (
    <div>
      <p className="text-2xl mb-5">Skills</p>
      <FieldGroup>
        {getValues().skills.length < MAX_SKILLS && (
          <>
            <FieldDescription className="text-lg">
              Add up to {MAX_SKILLS} skills
            </FieldDescription>

            {/*Add a skill*/}
            <div className="flex items-center gap-2">
              <FormInput ref={skillRef} name={""} label="Add Skill" />
              <Button
                variant="outline"
                type="button"
                disabled={getValues().skills.length >= MAX_SKILLS}
                onClick={() => {
                  const newSkillName = skillRef.current?.value;
                  if (newSkillName) {
                    const skillsSet = new Set(getValues().skills ?? [])
                    if(skillsSet.has(newSkillName)) {
                      toast.error("Skill already added", {
                        className: "text-lg!"
                      })
                    }
                    skillsSet.add(newSkillName)

                    // const newSkills = (newSkillName in getValues().skills)? getValues().skills ?? []: [
                    //   ...(getValues().skills ?? []),
                    //   newSkillName,
                    // ];
                    setValue("skills", Array.from(skillsSet));
                    setRandom(Math.random());
                  }
                  if (skillRef.current) skillRef.current.value = "";
                }}
              >
                <PlusIcon />
              </Button>
            </div>
          </>
        )}

        {/*<div className="flex items-center gap-2">*/}
        {/*  <FormInput ref={skillRef} name={""} label="Add Skill" />*/}
        {/*  <Button*/}
        {/*    variant="outline"*/}
        {/*    type="button"*/}
        {/*    disabled={getValues().skills.length >= MAX_SKILLS}*/}
        {/*    onClick={() => {*/}
        {/*      const newSkillName = skillRef.current?.value;*/}
        {/*      if (newSkillName) {*/}
        {/*        const newSkills = [...(getValues().skills ?? []), newSkillName];*/}
        {/*        setValue("skills", newSkills);*/}
        {/*        setRandom(Math.random());*/}
        {/*      }*/}
        {/*      if (skillRef.current) skillRef.current.value = "";*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    <PlusIcon />*/}
        {/*  </Button>*/}
        {/*</div>*/}

        {/* List all skills */}
        <div className="flex gap-2 flex-wrap">
          {getValues().skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-200 rounded-full pl-3"
            >
              <span>{skill}</span>
              <Button
                className="cursor-pointer"
                variant="ghost"
                type="button"
                onClick={() => {
                  const newSkills = getValues().skills.filter(
                    (_, idx) => idx !== index,
                  );
                  setValue("skills", newSkills);
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

import { useHookFormError } from "@/app/(general)/(protected)/resume/hooks";
import {
  MAX_PROJECT_TECHNOLOGIES,
  MAX_PROJECTS,
  ResumeSchemaType,
} from "@/app/(general)/(protected)/resume/resume-schema";
import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { FieldDescription, FieldGroup, FieldSet } from "@/components/ui/field";
import { PlusIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

export function ProjectsForm() {
  const { control, ...form } = useFormContext<ResumeSchemaType>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  const techNameRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [_, setRandom] = useState(0);

  useHookFormError("projects");

  return (
    <div>
      <p className="text-2xl mb-5">Projects</p>
      <FieldSet>
        <div className="flex justify-between items-center">
          <FieldDescription className="text-lg">
            Add up to {MAX_PROJECTS} projects
          </FieldDescription>
          <Button
            variant="outline"
            type="button"
            disabled={fields.length >= 3} // Max projects limit is 3
            onClick={() =>
              append({
                name: "",
                description: "",
                technologies: [],
                startDate: "",
                endDate: "",
                liveLink: "",
                githubLink: "",
              })
            }
          >
            <PlusIcon />
          </Button>
        </div>
        <FieldGroup>
          {fields?.map((project, index) => (
            <div className="flex flex-col gap-4" key={index}>
              <div className="flex justify-between items-center">
                <p className="text-lg mb-4">Project {index + 1}</p>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => remove(index)}
                >
                  <XIcon />
                </Button>
              </div>
              <div className="flex flex-col gap-7">
                {/* Project Name and Description */}
                <FormInput
                  control={control}
                  label="Project Name"
                  name={`projects.${index}.name`}
                  required
                />
                <FormInput
                  control={control}
                  label="Project Description"
                  name={`projects.${index}.description`}
                />

                {/* Date Fields */}
                <div className="grid grid-cols-2 gap-7">
                  <FormInput
                    className="md:!pt-3 md:!pb-9"
                    type="date"
                    control={control}
                    label={"Start Date"}
                    name={`projects.${index}.startDate`}
                  />
                  <FormInput
                    className="md:!pt-3 md:!pb-9"
                    type="date"
                    control={control}
                    label={"End Date"}
                    name={`projects.${index}.endDate`}
                  />
                </div>
                {/* Links */}
                <div className="grid grid-cols-2 gap-7">
                  <FormInput
                    control={control}
                    label={"Live Link"}
                    name={`projects.${index}.liveLink`}
                    type="url"
                  />
                  <FormInput
                    control={control}
                    label={"GitHub Link"}
                    name={`projects.${index}.githubLink`}
                    type="url"
                  />
                </div>

                {/* Technologies Field */}
                <div className="flex flex-col gap-4">
                  <FieldDescription className="text-lg">
                    Technologies Used{" "}
                    {form.getValues().projects[index].technologies.length <
                      MAX_PROJECT_TECHNOLOGIES && (
                      <span>(Add up to {MAX_PROJECT_TECHNOLOGIES})</span>
                    )}
                  </FieldDescription>

                  {/* Input field for new technology */}
                  {form.getValues().projects[index].technologies.length <
                    MAX_PROJECT_TECHNOLOGIES && (
                    <div className="flex items-center gap-2">
                      <FormInput
                        name={""}
                        ref={(el) => {
                          techNameRefs.current[index] = el;
                        }}
                        label="Add Technology"
                        placeholder="Enter technology name"
                        type="text"
                      />
                      <Button
                        variant="outline"
                        type="button"
                        disabled={
                          form.getValues().projects[index].technologies
                            .length >= MAX_PROJECT_TECHNOLOGIES
                        }
                        onClick={() => {
                          const newTechName =
                            techNameRefs.current[index]?.value;
                          if (newTechName) {
                            const newTechs = [
                              ...(form.getValues().projects[index]
                                .technologies ?? []),
                              newTechName,
                            ];
                            form.setValue(
                              `projects.${index}.technologies`,
                              newTechs,
                            );
                            setRandom(Math.random());
                          }
                          if (techNameRefs.current[index])
                            techNameRefs.current[index].value = "";
                        }}
                      >
                        <PlusIcon />
                      </Button>
                    </div>
                  )}

                  {/* List of added technologies */}
                  <div className="flex gap-2 flex-wrap">
                    {form
                      .getValues()
                      .projects[
                        index
                      ].technologies.map((technology, techIndex) => (
                        <div
                          key={techIndex}
                          className="flex items-center bg-gray-200 rounded-full pl-3"
                        >
                          <span>{technology}</span>
                          <Button
                            className="cursor-pointer"
                            variant="ghost"
                            type="button"
                            onClick={() => {
                              const newTechs = form
                                .getValues()
                                .projects[
                                  index
                                ].technologies.filter((_, idx) => idx !== techIndex);
                              form.setValue(
                                `projects.${index}.technologies`,
                                newTechs,
                              );
                              setRandom(Math.random());
                            }}
                          >
                            <XIcon />
                          </Button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </FieldGroup>
      </FieldSet>
    </div>
  );
}

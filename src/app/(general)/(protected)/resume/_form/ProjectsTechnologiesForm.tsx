import { ResumeSchemaType } from "@/app/(general)/(protected)/resume/resume-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

export function ProjectsTechnologiesForm({ index }: { index: number }) {
  const { control } = useFormContext<ResumeSchemaType>();
  const { fields, append, remove } = useFieldArray({
    control,
    // @ts-ignore
    name: `projects.${index}.technologies`,
  });

  const [techInput, setTechInput] = useState("");

  const handleAddTech = () => {
    const trimmed = techInput.trim();
    if (!trimmed) return;
    // @ts-ignore
    append(trimmed);
    setTechInput("");
  };

  const handleRemove = (i: number) => remove(i);

  return (
    <div className="space-y-3">
      {/* Add Technology Input */}
      <div className="flex gap-2 items-center">
        <Input
          placeholder="Add technology"
          value={techInput}
          onChange={(e) => setTechInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddTech();
            }
          }}
        />
        <Button
          type="button"
          variant="secondary"
          onClick={handleAddTech}
          disabled={!techInput.trim()}
        >
          Add
        </Button>
      </div>

      {/* List of Technologies */}
      {fields.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {fields.map((field, i) => (
            <li
              key={field.id}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-2"
            >
              {JSON.stringify(field)}
              <button
                type="button"
                onClick={() => handleRemove(i)}
                className="text-red-500 hover:text-red-700 text-xs"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

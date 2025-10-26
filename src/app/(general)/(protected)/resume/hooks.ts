import { ResumeSchemaType } from "@/app/(general)/(protected)/resume/resume-schema";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

function handleError<T extends Record<string, { message: string }>>(error: T) {
  Object.values(error).forEach((e) => {
    toast.error(e.message, {
      className: "!text-lg",
    });
  });
}

export function useHookFormError(field: keyof ResumeSchemaType) {
  const {
    formState: { errors },
  } = useFormContext<ResumeSchemaType>();

  useEffect(() => {
    const targetErrors = errors[field];
    if (!targetErrors) return;

    if (Array.isArray(targetErrors)) {
      targetErrors.forEach((error) => handleError(error));
    } else {
      handleError(targetErrors as Record<string, { message: string }>);
    }
  }, [errors[field]]);
}

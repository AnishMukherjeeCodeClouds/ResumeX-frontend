import {
  createResume,
  editResume,
} from "@/app/(general)/(protected)/resume/actions";
import { ResumeSchemaType } from "@/app/(general)/(protected)/resume/resume-schema";
import { toast } from "sonner";

export async function handleResumeCreation(data: ResumeSchemaType) {
  const result = await createResume(data);
  if (result.success) {
    toast.success("Resume successfully created", {
      className: "!text-lg",
    });
    window.localStorage.removeItem("resume-create-data");
  } else {
    toast.error(result.cause, {
      className: "!text-lg",
    });
  }
}
export async function handleResumeEditing(
  resumeId: string,
  data: ResumeSchemaType,
) {
  const result = await editResume(data, resumeId);
  if (result.success) {
    toast.success("Resume successfully updated", {
      className: "!text-lg",
    });
    window.localStorage.removeItem(`resume-edit-data-${resumeId}`);
  } else {
    toast.error(result.cause, {
      className: "!text-lg",
    });
  }
}

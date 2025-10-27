import { createResume } from "@/app/(general)/(protected)/resume/actions";
import { ResumeSchemaType } from "@/app/(general)/(protected)/resume/resume-schema";
import { toast } from "sonner";

export async function handleResumeSubmission(data: ResumeSchemaType) {
  console.log(data);
  const result = await createResume(data);
  if (result.success) {
    toast.success("Resume successfully created", {
      className: "!text-lg",
    });
  } else {
    toast.error(result.cause, {
      className: "!text-lg",
    });
  }
}

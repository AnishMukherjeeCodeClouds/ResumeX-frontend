import { createResume } from "@/app/(general)/(protected)/resume/actions";
import { ResumeSchemaType } from "@/app/(general)/(protected)/resume/resume-schema";

export async function handleResumeSubmission(data: ResumeSchemaType) {
  await createResume(data);
}

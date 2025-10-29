"use server";

import { ensureAuthenticated } from "@/app/(general)/(protected)/auth-action";
import { ResumeSchema } from "@/app/(general)/(protected)/resume/resume-schema";
import { API } from "@/app/(general)/utils";
import { revalidatePath } from "next/cache";
import z from "zod";

export async function createResume(createPayload: unknown) {
  await ensureAuthenticated();
  try {
    const parseResult = ResumeSchema.safeParse(createPayload);
    if (!parseResult.success)
      return {
        success: false,
        cause: "Please provide valid resume data",
      } as const;

    const payload = parseResult.data;

    const api = await API();
    await api.post(payload, "/resume/create").json();

    return { success: true } as const;
  } catch (error) {
    return {
      success: false,
      cause: JSON.parse((error as Error).message).message,
    } as const;
  }
}

export async function editResume(editPayload: unknown, resumeId: unknown) {
  await ensureAuthenticated();
  try {
    const parseResult = ResumeSchema.safeParse(editPayload);
    if (!parseResult.success)
      return {
        success: false,
        cause: "Please provide valid resume data",
      } as const;

    const parseResult2 = z.string().safeParse(resumeId);
    if (!parseResult2.success)
      return {
        success: false,
        cause: "Invalid resume id",
      } as const;

    const payload = parseResult.data;

    const api = await API();
    await api.put(payload, `/resume/edit/${resumeId}`).json();

    return { success: true } as const;
  } catch (error) {
    return {
      success: false,
      cause: JSON.parse((error as Error).message).message,
    } as const;
  }
}

export async function deleteResume(resumeId: unknown) {
  await ensureAuthenticated();
  try {
    const parseResult = z.string().safeParse(resumeId);
    if (!parseResult.success)
      return {
        success: false,
        cause: "Invalid resume id",
      } as const;

    const id = parseResult.data;

    const api = await API();
    await api.delete(`/resume/delete/${resumeId}`);

    revalidatePath("/dashboard");
  } catch (error) {
    return {
      success: false,
      cause: JSON.parse((error as Error).message).message,
    } as const;
  }
}

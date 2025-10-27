"use server";

import { ResumeSchema } from "@/app/(general)/(protected)/resume/resume-schema";
import { cookies } from "next/headers";
import wretch from "wretch";

const SERVER = process.env.SERVER_URL ?? "http://localhost:5000";
const resumeApi = wretch(`${SERVER}/resume`).options({
  credentials: "include",
  mode: "cors",
});

export async function createResume(createPayload: unknown) {
  try {
    const parseResult = ResumeSchema.safeParse(createPayload);
    if (!parseResult.success)
      return {
        success: false,
        cause: "Please provide valid resume data",
      } as const;

    const payload = parseResult.data;

    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join(";");

    await resumeApi
      .headers({
        cookie: cookieHeader,
      })
      .post(payload, "/create")
      .json();

    return { success: true } as const;
  } catch (error) {
    return {
      success: false,
      cause: JSON.parse((error as Error).message).message,
    } as const;
  }
}

import { checkAuthenticated } from "@/app/(general)/(protected)/auth-check";
import { ResumeSchemaType } from "@/app/(general)/(protected)/resume/resume-schema";
import { API } from "@/app/(general)/utils";
import { StatusCodes } from "http-status-codes";
import z from "zod";

export async function getResumesInitialData() {
  const ResSchema = z.object({
    message: z.string(),
    resumes: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        template: z.string(),
        createdAt: z.date().transform((val) => val.toDateString()),
      }),
    ),
    statusCode: z.enum(StatusCodes),
  });

  try {
    if (!(await checkAuthenticated()))
      return { success: false, cause: "Not authenticated" } as const;

    const api = await API();
    const { resumes } = await api
      .get("/resume/all")
      .json<z.infer<typeof ResSchema>>();
    return { success: true, resumes } as const;
  } catch (error) {
    return { success: false, cause: (error as Error).message } as const;
  }
}

export async function getOneResumeData(resumeId: unknown) {
  try {
    if (!(await checkAuthenticated()))
      return { success: false, cause: "Not authenticated" } as const;

    const parseResult = z.string().safeParse(resumeId);
    if (!parseResult.success)
      return {
        success: false,
        cause: "Invalid resume id",
      } as const;
    const id = parseResult.data;
    const api = await API();
    const { resumeData } = await api.get(`/resume/${id}`).json<{
      message: string;
      resumeData: ResumeSchemaType;
      statusCode: number;
    }>();

    return { success: true, resumeData } as const;
  } catch (error) {
    return { success: false, cause: (error as Error).message } as const;
  }
}

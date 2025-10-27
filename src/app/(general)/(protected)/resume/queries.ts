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
    const api = await API();
    const { resumes } = await api
      .get("/resume/all")
      .json<z.infer<typeof ResSchema>>();
    return { success: true, resumes } as const;
  } catch (error) {
    return { success: false, cause: (error as Error).message } as const;
  }
}

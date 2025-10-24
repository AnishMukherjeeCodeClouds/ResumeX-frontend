"use client";

import { EducationsForm } from "@/app/(general)/(protected)/resume/_form/EducationsForm";
import { ExperiencesForm } from "@/app/(general)/(protected)/resume/_form/ExperiencesForm";
import { PersonalDetailsForm } from "@/app/(general)/(protected)/resume/_form/PersonalDetailsForm";
import { ProjectsForm } from "@/app/(general)/(protected)/resume/_form/ProjectsForm";
import { ResumePreview } from "@/app/(general)/(protected)/resume/_form/ResumePreview";
import { SocialsForm } from "@/app/(general)/(protected)/resume/_form/SocialsForm";
import {
  ResumeSchema,
  ResumeSchemaType,
} from "@/app/(general)/(protected)/resume/resume-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";

export function MainForm() {
  const methods = useForm<ResumeSchemaType>({
    defaultValues: {
      personalDetails: {
        fullName: "",
        email: "",
        phone: "",
        location: "",
      },
      summary: "",
      socials: {
        github: "",
        linkedIn: "",
        portfolio: "",
        X: "",
      },
      experiences: [],
    },
    resolver: zodResolver(ResumeSchema),
  });
  const onSubmit = useCallback((data: ResumeSchemaType) => {
    console.log(data);
  }, []);

  return (
    <FormProvider {...methods}>
      <div className="grid h-dvh w-dvw grid-cols-1 lg:grid-cols-[1fr_1fr]">
        <form
          className="py-20 px-20 overflow-y-auto"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <PersonalDetailsForm />
          <SocialsForm />
          <ExperiencesForm />
          <ProjectsForm />
          <EducationsForm />
        </form>
        <div className="overflow-y-auto">
          <ResumePreview />
        </div>
      </div>
    </FormProvider>
  );
}

"use client";

import { AnimatedUnderlineTabs } from "@/app/(general)/(protected)/resume/_components/FormSwitchTabs";
import { ResumePreview } from "@/app/(general)/(protected)/resume/_forms/ResumePreview";
import { TEMPLATE_INITIAL_STATE } from "@/app/(general)/(protected)/resume/data";
import {
  ResumeSchema,
  ResumeSchemaType,
} from "@/app/(general)/(protected)/resume/resume-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import React, { use, useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";

export function MainForm({
  dataPromise,
}: {
  dataPromise?: Promise<
    | {
        success: true;
        resumeData: ResumeSchemaType;
      }
    | { success: false; cause: string }
  >;
}) {
  const fetchedData = dataPromise ? use(dataPromise) : undefined;
  const pathName = usePathname();

  const methods = useForm<ResumeSchemaType>({
    defaultValues: TEMPLATE_INITIAL_STATE,
    resolver: zodResolver(ResumeSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (pathName.startsWith("/resume/edit")) {
      const resumeId = pathName.split("/").at(-1);
      const existing = window.localStorage.getItem(
        `resume-edit-data-${resumeId}`,
      );
      methods.reset(
        existing
          ? JSON.parse(existing)
          : fetchedData && fetchedData.success
            ? fetchedData.resumeData
            : TEMPLATE_INITIAL_STATE,
      );
    }

    if (pathName.startsWith("/resume/new")) {
      const existing = window.localStorage.getItem("resume-create-data");
      methods.reset(existing ? JSON.parse(existing) : TEMPLATE_INITIAL_STATE);
    }
  }, []);
  const data = useWatch({ control: methods.control });

  return (
    <FormProvider {...methods}>
      <div className="grid h-dvh w-dvw grid-cols-1 lg:grid-cols-[1fr_1fr]">
        <form className="px-10 lg:p-16 overflow-y-auto">
          <AnimatedUnderlineTabs />
          {/*<PersonalDetailsForm />*/}
          {/*<SocialsForm />*/}
          {/*<ExperiencesForm />*/}
          {/*<ProjectsForm />*/}
          {/*<EducationsForm />*/}
          {/*<SkillsForm />*/}
          {/*<CertificationsForm />*/}
          {/*<LanguagesForm />*/}
        </form>
        <div className="overflow-y-auto">
          <ResumePreview />
        </div>
        {/*<ElegantTemplateReact*/}
        {/*  data={data as ResumeSchemaType}*/}
        {/*  accentColor={data.accentColor ?? "#27407e"}*/}
        {/*/>*/}
      </div>
    </FormProvider>
  );
}

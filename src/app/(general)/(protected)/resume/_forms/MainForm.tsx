"use client";

import {
  AnimatedUnderlineTabs
} from "@/app/(general)/(protected)/resume/_components/FormSwitchTabs";
import {
  ResumePreview
} from "@/app/(general)/(protected)/resume/_forms/ResumePreview";
import {
  ResumeSchema,
  ResumeSchemaType
} from "@/app/(general)/(protected)/resume/resume-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

const INITIAL_STATE: ResumeSchemaType = {
  template: "Classic",
  accentColor: "#2563eb",
  personalDetails: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    designation: "",
  },
  socials: {
    linkedIn: "",
    github: "",
    portfolio: "",
  },
  summary: "",
  experiences: [],
  projects: [],
  educations: [],
  skills: [],
  certifications: [],
  languages: [],
  title: "",
};

export function MainForm() {
  const methods = useForm<ResumeSchemaType>({
    defaultValues: INITIAL_STATE,
    resolver: zodResolver(ResumeSchema),
    mode: "onChange",
  });

  useEffect(() => {
    const existing = window.localStorage.getItem("resume-create-data");
    methods.reset(existing ? JSON.parse(existing) : INITIAL_STATE);
  }, []);

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
      </div>
    </FormProvider>
  );
}

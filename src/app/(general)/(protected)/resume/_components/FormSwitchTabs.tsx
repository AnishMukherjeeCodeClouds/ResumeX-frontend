"use client";

import { CertificationsForm } from "@/app/(general)/(protected)/resume/_forms/CertificationsForm";
import { EducationsForm } from "@/app/(general)/(protected)/resume/_forms/EducationsForm";
import { ExperiencesForm } from "@/app/(general)/(protected)/resume/_forms/ExperiencesForm";
import { LanguagesForm } from "@/app/(general)/(protected)/resume/_forms/LanguagesForm";
import { PersonalDetailsForm } from "@/app/(general)/(protected)/resume/_forms/PersonalDetailsForm";
import { ProjectsForm } from "@/app/(general)/(protected)/resume/_forms/ProjectsForm";
import { SkillsForm } from "@/app/(general)/(protected)/resume/_forms/SkillsForm";
import { SocialsForm } from "@/app/(general)/(protected)/resume/_forms/SocialsForm";
import { ResumeSchemaType } from "@/app/(general)/(protected)/resume/resume-schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as React from "react";
import { useFormContext, useWatch } from "react-hook-form";

const tabs = [
  {
    name: "Personal Details",
    value: "personalDetails",
    content: <PersonalDetailsForm />,
  },
  {
    name: "Socials",
    value: "socials",
    content: <SocialsForm />,
  },
  {
    name: "Experiences",
    value: "experiences",
    content: <ExperiencesForm />,
  },
  {
    name: "Projects",
    value: "projects",
    content: <ProjectsForm />,
  },
  {
    name: "Education",
    value: "educations",
    content: <EducationsForm />,
  },
  {
    name: "Certifications",
    value: "certifications",
    content: <CertificationsForm />,
  },
  {
    name: "Additional Details",
    value: "skills-languages",
    content: (
      <>
        <SkillsForm />
        <LanguagesForm />
      </>
    ),
  },
] as const;

export function AnimatedUnderlineTabs() {
  const [activeTab, setActiveTab] =
    React.useState<(typeof tabs)[number]["value"]>("personalDetails");
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const [underlineStyle, setUnderlineStyle] = React.useState({
    left: 0,
    width: 0,
  });

  React.useLayoutEffect(() => {
    const activeIndex = tabs.findIndex((tab) => tab.value === activeTab);
    const activeTabElement = tabRefs.current[activeIndex];

    if (activeTabElement) {
      const { offsetLeft, offsetWidth } = activeTabElement;

      setUnderlineStyle({
        left: offsetLeft,
        width: offsetWidth,
      });
    }
  }, [activeTab]);

  const { trigger, control } = useFormContext<ResumeSchemaType>();
  const data = useWatch({ control });
  return (
    <div>
      <Tabs
        value={activeTab}
        onValueChange={async (v) => {
          const triggerFields = activeTab.split(
            "-",
          ) as (keyof ResumeSchemaType)[];
          const isValid = await trigger(triggerFields);
          if (!isValid) return;

          setActiveTab(v as (typeof tabs)[number]["value"]);
          localStorage.setItem("resume-create-data", JSON.stringify(data));
        }}
        className="gap-4"
      >
        <TabsList className="bg-background relative rounded-none border-b p-0 flex-wrap h-auto">
          {tabs.map((tab, index) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              className="bg-background dark:data-[state=active]:bg-background relative z-10 rounded-none border-0 border-b-2 data-[state=active]:shadow-none md:text-lg data-[state=active]:!border-black transition-all duration-300"
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab, i) => (
          <TabsContent key={i} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

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
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import * as React from "react";
import { useCallback } from "react";
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
  const pathname = usePathname();
  const { trigger, control } = useFormContext<ResumeSchemaType>();
  const data = useWatch({ control });

  const [activeTab, setActiveTab] =
    React.useState<(typeof tabs)[number]["value"]>("personalDetails");
  const activeTabIndex = tabs.findIndex((tab) => tab.value === activeTab);
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

  const changeTab = useCallback(
    async (v: (typeof tabs)[number]["value"]) => {
      const triggerFields = activeTab.split("-") as (keyof ResumeSchemaType)[];
      const isValid = await trigger(triggerFields);
      if (!isValid) return;

      setActiveTab(v);

      if (pathname.startsWith("/resume/new"))
        localStorage.setItem("resume-create-data", JSON.stringify(data));
      else if (pathname.startsWith("/resume/edit")) {
        const resumeId = pathname.split("/").at(-1);
        console.log(data);
        localStorage.setItem(
          `resume-edit-data-${resumeId}`,
          JSON.stringify(data),
        );
      }
    },
    [activeTab, data, pathname],
  );

  return (
    <div>
      <Tabs
        value={activeTab}
        onValueChange={async (v) => {
          await changeTab(v as (typeof tabs)[number]["value"]);
        }}
        className="gap-4"
      >
        <TabsList className="bg-background relative rounded-none px-1 h-auto w-full overflow-x-scroll lg:overflow-x-hidden">
          {tabs.map((tab, index) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              className="bg-background dark:data-[state=active]:bg-background relative z-10 rounded-none border-0 border-b-2 data-[state=active]:shadow-none text-base md:text-lg not-data-[state=active]:!border-gray-200 data-[state=active]:!border-black transition-all duration-300 py-2 px-1.5"
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            disabled={activeTabIndex === 0}
            variant="secondary"
            className="rounded-full md:!px-4 cursor-pointer"
            onClick={() => changeTab(tabs[activeTabIndex - 1].value)}
          >
            <ChevronLeftIcon />
            <p className="text-base md:text-lg">Prev</p>
          </Button>
          <Button
            type="button"
            disabled={activeTabIndex === tabs.length - 1}
            variant="secondary"
            className="rounded-full md:!px-4 cursor-pointer"
            onClick={() => changeTab(tabs[activeTabIndex + 1].value)}
          >
            <ChevronRightIcon />
            <p className="text-base md:text-lg">Next</p>
          </Button>
        </div>

        {tabs.map((tab, i) => (
          <TabsContent key={i} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

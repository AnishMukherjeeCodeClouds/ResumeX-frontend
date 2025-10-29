import { AccentColorPicker } from "@/app/(general)/(protected)/resume/_components/AccentColorPicker";
import { ResumeSave } from "@/app/(general)/(protected)/resume/_components/ResumeSave";
import { TemplateSwitcher } from "@/app/(general)/(protected)/resume/_components/TemplateSwitcher";
import { templatesPDF } from "@/app/(general)/(protected)/resume/_templates/template-source";
import { ResumeSchemaType } from "@/app/(general)/(protected)/resume/resume-schema";
import useDebounce from "@/hooks/use-debounce";
import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";

const PDFViewer = dynamic(
  async () => (await import("@react-pdf/renderer")).PDFViewer,
  { ssr: false },
);

export function ResumePreview() {
  const { control } = useFormContext<ResumeSchemaType>();
  const data = useWatch({ control });
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const debounceData = useDebounce(data, 500);
  const refreshKey = useRef(0);

  const Template = templatesPDF[debounceData.template as "Classic" | "Modern"];

  const MemoizedPDFViewer = useMemo(
    () => (
      <PDFViewer
        key={refreshKey.current}
        showToolbar={false}
        width="100%"
        height="100%"
      >
        <Template
          data={debounceData as ResumeSchemaType}
          accentColor={debounceData?.accentColor ?? "#27407e"}
        />
      </PDFViewer>
    ),
    [debounceData],
  );

  useEffect(() => {
    refreshKey.current += 1;

    overlayRef.current!.classList.remove("hidden");
    overlayRef.current!.classList.add("grid");

    const timeout = setTimeout(() => {
      overlayRef.current!.classList.remove("grid");
      overlayRef.current!.classList.add("hidden");
    }, 400);

    return () => {
      clearTimeout(timeout);
    };
  }, [debounceData]);

  // const targetTemplate = templates[template ?? "Classic"];

  return (
    <div className="bg-gray-300 relative">
      <div className="flex items-center sticky top-0 bg-gray-300 lg:w-[213mm] mx-auto py-3 pl-[1.5mm] gap-2">
        <AccentColorPicker />
        <ResumeSave />
        <TemplateSwitcher />
      </div>
      <div className="h-[297mm] w-[210mm] mx-auto relative">
        <div
          ref={overlayRef}
          className="absolute h-full w-full bg-gray-800 place-items-center hidden"
        >
          <p className="text-2xl text-white">Compiling....</p>
        </div>
        {MemoizedPDFViewer}
      </div>
      {/*<K*/}
      {/*  ref={resumeTemplateRef}*/}
      {/*  data={data as ResumeSchemaType}*/}
      {/*  accentColor={accentColor ?? "#27407e"}*/}
      {/*/>*/}
    </div>
  );
}

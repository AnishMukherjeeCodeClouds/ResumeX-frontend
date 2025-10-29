import { templatesPDF } from "@/app/(general)/(protected)/resume/_templates/template-source";
import { ResumeSchemaType } from "@/app/(general)/(protected)/resume/resume-schema";
import {
  handleResumeCreation,
  handleResumeEditing,
} from "@/app/(general)/(protected)/resume/submission";
import PopoverSlideInBottom from "@/components/shadcn-studio/popover/popover-14";
import { Button } from "@/components/ui/button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { DownloadIcon, PrinterIcon, ServerIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { RefObject } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";

export function ResumeSave({
  resumeRef,
}: {
  resumeRef?: RefObject<HTMLDivElement | null>;
}) {
  const { handleSubmit, formState, control } =
    useFormContext<ResumeSchemaType>();
  const { template, ...data } = useWatch({ control });
  const Template = templatesPDF[template as keyof typeof templatesPDF];

  const reactToPrint = useReactToPrint({
    contentRef: resumeRef,
  });
  const pathname = usePathname();

  return (
    <PopoverSlideInBottom
      trigger={
        <Button variant="secondary" className="rounded-full cursor-pointer">
          <DownloadIcon />
          <p className="md:text-lg">
            Save <span className="hidden md:inline">Resume</span>
          </p>
        </Button>
      }
    >
      <div className="flex flex-col items-start gap-1">
        <PDFDownloadLink
          document={
            <Template
              data={data as ResumeSchemaType}
              accentColor={data.accentColor ?? "#27407e"}
            />
          }
          fileName="resume.pdf"
        >
          <Button
            variant="ghost"
            className="cursor-pointer"
            // onClick={reactToPrint}
          >
            <PrinterIcon />
            <p className="md:text-lg">Print / Download</p>
          </Button>
        </PDFDownloadLink>
        <Button
          variant="ghost"
          className="cursor-pointer"
          onClick={() => {
            if (Object.keys(formState.errors).length > 0) {
              toast.error("Please provide valid resume data", {
                className: "!text-lg",
              });
            } else {
              if (pathname.startsWith("/resume/new")) {
                handleSubmit(handleResumeCreation)();
                window.localStorage.removeItem("resume-create-data");
              } else {
                const resumeId = pathname.split("/").at(-1);
                handleSubmit(handleResumeEditing.bind(null, resumeId!))();
                window.localStorage.removeItem(`resume-edit-data-${resumeId}`);
              }
            }
          }}
        >
          <ServerIcon />
          <p className="md:text-lg">Save to cloud</p>
        </Button>
      </div>
    </PopoverSlideInBottom>
  );
}

import { ResumeSchemaType } from "@/app/(general)/(protected)/resume/resume-schema";
import { handleResumeSubmission } from "@/app/(general)/(protected)/resume/submission";
import PopoverSlideInBottom from "@/components/shadcn-studio/popover/popover-14";
import { Button } from "@/components/ui/button";
import { DownloadIcon, PrinterIcon, ServerIcon } from "lucide-react";
import { RefObject } from "react";
import { useFormContext } from "react-hook-form";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";

export function ResumeSave({
  resumeRef,
}: {
  resumeRef: RefObject<HTMLDivElement | null>;
}) {
  const { handleSubmit, formState } = useFormContext<ResumeSchemaType>();
  const reactToPrint = useReactToPrint({ contentRef: resumeRef! });

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
        <Button
          variant="ghost"
          className="cursor-pointer"
          onClick={reactToPrint}
        >
          <PrinterIcon />
          <p className="md:text-lg">Print / Download</p>
        </Button>
        <Button
          variant="ghost"
          className="cursor-pointer"
          onClick={() => {
            if (Object.keys(formState.errors).length > 0) {
              console.log(formState.errors);
              toast.error("Please provide valid resume data", {
                className: "!text-lg",
              });
            } else {
              handleSubmit(handleResumeSubmission)();
              window.localStorage.removeItem("resume-create-data");
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

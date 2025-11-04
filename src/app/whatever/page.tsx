"use client";

import { ClassicTemplateReactPDF } from "@/app/(general)/(protected)/resume/_templates/react-pdf/ClassicTemplate";
import { TEMPLATE_PREVIEW_DATA } from "@/app/(general)/(protected)/resume/data";
import dynamic from "next/dynamic";
// import { PDFDownloadLink } from "@react-pdf/renderer";

const PDFDownloadLink = dynamic(
  async () => (await import("@react-pdf/renderer")).PDFDownloadLink,
  { ssr: false },
);

export default function Page() {
  return (
    <div className="h-[297mm] w-[210mm]">
      <PDFDownloadLink
        document={
          <ClassicTemplateReactPDF
            data={TEMPLATE_PREVIEW_DATA}
            accentColor={"#27407e"}
          />
        }
        fileName={"resume.pdf"}
      >
        Download
      </PDFDownloadLink>
      {/*<PDFViewer width="100%" height="100%">*/}
      {/*  <ClassicTemplateReactPDF*/}
      {/*    data={TEMPLATE_PREVIEW_DATA}*/}
      {/*    accentColor={"#27407e"}*/}
      {/*  />*/}
      {/*</PDFViewer>*/}
    </div>
  );
}

import { ResumeTable } from "@/app/(general)/(protected)/dashboard/_components/ResumeTable";
import { getResumesInitialData } from "@/app/(general)/(protected)/resume/queries";

export async function Resumes() {
  const result = getResumesInitialData();
  return (
    <div>
      <h2 className="text-2xl lg:text-3xl p-3 text-center">Your Resumes</h2>
      <ResumeTable promise={result} />
    </div>
  );
}

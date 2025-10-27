import { Resumes } from "@/app/(general)/(protected)/dashboard/_components/Resumes";
import { Templates } from "@/app/(general)/(protected)/dashboard/_components/Templates";

export default function Page() {
  return (
    <div className="px-10 py-10">
      {/*  Templates */}
      <Templates />
      {/*  Current resumes */}
      <Resumes />
    </div>
  );
}

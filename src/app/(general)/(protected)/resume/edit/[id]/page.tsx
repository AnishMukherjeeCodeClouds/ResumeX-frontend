import { MainForm } from "@/app/(general)/(protected)/resume/_forms/MainForm";
import { getOneResumeData } from "@/app/(general)/(protected)/resume/queries";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const promise = getOneResumeData(id);

  return (
    <div>
      <MainForm dataPromise={promise} />
    </div>
  );
}

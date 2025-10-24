import { DateString } from "@/app/(general)/(protected)/resume/_templates/resume-data-type";

export const formatDate = (dateStr?: DateString) => {
  if (!dateStr) return "";
  const [year, month] = dateStr.split("-");
  return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
    },
  );
};

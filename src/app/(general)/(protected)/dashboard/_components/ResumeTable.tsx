"use client";

import { deleteResume } from "@/app/(general)/(protected)/resume/actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { use } from "react";

export function ResumeTable({
  promise,
}: {
  promise: Promise<
    | {
        success: true;
        resumes: {
          id: string;
          title: string;
          template: string;
          createdAt: string;
        }[];
        cause?: undefined;
      }
    | {
        success: false;
        cause: string;
        resumes?: undefined;
      }
  >;
}) {
  const result = use(promise);
  const resumes = result.success ? result.resumes : [];
  const router = useRouter();

  const formatter = Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="w-full pt-6">
      <div className="[&>div]:max-h-65 [&>div]:rounded-sm [&>div]:border">
        <Table>
          <TableHeader>
            <TableRow className="bg-background sticky top-0 lg:pb-3">
              <TableHead className="text-center text-lg lg:text-xl font-semibold">
                Title
              </TableHead>
              <TableHead className="text-center text-lg lg:text-xl font-semibold">
                Template
              </TableHead>
              <TableHead className="text-center text-lg lg:text-xl font-semibold">
                Date
              </TableHead>
              <TableHead className="text-center text-lg font-semibold"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resumes.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center md:text-lg">
                  You haven't created any resumes yet
                </TableCell>
              </TableRow>
            )}
            {resumes.map((v) => (
              <TableRow
                key={v.id}
                onClick={() => router.push(`/resume/edit/${v.id}`)}
              >
                <TableCell className="text-center lg:text-lg">
                  {v.title}
                </TableCell>
                <TableCell className="text-center lg:text-lg">
                  {v.template}
                </TableCell>
                <TableCell className="text-center lg:text-lg">
                  {formatter.format(new Date(v.createdAt))}
                </TableCell>
                <TableCell
                  className="px-7"
                  onClick={async (e) => {
                    e.stopPropagation();
                    await deleteResume(v.id);
                  }}
                >
                  <Trash2Icon className="text-red-600" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

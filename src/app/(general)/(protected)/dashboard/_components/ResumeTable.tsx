"use client";

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
    <div className="w-full">
      <div className="[&>div]:max-h-65 [&>div]:rounded-sm [&>div]:border">
        <Table>
          <TableHeader>
            <TableRow className="bg-background sticky top-0">
              <TableHead className="text-center text-lg font-semibold">
                Title
              </TableHead>
              <TableHead className="text-center text-lg font-semibold">
                Template
              </TableHead>
              <TableHead className="text-center text-lg font-semibold">
                Date
              </TableHead>
              <TableHead className="text-center text-lg font-semibold"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resumes.map((v) => (
              <TableRow
                key={v.id}
                onClick={() => router.push(`/resume/edit/${v.id}`)}
              >
                <TableCell className="text-center">{v.title}</TableCell>
                <TableCell className="text-center">{v.template}</TableCell>
                <TableCell className="text-center">
                  {formatter.format(new Date(v.createdAt))}
                </TableCell>
                <TableCell className="px-7">
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

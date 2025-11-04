"use client";

import { deleteResume } from "@/app/(general)/(protected)/resume/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { use, useState } from "react";

function ResumeDeleteDialog({
  isOpen,
  setIsOpen,
  resumeId,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  resumeId: string | null;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription className="text-base">
            This action is irreversible
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="destructive"
              onClick={async () => {
                await deleteResume(resumeId);
              }}
            >
              Delete
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

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

  const [dialogOpen, setDialogOpen] = useState(false);
  const [resumeId, setResumeId] = useState<string | null>(null);

  return (
    <div className="w-full pt-6">
      <ResumeDeleteDialog
        isOpen={dialogOpen}
        setIsOpen={setDialogOpen}
        resumeId={resumeId}
      />
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
                className="cursor-pointer"
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
                    setResumeId(v.id);
                    setDialogOpen(true);
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

"use client";

import { TEMPLATE_INITIAL_STATE } from "@/app/(general)/(protected)/resume/data";
import { InputOverlappingLabel } from "@/components/shadcn-studio/input/input-23";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { ReactNode, useRef } from "react";

export function ResumeCreateDialog({
  trigger,
  template,
}: {
  trigger: ReactNode;
  template: string;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const existing = window.localStorage.getItem("resume-create-data");
  const router = useRouter();

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="data-[state=open]:!zoom-in-0 data-[state=open]:duration-600 sm:max-w-[425px]">
          <DialogHeader>
            {existing ? (
              <>
                <DialogTitle className="text-red-700">
                  Unsaved resume data exists
                </DialogTitle>
                <DialogDescription className="text-red-700">
                  Continuing will overwrite your existing unsaved resume data
                </DialogDescription>
              </>
            ) : (
              <>
                <DialogTitle>Enter Resume Title</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </>
            )}
          </DialogHeader>
          {!existing && (
            <div className="grid gap-4">
              <InputOverlappingLabel
                ref={inputRef}
                label={"Title"}
                className="md:!text-lg md:!py-6 md:!px-5 border-gray-400"
                labelClassName="md:!text-base md:!left-4"
                required
              />
            </div>
          )}
          <DialogFooter>
            {existing ? (
              <>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    onClick={() => {
                      window.localStorage.setItem(
                        "resume-create-data",
                        JSON.stringify({
                          ...TEMPLATE_INITIAL_STATE,
                          template,
                        }),
                      );
                      router.push("/resume/new");
                    }}
                  >
                    Overwrite
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={() => router.push("/resume/new")}>
                    Edit existing data
                  </Button>
                </DialogClose>
              </>
            ) : (
              <>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                {/*<DialogClose asChild>*/}
                <Button
                  onClick={() => {
                    if (!inputRef.current) return;
                    const isValid = inputRef.current.reportValidity();
                    if (!isValid) return;

                    window.localStorage.setItem(
                      "resume-create-data",
                      JSON.stringify({
                        ...TEMPLATE_INITIAL_STATE,
                        title: inputRef.current.value,
                        template,
                      }),
                    );
                    router.push("/resume/new");
                  }}
                >
                  Create
                </Button>
                {/*</DialogClose>*/}
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

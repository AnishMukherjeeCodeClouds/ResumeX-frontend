import { ResumeCreateDialog } from "@/app/(general)/(protected)/dashboard/_components/ResumeCreateDialog";
import { templates } from "@/app/(general)/(protected)/resume/_templates/template-source";
import { TEMPLATE_PREVIEW_DATA } from "@/app/(general)/(protected)/resume/data";
import { cn } from "@/lib/utils";
import { Fragment } from "react";

export function Templates() {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl lg:text-3xl p-3 text-center">
        Choose a template to get started
      </h2>
      <div className="[&_*]:transition-all [&_*]:duration-300 flex items-center overflow-x-scroll lg:flex-wrap w-full lg:w-xl lg:pl-10">
        {(
          Object.entries(templates) as [
            keyof typeof templates,
            (typeof templates)[keyof typeof templates],
          ][]
        ).map(([name, Template], index) => {
          return (
            <Fragment key={name}>
              <ResumeCreateDialog
                template={name}
                trigger={
                  <div
                    className={cn(
                      "cursor-pointer hover:bg-gray-200 group p-3 rounded-md w-fit",
                    )}
                  >
                    <div className="cursor-pointer hover:bg-gray-200 group p-3 rounded-md">
                      <div className="w-[180px] h-[255px] lg:w-[210px] lg:h-[300px] overflow-hidden relative border rounded-md shadow-sm bg-gray-50 pointer-events-none">
                        <div
                          className="origin-top-left absolute top-0 left-0 group-hover:scale-105 lg:scale-110"
                          style={{
                            transform: "scale(0.25)",
                            transformOrigin: "top left",
                            width: "210mm",
                            height: "297mm",
                          }}
                        >
                          <Template
                            data={TEMPLATE_PREVIEW_DATA}
                            accentColor={"#27407e"}
                          />
                        </div>
                      </div>
                      <p className="text-center mt-2 lg:text-lg font-semibold">
                        {name}
                      </p>
                    </div>
                  </div>
                }
              />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

import { ResumeCreateDialog } from "@/app/(general)/(protected)/dashboard/_components/ResumeCreateDialog";
import { templates } from "@/app/(general)/(protected)/resume/_templates/template-source";
import { TEMPLATE_PREVIEW_DATA } from "@/app/(general)/(protected)/resume/data";
import { Fragment } from "react";

export function Templates() {
  return (
    <div>
      <h2 className="text-2xl p-3 text-center">Our Templates</h2>
      <div className="[&_*]:transition-all [&_*]:duration-300 flex items-center overflow-x-scroll">
        {(
          Object.entries(templates) as [
            keyof typeof templates,
            (typeof templates)[keyof typeof templates],
          ][]
        ).map(([name, Template]) => (
          <Fragment key={name}>
            <ResumeCreateDialog
              template={name}
              trigger={
                <div className="cursor-pointer hover:bg-gray-200 group p-3 rounded-md">
                  <div className="cursor-pointer hover:bg-gray-200 group p-3 rounded-md">
                    <div className="w-[180px] h-[255px] overflow-hidden relative border rounded-md shadow-sm bg-gray-50 pointer-events-none">
                      <div
                        className="origin-top-left absolute top-0 left-0 group-hover:scale-105"
                        style={{
                          transform: "scale(0.25)",
                          transformOrigin: "top left",
                          width: "210mm",
                          height: "297mm",
                        }}
                      >
                        <Template
                          data={TEMPLATE_PREVIEW_DATA}
                          accentColor={"#000"}
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
        ))}
      </div>
    </div>
  );
}

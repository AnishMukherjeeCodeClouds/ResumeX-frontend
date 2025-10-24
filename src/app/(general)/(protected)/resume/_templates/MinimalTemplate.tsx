import {
  DateString,
  ResumeDataType,
} from "@/app/(general)/(protected)/resume/_templates/resume-data-type";
import { Ref } from "react";

const MinimalTemplate = ({
  data,
  accentColor,
  ref,
}: {
  data: ResumeDataType;
  accentColor: string;
  ref?: Ref<HTMLDivElement>;
}) => {
  const formatDate = (dateStr?: DateString) => {
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

  return (
    <div
      ref={ref}
      className="max-w-4xl mx-auto p-8 bg-white text-gray-900 font-light"
    >
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-thin mb-4 tracking-wide">
          {data.personalDetails.fullName || "Your Name"}
        </h1>

        <div className="flex flex-wrap gap-6 text-sm text-gray-600">
          {data.personalDetails.email && (
            <span>{data.personalDetails.email}</span>
          )}
          {data.personalDetails.phone && (
            <span>{data.personalDetails.phone}</span>
          )}
          {data.personalDetails.location && (
            <span>{data.personalDetails.location}</span>
          )}
          {data.socials?.linkedin && (
            <span className="break-all">{data.socials.linkedin}</span>
          )}
          {data.socials?.portfolio && (
            <span className="break-all">{data.socials.portfolio}</span>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {data.summary && (
        <section className="mb-10">
          <p className="text-gray-700">{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-10">
          <h2
            className="text-sm uppercase tracking-widest mb-6 font-medium"
            style={{ color: accentColor }}
          >
            Experience
          </h2>

          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-lg font-medium">{exp.position}</h3>
                  <span className="text-sm text-gray-500">
                    {formatDate(exp.startDate)} -{" "}
                    {exp.endDate ? formatDate(exp.endDate) : "Present"}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{exp.organization}</p>
                {exp.description && (
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section className="mb-10">
          <h2
            className="text-sm uppercase tracking-widest mb-6 font-medium"
            style={{ color: accentColor }}
          >
            Projects
          </h2>

          <div className="space-y-4">
            {data.projects.map((proj) => (
              <div key={proj.id} className="flex flex-col gap-2">
                <h3 className="text-lg font-medium">{proj.name}</h3>
                {proj.description && (
                  <p className="text-gray-600">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="mb-10">
          <h2
            className="text-sm uppercase tracking-widest mb-6 font-medium"
            style={{ color: accentColor }}
          >
            Education
          </h2>

          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-medium">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-gray-600">{edu.institution}</p>
                  {edu.grade && (
                    <p className="text-sm text-gray-500">GPA: {edu.grade}</p>
                  )}
                </div>
                <span className="text-sm text-gray-500">
                  {formatDate(edu.startDate)} -{" "}
                  {edu.endDate ? formatDate(edu.endDate) : "Present"}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section>
          <h2
            className="text-sm uppercase tracking-widest mb-6 font-medium"
            style={{ color: accentColor }}
          >
            Skills
          </h2>

          <div className="text-gray-700">{data.skills.join(" • ")}</div>
        </section>
      )}
    </div>
  );
};

export default MinimalTemplate;

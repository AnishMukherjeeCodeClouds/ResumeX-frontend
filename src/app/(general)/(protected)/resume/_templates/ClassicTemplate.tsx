import {
  DateString,
  ResumeDataType,
} from "@/app/(general)/(protected)/resume/_templates/resume-data-type";
import { Globe, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Ref } from "react";

const ClassicTemplate = ({
  data,
  accentColor,
  ref,
}: {
  data: ResumeDataType;
  accentColor: string;
  ref?: Ref<HTMLDivElement>;
}) => {
  const formatDate = (dateStr: DateString) => {
    const [year, month] = dateStr.split("-");
    const formatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
    });

    return formatter.format(new Date(parseInt(year), parseInt(month) - 1));
  };

  return (
    <div
      ref={ref}
      className="max-w-4xl mx-auto p-8 bg-white text-gray-800 leading-relaxed"
    >
      {/* Header */}
      <header
        className="text-center mb-8 pb-6 border-b-2"
        style={{ borderColor: accentColor }}
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: accentColor }}>
          {data.personalDetails?.fullName || "Your Name"}
        </h1>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {data.personalDetails?.email && (
            <div className="flex items-center gap-1">
              <Mail className="size-4" />
              <span>{data.personalDetails.email}</span>
            </div>
          )}
          {data.personalDetails?.phone && (
            <div className="flex items-center gap-1">
              <Phone className="size-4" />
              <span>{data.personalDetails.phone}</span>
            </div>
          )}
          {data.personalDetails?.location && (
            <div className="flex items-center gap-1">
              <MapPin className="size-4" />
              <span>{data.personalDetails.location}</span>
            </div>
          )}
          {data.socials?.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="size-4" />
              <span className="break-all">{data.socials.linkedin}</span>
            </div>
          )}
          {data.socials?.portfolio && (
            <div className="flex items-center gap-1">
              <Globe className="size-4" />
              <span className="break-all">{data.socials.portfolio}</span>
            </div>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {data.summary && (
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-3"
            style={{ color: accentColor }}
          >
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: accentColor }}
          >
            PROFESSIONAL EXPERIENCE
          </h2>

          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div
                key={index}
                className="border-l-3 pl-4"
                style={{ borderColor: accentColor }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {exp.position}
                    </h3>
                    <p className="text-gray-700 font-medium">
                      {exp.organization}
                    </p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>
                      {formatDate(exp.startDate)} -{" "}
                      {exp.endDate ? formatDate(exp.endDate) : "Present"}
                    </p>
                  </div>
                </div>
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
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: accentColor }}
          >
            PROJECTS
          </h2>

          <div className="space-y-3">
            {data.projects.map((proj, index) => (
              <div
                key={index}
                className="flex justify-between items-start border-l-3 border-gray-300 pl-6"
              >
                <div className="w-full">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{proj.name}</h3>
                    <div className="text-right text-sm text-gray-600">
                      <p>
                        {formatDate(proj.startDate)} -{" "}
                        {proj.endDate ? formatDate(proj.endDate) : "Present"}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600">{proj.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: accentColor }}
          >
            EDUCATION
          </h2>

          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-gray-700">{edu.institution}</p>
                  {edu.grade && (
                    <p className="text-sm text-gray-600">GPA: {edu.grade}</p>
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  <p>
                    {formatDate(edu.startDate)} -{" "}
                    {edu.endDate ? formatDate(edu.endDate) : "Present"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: accentColor }}
          >
            CORE SKILLS
          </h2>

          <div className="flex gap-4 flex-wrap">
            {data.skills.map((skill, index) => (
              <div key={index} className="text-gray-700">
                • {skill}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;

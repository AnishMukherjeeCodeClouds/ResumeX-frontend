import { formatDate } from "@/app/(general)/(protected)/resume/_templates/ModernTemplate";
import { ResumeSchema } from "@/app/(general)/(protected)/resume/resume-schema";
import {
  GithubIcon,
  Globe,
  Linkedin,
  LinkIcon,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import React from "react";
import z from "zod";

export function ModernTemplateReact({
  data,
  accentColor,
}: {
  data: z.infer<typeof ResumeSchema>;
  accentColor: string;
}) {
  return (
    <div className="lg:w-[210mm] h-[297mm] print:h-[297mm] mx-auto bg-white text-gray-800 shadow-md shadow-black p-8 font-sans">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-4xl font-light mb-3" style={{ color: accentColor }}>
          {data.personalDetails.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {data.personalDetails.email && (
            <div className="flex items-center gap-1">
              <Mail className="size-4" />
              {data.personalDetails.email}
            </div>
          )}
          {data.personalDetails.phone && (
            <div className="flex items-center gap-1">
              <Phone className="size-4" />
              {data.personalDetails.phone}
            </div>
          )}
          {data.personalDetails.location && (
            <div className="flex items-center gap-1">
              <MapPin className="size-4" />
              {data.personalDetails.location}
            </div>
          )}
          {data.socials?.linkedIn && (
            <a
              target="_blank"
              rel="noreferrer"
              href={data.socials.linkedIn}
              className="flex items-center gap-1"
            >
              <Linkedin className="size-4" />
              {data.socials.linkedIn.replace(/^https?:\/\/(www\.)?/, "")}
            </a>
          )}
          {data.socials?.portfolio && (
            <a
              target="_blank"
              rel="noreferrer"
              href={data.socials.portfolio}
              className="flex items-center gap-1"
            >
              <Globe className="size-4" />
              {data.socials.portfolio.replace(/^https?:\/\//, "")}
            </a>
          )}
        </div>
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-2"
            style={{ color: accentColor }}
          >
            Professional Summary
          </h2>
          <p className="text-wrap">{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experiences && data.experiences.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-2"
            style={{ color: accentColor }}
          >
            Experience
          </h2>
          <div className="space-y-4">
            {data.experiences.map((exp, i) => (
              <div
                key={`exp-${i}`}
                className="pl-4 border-l-4"
                style={{ borderColor: accentColor }}
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">{exp.position}</h3>
                    <p className="text-gray-700 font-medium">
                      {exp.organization}
                    </p>
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatDate(exp.startDate)} -{" "}
                    {exp.endDate ? formatDate(exp.endDate) : "Present"}
                  </div>
                </div>
                {exp.description && <p className="mt-2">{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-2"
            style={{ color: accentColor }}
          >
            Projects
          </h2>
          <div className="space-y-4">
            {data.projects.map((proj, i) => (
              <div
                key={`proj-${i}`}
                className="pl-4 border-l-4"
                style={{ borderColor: accentColor }}
              >
                <div className="flex justify-between">
                  <h3 className="font-semibold">{proj.name}</h3>
                  <div className="flex items-center gap-2">
                    {proj.githubLink && (
                      <a href={proj.githubLink} target="_blank">
                        <GithubIcon className="size-5" />
                      </a>
                    )}
                    {proj.liveLink && (
                      <a href={proj.liveLink} target="_blank">
                        <LinkIcon className="size-5" />
                      </a>
                    )}
                    <div className="text-sm text-gray-600">
                      {formatDate(proj.startDate)} -{" "}
                      {proj.endDate ? formatDate(proj.endDate) : "Present"}
                    </div>
                  </div>
                </div>
                <p className="mt-1 text-gray-700">{proj.description}</p>
                <div className="flex gap-2 mt-2">
                  {proj.technologies.map((tech, j) => (
                    <p
                      key={`proj-${i}-tech-${j}`}
                      style={{ backgroundColor: accentColor }}
                      className="px-3 py-1 text-white rounded-full"
                    >
                      {tech}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid md:grid-cols-2 print:grid-cols-2 gap-6">
        {/* Education */}
        {data.educations && data.educations.length > 0 && (
          <section>
            <h2
              className="text-xl font-semibold mb-2"
              style={{ color: accentColor }}
            >
              Education
            </h2>
            <div className="space-y-2">
              {data.educations.map((edu, i) => (
                <div key={`edu-${i}`}>
                  <h3 className="font-semibold">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p style={{ color: accentColor }}>{edu.institution}</p>
                  <p className="text-sm text-gray-600">
                    {formatDate(edu.startDate)} -{" "}
                    {edu.endDate ? formatDate(edu.endDate) : "Present"}{" "}
                    {edu.grade && `• GPA: ${edu.grade}`}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <section>
            <h2
              className="text-xl font-semibold mb-2"
              style={{ color: accentColor }}
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-white rounded-full"
                  style={{ backgroundColor: accentColor }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

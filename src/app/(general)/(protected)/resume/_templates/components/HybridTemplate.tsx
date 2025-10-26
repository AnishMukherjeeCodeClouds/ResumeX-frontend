"use client";

import {
  extractUsername,
  formatDate,
} from "@/app/(general)/(protected)/resume/_templates/utils";
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
import React, { Ref } from "react";
import z from "zod";

export function HybridTemplateReact({
  data,
  accentColor,
  ref,
}: {
  data: z.infer<typeof ResumeSchema>;
  accentColor: string;
  ref?: Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={ref}
      className="lg:w-[210mm] min-h-[297mm] bg-gray-50 text-gray-800 mx-auto font-sans shadow-md print:shadow-none print:h-[297mm] shadow-black"
    >
      <style>
        {`@page { padding: 5mm 6mm !important; }
          @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }`}
      </style>
      {/* Header */}
      <header
        className="p-8 bg-white border-b-4"
        style={{ borderColor: accentColor }}
      >
        <h1 className="text-4xl font-bold mb-1" style={{ color: accentColor }}>
          {data.personalDetails.fullName}
        </h1>
        {data.title && (
          <p className="text-lg text-gray-700 font-medium">{data.title}</p>
        )}
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3 text-sm text-gray-600">
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
              href={data.socials.linkedIn}
              target="_blank"
              className="flex items-center gap-1"
            >
              <Linkedin className="size-4" />
              {extractUsername(data.socials.linkedIn)}
            </a>
          )}
          {data.socials?.github && (
            <a
              href={data.socials.github}
              target="_blank"
              className="flex items-center gap-1"
            >
              <GithubIcon className="size-4" />
              {extractUsername(data.socials.github)}
            </a>
          )}
          {data.socials?.portfolio && (
            <a
              href={data.socials.portfolio}
              target="_blank"
              className="flex items-center gap-1"
            >
              <Globe className="size-4" />
              {data.socials.portfolio.replace(/^https?:\/\//, "")}
            </a>
          )}
        </div>
      </header>

      {/* Body */}
      <main className="flex gap-8 p-8 print:p-6">
        {/* Left Sidebar */}
        <aside className="flex-1 space-y-5">
          {/* Summary */}
          {data.summary && (
            <section>
              <h2
                className="text-lg font-semibold mb-1"
                style={{ color: accentColor }}
              >
                Summary
              </h2>
              <p className="text-sm text-gray-700 leading-snug">
                {data.summary}
              </p>
            </section>
          )}

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <section>
              <h2
                className="text-lg font-semibold mb-1"
                style={{ color: accentColor }}
              >
                Skills
              </h2>
              <div className="flex flex-wrap gap-1">
                {data.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 text-xs rounded-full border"
                    style={{ borderColor: accentColor, color: accentColor }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <section>
              <h2
                className="text-lg font-semibold mb-1"
                style={{ color: accentColor }}
              >
                Languages
              </h2>
              <div className="flex flex-wrap gap-1">
                {data.languages.map((lang) => (
                  <span
                    key={lang}
                    className="px-2 py-0.5 text-xs rounded-full border"
                    style={{ borderColor: accentColor, color: accentColor }}
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {data.certifications && data.certifications.length > 0 && (
            <section>
              <h2
                className="text-lg font-semibold mb-1"
                style={{ color: accentColor }}
              >
                Certifications
              </h2>
              <ul className="text-sm space-y-2">
                {data.certifications.map((cert, i) => (
                  <li key={i}>
                    <p className="font-semibold">{cert.title}</p>
                    <p className="text-gray-700 text-sm">{cert.issuer}</p>
                    <p className="text-gray-500 text-sm flex items-center gap-1">
                      {formatDate(cert.date)}{" "}
                      {cert.url && (
                        <>
                          <span>•</span>
                          <a
                            href={cert.url}
                            target="_blank"
                            className="underline"
                          >
                            <LinkIcon className="size-4" />
                          </a>
                        </>
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>

        {/* Main Timeline Column */}
        <div className="flex-2 space-y-6">
          {/* Experience */}
          {data.experiences && data.experiences.length > 0 && (
            <section>
              <h2
                className="text-xl font-semibold mb-3"
                style={{ color: accentColor }}
              >
                Experience
              </h2>
              <div
                className="relative pl-6 border-l-2 space-y-3"
                style={{ borderColor: accentColor }}
              >
                {data.experiences.map((exp, i) => (
                  <div key={i}>
                    <div className="flex justify-between">
                      <p className="font-semibold">{exp.position}</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(exp.startDate)} -{" "}
                        {exp.endDate ? formatDate(exp.endDate) : "Present"}
                      </p>
                    </div>
                    <p className="text-sm text-gray-700 font-medium">
                      {exp.organization}
                    </p>
                    {exp.description && (
                      <p className="text-sm text-gray-600 mt-1">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <section>
              <h2
                className="text-xl font-semibold mb-3"
                style={{ color: accentColor }}
              >
                Projects
              </h2>
              <div
                className="relative pl-6 border-l-2 space-y-3"
                style={{ borderColor: accentColor }}
              >
                {data.projects.map((proj, i) => (
                  <div key={i}>
                    <div className="flex justify-between">
                      <p className="font-semibold">{proj.name}</p>
                      <div className="flex gap-2 items-center">
                        {proj.githubLink && (
                          <a href={proj.githubLink} target="_blank">
                            <GithubIcon className="size-4" />
                          </a>
                        )}
                        {proj.liveLink && (
                          <a href={proj.liveLink} target="_blank">
                            <LinkIcon className="size-4" />
                          </a>
                        )}
                        <p className="text-gray-500 text-sm">
                          {formatDate(proj.startDate)} -{" "}
                          {proj.endDate ? formatDate(proj.endDate) : "Present"}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{proj.description}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {proj.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-xs rounded-full text-white"
                          style={{ backgroundColor: accentColor }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data.educations && data.educations.length > 0 && (
            <section>
              <h2
                className="text-xl font-semibold mb-3"
                style={{ color: accentColor }}
              >
                Education
              </h2>
              <div
                className="relative pl-6 border-l-2 space-y-3"
                style={{ borderColor: accentColor }}
              >
                {data.educations.map((edu, i) => (
                  <div key={i}>
                    <p className="font-semibold">{edu.degree}</p>
                    {edu.field && (
                      <p className="text-sm text-gray-700">{edu.field}</p>
                    )}
                    <p className="text-sm text-gray-700">{edu.institution}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(edu.startDate)} -{" "}
                      {edu.endDate ? formatDate(edu.endDate) : "Present"}{" "}
                      {edu.grade && `• GPA: ${edu.grade}`}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

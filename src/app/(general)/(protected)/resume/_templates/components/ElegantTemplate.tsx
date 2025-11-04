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

export function ElegantTemplateReact({
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
      className="lg:w-[210mm] min-h-[297mm] print:h-[297mm] bg-white text-gray-800 font-sans mx-auto shadow-md print:shadow-none flex print:flex-row shadow-black"
    >
      {/* Left Sidebar */}
      <aside
        className="w-[35%] bg-gray-50 p-6 print:p-4 border-r-2 break-words"
        style={{ borderColor: accentColor }}
      >
        {/* Name */}
        <h1
          className="text-3xl font-semibold leading-tight max-w-full text-wrap"
          style={{ color: accentColor }}
        >
          {data.personalDetails.fullName}
        </h1>
        <p className="text-lg font-light">{data.personalDetails.designation}</p>

        <div className="mt-3">
          {data.personalDetails.location && (
            <p className="text-sm text-gray-700 mb-1 flex items-center gap-1">
              <MapPin className="size-4" /> {data.personalDetails.location}
            </p>
          )}
          {data.personalDetails.email && (
            <p className="text-sm text-gray-700 mb-1 flex items-center gap-1">
              <Mail className="size-4" /> {data.personalDetails.email}
            </p>
          )}
          {data.personalDetails.phone && (
            <p className="text-sm text-gray-700 mb-1 flex items-center gap-1">
              <Phone className="size-4" /> {data.personalDetails.phone}
            </p>
          )}

          {/* Social Links */}
          <div className="space-y-1 text-sm">
            {data.socials?.linkedIn && (
              <a
                href={data.socials.linkedIn}
                target="_blank"
                className="flex items-center gap-1"
              >
                <Linkedin className="size-4" />{" "}
                {extractUsername(data.socials.linkedIn)}
              </a>
            )}
            {data.socials?.github && (
              <a
                href={data.socials.github}
                target="_blank"
                className="flex items-center gap-1"
              >
                <GithubIcon className="size-4" />{" "}
                {extractUsername(data.socials.github)}
              </a>
            )}
            {data.socials?.portfolio && (
              <a
                href={data.socials.portfolio}
                target="_blank"
                className="flex items-center gap-1"
              >
                <Globe className="size-4" />{" "}
                {data.socials.portfolio.replace(/^https?:\/\//, "")}
              </a>
            )}
          </div>
        </div>

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div className="mt-6">
            <h2
              className="text-lg font-semibold mb-2 border-b pb-1"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              Skills
            </h2>
            <ul className="flex flex-wrap gap-1 text-sm">
              {data.skills.map((s, i) => (
                <li
                  key={i}
                  className="bg-white border rounded-full px-2 py-0.5"
                  style={{ borderColor: accentColor, color: accentColor }}
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div className="mt-5">
            <h2
              className="text-lg font-semibold mb-2 border-b pb-1"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              Languages
            </h2>
            <ul className="flex flex-wrap gap-1 text-sm">
              {data.languages.map((lang) => (
                <li
                  key={lang}
                  className="border rounded-full px-2 py-0.5"
                  style={{ borderColor: accentColor, color: accentColor }}
                >
                  {lang}
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="w-[65%] p-6 print:p-4 space-y-4">
        {/* Summary */}
        {data.summary && (
          <section>
            <h2
              className="text-lg font-semibold mb-1"
              style={{ color: accentColor }}
            >
              Professional Summary
            </h2>
            <p className="text-sm text-gray-700 leading-tight">
              {data.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experiences && data.experiences.length > 0 && (
          <section>
            <h2
              className="text-lg font-semibold mb-1"
              style={{ color: accentColor }}
            >
              Experience
            </h2>
            <div className="space-y-2">
              {data.experiences.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="font-semibold">{exp.position}</p>
                      <p className="text-gray-600">{exp.organization}</p>
                    </div>
                    <p className="text-gray-500">
                      {formatDate(exp.startDate)} -{" "}
                      {exp.endDate ? formatDate(exp.endDate) : "Present"}
                    </p>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 text-sm mt-0.5">
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
              className="text-lg font-semibold mb-1"
              style={{ color: accentColor }}
            >
              Projects
            </h2>
            <div className="space-y-2">
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
                        className="px-2 py-0.5 rounded-full text-white text-xs"
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
              className="text-lg font-semibold mb-1"
              style={{ color: accentColor }}
            >
              Education
            </h2>
            <div className="space-y-2">
              {data.educations.map((edu, i) => (
                <div key={i}>
                  <p className="font-semibold">{edu.degree}</p>
                  <p className="text-gray-700 text-sm">{edu.institution}</p>
                  <p className="text-gray-500 text-sm">
                    {formatDate(edu.startDate)} -{" "}
                    {edu.endDate ? formatDate(edu.endDate) : "Present"}{" "}
                    {edu.grade && `• GPA: ${edu.grade}`}
                  </p>
                </div>
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
            <div className="space-y-2">
              {data.certifications.map((cert, i) => (
                <div key={i}>
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
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

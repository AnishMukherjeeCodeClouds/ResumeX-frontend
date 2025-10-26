"use client";

import { formatDate } from "@/app/(general)/(protected)/resume/_templates/utils";
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

const extractUsername = (url: string): string => {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    const parts = u.pathname.split("/").filter(Boolean);
    if (host.includes("linkedin.com") && parts[0] === "in")
      return parts[1] || host;
    if (host.includes("github.com")) return parts[0] || host;
    if (host.includes("x.com") || host.includes("twitter.com"))
      return parts[0] || host;
    return parts[0] || host;
  } catch {
    return url;
  }
};

export function ModernTemplateReact({
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
      className="lg:w-[210mm] min-h-[297mm] bg-white text-gray-900 font-sans shadow-md mx-auto print:shadow-none print:w-[210mm] shadow-black"
    >
      {/*<style>{`@page { margin: 4mm !important; }`}</style>*/}
      {/* ===== HEADER ===== */}
      <header
        className="p-6 text-white"
        style={{
          backgroundColor: accentColor,
        }}
      >
        <h1 className="text-4xl font-bold leading-tight">
          {data.personalDetails.fullName}
        </h1>
        <p className="text-lg font-light">{data.personalDetails.designation}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-sm text-white/90">
          {data.personalDetails.email && (
            <div className="flex items-center gap-1">
              <Mail className="size-4" /> {data.personalDetails.email}
            </div>
          )}
          {data.personalDetails.phone && (
            <div className="flex items-center gap-1">
              <Phone className="size-4" /> {data.personalDetails.phone}
            </div>
          )}
          {data.personalDetails.location && (
            <div className="flex items-center gap-1">
              <MapPin className="size-4" /> {data.personalDetails.location}
            </div>
          )}
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
      </header>

      {/* ===== BODY ===== */}
      <main className="p-6 space-y-3">
        {/* Summary */}
        {data.summary && (
          <section>
            <h2
              className="text-xl font-semibold border-b-2 mb-1 pb-1"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-snug text-sm">{data.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experiences && data.experiences.length > 0 && (
          <section>
            <h2
              className="text-xl font-semibold border-b-2 mb-1 pb-1"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              Experience
            </h2>
            <div className="space-y-3">
              {data.experiences.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between">
                    <div className="flex items-baseline gap-2">
                      <h3 className="font-semibold">{exp.position}</h3>
                      <span>•</span>
                      <p className="text-gray-700 font-medium">
                        {exp.organization}
                      </p>
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatDate(exp.startDate)} -{" "}
                      {exp.endDate ? formatDate(exp.endDate) : "Present"}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 text-sm mt-1">
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
              className="text-xl font-semibold border-b-2 mb-1 pb-1"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              Projects
            </h2>
            <div className="space-y-3">
              {data.projects.map((proj, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">{proj.name}</p>
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
                  <p className="text-gray-700 text-sm">{proj.description}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {proj.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-xs text-white rounded-full"
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

        <div className="grid grid-cols-2 gap-3">
          {/* Education */}
          {data.educations && data.educations.length > 0 && (
            <section>
              <h2
                className="text-xl font-semibold border-b-2 mb-1 pb-1"
                style={{ borderColor: accentColor, color: accentColor }}
              >
                Education
              </h2>
              <div className="space-y-2">
                {data.educations.map((edu, i) => (
                  <div key={i}>
                    <p className="font-semibold">{edu.degree}</p>
                    {edu.field && (
                      <p className="text-sm text-gray-700">{edu.field}</p>
                    )}
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
                className="text-xl font-semibold border-b-2 mb-1 pb-1"
                style={{ borderColor: accentColor, color: accentColor }}
              >
                Certifications
              </h2>
              <div className="space-y-2">
                {data.certifications.map((cert, i) => (
                  <div key={i}>
                    <p className="font-semibold">{cert.title}</p>
                    <p className="text-gray-700 text-sm">{cert.issuer}</p>
                    <p className="text-gray-600 text-sm flex items-center gap-1">
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
        </div>

        {/* Skills + Languages */}
        <section className="grid grid-cols-2 gap-3">
          {data.skills && data.skills.length > 0 && (
            <div>
              <h2
                className="text-xl font-semibold border-b-2 mb-1 pb-1"
                style={{ borderColor: accentColor, color: accentColor }}
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
            </div>
          )}

          {data.languages && data.languages.length > 0 && (
            <div>
              <h2
                className="text-xl font-semibold border-b-2 mb-1 pb-1"
                style={{ borderColor: accentColor, color: accentColor }}
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
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

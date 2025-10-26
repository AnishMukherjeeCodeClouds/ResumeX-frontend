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

export function ClassicTemplateReact({
  data,
  accentColor,
  ref,
}: {
  data: z.infer<typeof ResumeSchema>;
  accentColor: string;
  ref?: Ref<HTMLDivElement>;
}) {
  const textColor = { color: accentColor };
  const borderColor = { borderColor: accentColor };
  const bgAccent = { backgroundColor: accentColor };

  return (
    <div
      ref={ref}
      className="lg:w-[210mm] min-h-[297mm] print:h-[297mm] mx-auto p-8 font-sans text-gray-800 bg-white shadow-md shadow-black print:shadow-none print:p-[4mm]"
    >
      <style>{`@page { margin: 4mm !important; }`}</style>
      {/* ================= HEADER ================= */}
      <header className="mb-3">
        <h1 className="text-4xl font-light" style={textColor}>
          {data.personalDetails.fullName || "Your Name"}
        </h1>
        <p className="text-lg font-light">{data.personalDetails.designation}</p>

        {/* Contact Info */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-gray-600 mt-3">
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
              rel="noreferrer"
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
              rel="noreferrer"
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
              rel="noreferrer"
              className="flex items-center gap-1"
            >
              <Globe className="size-4" />
              {data.socials.portfolio.replace(/^https?:\/\//, "")}
            </a>
          )}
        </div>
      </header>

      {/* ================= SUMMARY ================= */}
      {data.summary && (
        <section className="mb-3">
          <h2 className="text-xl font-semibold mb-2" style={textColor}>
            Professional Summary
          </h2>
          <p className="text-sm leading-snug text-gray-700">{data.summary}</p>
        </section>
      )}

      {/* ================= EXPERIENCE ================= */}
      {data.experiences?.length > 0 && (
        <section className="mb-3">
          <h2 className="text-xl font-semibold mb-2" style={textColor}>
            Experience
          </h2>
          <div className="space-y-3">
            {data.experiences.map((exp, i) => (
              <div
                key={`exp-${i}`}
                className="pl-4 border-l-4"
                style={borderColor}
              >
                <div className="flex justify-between">
                  <div className="flex items-baseline gap-2">
                    <h3 className="font-semibold">{exp.position}</h3>
                    <span>•</span>
                    <p className="text-gray-700 font-medium">
                      {exp.organization}
                    </p>
                  </div>
                  <span className="text-sm text-gray-600">
                    {formatDate(exp.startDate)} –{" "}
                    {exp.endDate ? formatDate(exp.endDate) : "Present"}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-gray-700 text-sm leading-tight mt-1">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= PROJECTS ================= */}
      {data.projects?.length > 0 && (
        <section className="mb-3">
          <h2 className="text-xl font-semibold mb-2" style={textColor}>
            Projects
          </h2>
          <div className="space-y-3">
            {data.projects.map((proj, i) => (
              <div
                key={`proj-${i}`}
                className="pl-4 border-l-4"
                style={borderColor}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">{proj.name}</h3>
                  <div className="flex items-center gap-2 text-gray-600">
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
                    <span className="text-sm">
                      {formatDate(proj.startDate)} –{" "}
                      {proj.endDate ? formatDate(proj.endDate) : "Present"}
                    </span>
                  </div>
                </div>
                {proj.description && (
                  <p className="text-gray-700 text-sm leading-tight mt-1">
                    {proj.description}
                  </p>
                )}
                {proj.technologies?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {proj.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-xs text-white rounded-full"
                        style={bgAccent}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= EDUCATION / SKILLS / CERTS / LANGUAGES ================= */}
      <div className="grid md:grid-cols-2 print:grid-cols-2 gap-x-8 gap-y-3">
        {/* Education */}
        {data.educations?.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-2" style={textColor}>
              Education
            </h2>
            <div className="space-y-3">
              {data.educations.map((edu, i) => (
                <div
                  key={`edu-${i}`}
                  className="pl-4 border-l-4"
                  style={borderColor}
                >
                  <h3 className="font-semibold tracking-tight">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-gray-700 font-medium text-sm">
                    {edu.institution}
                  </p>
                  <p className="text-sm text-gray-600 text-sm">
                    {formatDate(edu.startDate)} –{" "}
                    {edu.endDate ? formatDate(edu.endDate) : "Present"}{" "}
                    {edu.grade && `• GPA: ${edu.grade}`}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills?.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-2" style={textColor}>
              Skills
            </h2>
            <div className="flex flex-wrap gap-1">
              {data.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 text-xs text-white rounded-full"
                  style={bgAccent}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {data.certifications?.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-2" style={textColor}>
              Certifications
            </h2>
            <div className="space-y-3">
              {data.certifications.map((cert, i) => (
                <div
                  key={`cert-${i}`}
                  className="pl-4 border-l-4"
                  style={borderColor}
                >
                  <h3 className="font-semibold">{cert.title}</h3>
                  <p className="text-gray-700 font-medium text-sm">
                    {cert.issuer}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    {formatDate(cert.date)}
                    {cert.url && (
                      <>
                        <span>•</span>
                        <a href={cert.url} target="_blank" rel="noreferrer">
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

        {/* Languages */}
        {data.languages?.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-2" style={textColor}>
              Languages
            </h2>
            <div className="flex flex-wrap gap-1">
              {data.languages.map((lang) => (
                <span
                  key={lang}
                  className="px-2 py-0.5 text-xs text-white rounded-full"
                  style={bgAccent}
                >
                  {lang}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

import {
  extractUsername,
  formatDate,
} from "@/app/(general)/(protected)/resume/_templates/utils";
import { ResumeSchemaType } from "@/app/(general)/(protected)/resume/resume-schema";
import {
  Document,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";

const styles = (accentColor: string) =>
  StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "white",
      padding: 24,
    },
    header: {
      backgroundColor: accentColor,
      padding: 20,
    },
    headerText: {
      fontSize: 24,
      fontWeight: "bold",
      color: "white",
    },
    subHeader: {
      fontSize: 14,
      fontWeight: "light",
      color: "white",
      marginTop: 6,
    },
    contactInfo: {
      fontSize: 10,
      color: "white",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: "2mm 5mm",
      marginTop: 13,
    },
    sectionHeader: {
      fontSize: 16,
      fontWeight: "bold",
      borderBottom: `2px solid ${accentColor}`,
      marginBottom: 8,
      paddingBottom: 4,
      color: accentColor,
    },
    sectionContent: {
      fontSize: 10,
      color: "#333",
    },
    techTag1: {
      padding: "2px 6px",
      fontSize: 10,
      color: "white",
      backgroundColor: accentColor,
      borderRadius: 12,
      marginRight: 4,
      marginBottom: 4,
    },
    techTag2: {
      padding: "2px 6px",
      fontSize: 10,
      color: accentColor,
      backgroundColor: "white",
      border: `1px solid ${accentColor}`,
      borderRadius: 12,
      marginRight: 4,
      marginBottom: 4,
    },
  });

export function ModernTemplateReactPDF({
  data,
  accentColor,
}: {
  data: Omit<ResumeSchemaType, "accentColor">;
  accentColor: string;
}) {
  const stylesWithColor = styles(accentColor);
  return (
    <Document>
      <Page style={stylesWithColor.page}>
        {/* HEADER */}
        <View style={stylesWithColor.header}>
          <Text style={stylesWithColor.headerText}>
            {data.personalDetails.fullName}
          </Text>
          <Text style={stylesWithColor.subHeader}>
            {data.personalDetails.designation}
          </Text>
          <View style={stylesWithColor.contactInfo}>
            {data.personalDetails.email && (
              <Text>{data.personalDetails.email}</Text>
            )}
            {data.personalDetails.phone && (
              <Text>{data.personalDetails.phone}</Text>
            )}
            {data.personalDetails.location && (
              <Text>{data.personalDetails.location}</Text>
            )}
            {data.socials?.linkedIn && (
              <Text>
                <Link style={{ color: "#fff" }} src={data.socials.linkedIn}>
                  {`linkedin/${extractUsername(data.socials.linkedIn)}`}
                </Link>
              </Text>
            )}
            {data.socials?.github && (
              <Text>
                <Link style={{ color: "#fff" }} src={data.socials.github}>
                  {`github/${extractUsername(data.socials.github)}`}
                </Link>
              </Text>
            )}
            {data.socials?.portfolio && (
              <Text>
                <Link style={{ color: "#fff" }} src={data.socials.portfolio}>
                  {`portfolio/${data.socials.portfolio.replace(/^https?:\/\//, "")}`}
                </Link>
              </Text>
            )}
          </View>
        </View>

        {/* SUMMARY */}
        {data.summary && (
          <View style={{ marginTop: 15 }}>
            <Text style={stylesWithColor.sectionHeader}>
              Professional Summary
            </Text>
            <Text style={stylesWithColor.sectionContent}>{data.summary}</Text>
          </View>
        )}

        {/* EXPERIENCE */}
        {data.experiences && data.experiences.length > 0 && (
          <View style={{ marginTop: 10 }}>
            <Text style={stylesWithColor.sectionHeader}>Experience</Text>
            <View style={{ flexDirection: "column", gap: 10 }}>
              {data.experiences.map((exp, i) => (
                <View style={{ flexDirection: "column", gap: 5 }} key={i}>
                  <View style={stylesWithColor.sectionContent}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ flexDirection: "row", gap: 3 }}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: "bold",
                            color: "#000",
                          }}
                        >
                          {exp.position}
                        </Text>
                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                          {" "}
                          •{" "}
                        </Text>
                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                          {exp.organization}
                        </Text>
                      </View>
                      <Text>
                        {formatDate(exp.startDate)} -{" "}
                        {exp.endDate ? formatDate(exp.endDate) : "Present"}
                      </Text>
                    </View>
                  </View>
                  {exp.description && (
                    <Text style={stylesWithColor.sectionContent}>
                      {exp.description}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* PROJECTS */}
        {data.projects && data.projects.length > 0 && (
          <View style={{ marginTop: 10 }}>
            <Text style={stylesWithColor.sectionHeader}>Projects</Text>
            {data.projects.map((proj, i) => (
              <View key={i} style={{ flexDirection: "column", gap: 5 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ color: "#000", fontSize: 12, fontWeight: "bold" }}
                  >
                    <Text style={{ fontWeight: "bold" }}>{proj.name}</Text>
                  </Text>
                  <View style={{ flexDirection: "row", gap: 5 }}>
                    {proj.githubLink && (
                      <Link
                        style={{ color: "#333", fontSize: 10 }}
                        src={proj.githubLink}
                      >
                        GitHub
                      </Link>
                    )}
                    {proj.liveLink && (
                      <Link
                        style={{ color: "#333", fontSize: 10 }}
                        src={proj.liveLink}
                      >
                        Live
                      </Link>
                    )}
                    <Text style={stylesWithColor.sectionContent}>
                      {formatDate(proj.startDate)} -{" "}
                      {proj.endDate ? formatDate(proj.endDate) : "Present"}
                    </Text>
                  </View>
                </View>
                {proj.description && (
                  <Text style={stylesWithColor.sectionContent}>
                    {proj.description}
                  </Text>
                )}
                {proj.technologies && proj.technologies.length > 0 && (
                  <View style={{ flexDirection: "row" }}>
                    {proj.technologies.map((tech, i) => (
                      <Text key={i} style={stylesWithColor.techTag1}>
                        {tech}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        <View style={{ flexDirection: "row", width: "100%", marginTop: 7 }}>
          {/* EDUCATION */}
          {data.educations && data.educations.length > 0 && (
            <View style={{ flex: 1, paddingRight: 8 }}>
              <Text style={stylesWithColor.sectionHeader}>Education</Text>
              <View style={{ flexDirection: "column", gap: 8 }}>
                {data.educations.map((edu, i) => (
                  <View key={i} style={{ flexDirection: "column", gap: 3 }}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 12,
                        color: "#000",
                      }}
                    >
                      {edu.degree}
                    </Text>
                    {edu.field && (
                      <Text style={stylesWithColor.sectionContent}>
                        {edu.field}
                      </Text>
                    )}
                    <Text style={stylesWithColor.sectionContent}>
                      {edu.institution}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <Text style={stylesWithColor.sectionContent}>
                        {formatDate(edu.startDate)} -{" "}
                        {edu.endDate ? formatDate(edu.endDate) : "Present"}
                      </Text>
                      {edu.grade && (
                        <>
                          <Text style={stylesWithColor.sectionContent}>•</Text>
                          <Text style={stylesWithColor.sectionContent}>
                            GPA: {edu.grade}
                          </Text>
                        </>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* CERTIFICATIONS */}
          {data.certifications && data.certifications.length > 0 && (
            <View style={{ flex: 1, paddingLeft: 8 }}>
              <Text style={stylesWithColor.sectionHeader}>Certifications</Text>
              <View style={{ flexDirection: "column", gap: 8 }}>
                {data.certifications.map((cert, i) => (
                  <View key={i} style={{ flexDirection: "column", gap: 4 }}>
                    <Text style={stylesWithColor.sectionContent}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 12,
                          color: "#000",
                        }}
                      >
                        {cert.title}
                      </Text>
                    </Text>
                    <Text style={stylesWithColor.sectionContent}>
                      {cert.issuer}
                    </Text>
                    <Text style={stylesWithColor.sectionContent}>
                      {formatDate(cert.date)}{" "}
                      {cert.url && (
                        <>
                          <Text style={stylesWithColor.sectionContent}>•</Text>{" "}
                          <Link
                            style={stylesWithColor.sectionContent}
                            src={cert.url}
                          >
                            {cert.url}
                          </Link>
                        </>
                      )}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* SKILLS + LANGUAGES */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
          {data.skills && data.skills.length > 0 && (
            <View style={{ flex: 1, paddingRight: 8 }}>
              <Text style={stylesWithColor.sectionHeader}>Skills</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {data.skills.map((skill, i) => (
                  <Text key={i} style={stylesWithColor.techTag2}>
                    {skill}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {data.languages && data.languages.length > 0 && (
            <View style={{ flex: 1, paddingLeft: 8 }}>
              <Text style={stylesWithColor.sectionHeader}>Languages</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {data.languages.map((lang, i) => (
                  <Text key={i} style={stylesWithColor.techTag2}>
                    {lang}
                  </Text>
                ))}
              </View>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}

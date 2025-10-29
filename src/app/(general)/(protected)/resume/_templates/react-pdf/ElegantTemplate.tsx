import {
  extractUsername,
  formatDate,
} from "@/app/(general)/(protected)/resume/_templates/utils";
import { ResumeSchema } from "@/app/(general)/(protected)/resume/resume-schema";
import {
  Document,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";
import z from "zod";

const styles = (accentColor: string) =>
  StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "white",
      fontFamily: "Helvetica",
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    sidebar: {
      width: "35%",
      backgroundColor: "#f7f7f7",
      padding: 20,
      borderRight: `2px solid ${accentColor}`,
    },
    mainContent: {
      width: "65%",
      padding: 20,
    },
    name: {
      fontSize: 24,
      fontWeight: "bold",
      color: accentColor,
    },
    designation: {
      fontSize: 14,
      fontWeight: "light",
      marginTop: 4,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "bold",
      borderBottom: `1px solid ${accentColor}`,
      color: accentColor,
      paddingBottom: 5,
    },
    textSmall: {
      fontSize: 10,
    },
    textGray: {
      color: "#4f4f4f",
    },
    link: {
      color: accentColor,
      textDecoration: "underline",
    },
    list: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 5,
      marginTop: 5,
    },
    listItem: {
      border: `1px solid ${accentColor}`,
      borderRadius: 15,
      paddingHorizontal: 5,
      paddingVertical: 2,
      color: accentColor,
      fontSize: 10,
    },
    experience: {
      // marginBottom: 15,
    },
    experienceItem: {
      // marginBottom: 10,
    },
    experienceHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    experiencePosition: {
      fontWeight: "bold",
    },
    experienceOrg: {
      color: "#4f4f4f",
    },
    projectTechnologies: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 5,
    },
    projectTechItem: {
      backgroundColor: accentColor,
      color: "white",
      paddingHorizontal: 6,
      paddingVertical: 2,
      fontSize: 9,
      borderRadius: 10,
    },
  });

export function ElegantTemplateReactPDF({
  data,
  accentColor,
}: {
  data: z.infer<typeof ResumeSchema>;
  accentColor: string;
}) {
  const stylesObj = styles(accentColor);

  return (
    <Document>
      <Page size="A4" style={stylesObj.page}>
        {/* Left Sidebar */}
        <View style={stylesObj.sidebar}>
          {/* Name */}
          <Text style={stylesObj.name}>{data.personalDetails.fullName}</Text>
          <Text style={stylesObj.designation}>
            {data.personalDetails.designation}
          </Text>

          <View style={{ marginTop: 15, flexDirection: "column", gap: 5 }}>
            {data.personalDetails.location && (
              <Text style={[stylesObj.textSmall, stylesObj.textGray]}>
                {data.personalDetails.location}
              </Text>
            )}
            {data.personalDetails.email && (
              <Text style={[stylesObj.textSmall, stylesObj.textGray]}>
                {data.personalDetails.email}
              </Text>
            )}
            {data.personalDetails.phone && (
              <Text style={[stylesObj.textSmall, stylesObj.textGray]}>
                {data.personalDetails.phone}
              </Text>
            )}

            {/* Social Links */}
            {data.socials?.linkedIn && (
              <Text style={[stylesObj.textSmall]}>
                <Link src={data.socials.linkedIn} style={[stylesObj.textGray]}>
                  {`linkedin/${extractUsername(data.socials.linkedIn)}`}
                </Link>
              </Text>
            )}
            {data.socials?.github && (
              <Text style={[stylesObj.textSmall]}>
                <Link src={data.socials.github} style={[stylesObj.textGray]}>
                  {`github/${extractUsername(data.socials.github)}`}
                </Link>
              </Text>
            )}
            {data.socials?.portfolio && (
              <Text style={[stylesObj.textSmall]}>
                <Link src={data.socials.portfolio} style={[stylesObj.textGray]}>
                  {`portfolio/${data.socials.portfolio.replace(/^https?:\/\//, "")}`}
                </Link>
              </Text>
            )}
          </View>

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <View style={{ marginTop: 20 }}>
              <Text style={stylesObj.sectionTitle}>Skills</Text>
              <View style={stylesObj.list}>
                {data.skills.map((s, i) => (
                  <Text key={i} style={stylesObj.listItem}>
                    {s}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <View style={{ marginTop: 20 }}>
              <Text style={stylesObj.sectionTitle}>Languages</Text>
              <View style={stylesObj.list}>
                {data.languages.map((lang) => (
                  <Text key={lang} style={stylesObj.listItem}>
                    {lang}
                  </Text>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Main Content */}
        <View style={stylesObj.mainContent}>
          {/* Summary */}
          {data.summary && (
            <View>
              <Text style={stylesObj.sectionTitle}>Professional Summary</Text>
              <Text
                style={[
                  stylesObj.textSmall,
                  stylesObj.textGray,
                  { marginTop: 5 },
                ]}
              >
                {data.summary}
              </Text>
            </View>
          )}

          {/* Experience */}
          {data.experiences && data.experiences.length > 0 && (
            <View style={{ marginTop: 10 }}>
              <Text style={stylesObj.sectionTitle}>Experience</Text>
              <View style={{ marginTop: 5, flexDirection: "column", gap: 8 }}>
                {data.experiences.map((exp, i) => (
                  <View key={i} style={stylesObj.experience}>
                    <View style={stylesObj.experienceHeader}>
                      <View>
                        <Text
                          style={[
                            stylesObj.experiencePosition,
                            { fontSize: 12 },
                          ]}
                        >
                          {exp.position}
                        </Text>
                        <Text
                          style={[
                            stylesObj.experienceOrg,
                            { fontSize: 12, marginTop: 3 },
                          ]}
                        >
                          {exp.organization}
                        </Text>
                      </View>
                      <Text style={[stylesObj.textGray, stylesObj.textSmall]}>
                        {formatDate(exp.startDate)} -{" "}
                        {exp.endDate ? formatDate(exp.endDate) : "Present"}
                      </Text>
                    </View>
                    {exp.description && (
                      <Text
                        style={[
                          stylesObj.textSmall,
                          stylesObj.textGray,
                          { marginTop: 5 },
                        ]}
                      >
                        {exp.description}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <View style={{ marginTop: 10 }}>
              <Text style={stylesObj.sectionTitle}>Projects</Text>
              <View style={{ flexDirection: "column", gap: 12, marginTop: 8 }}>
                {data.projects.map((proj, i) => (
                  <View key={i} style={{ flexDirection: "column", gap: 5 }}>
                    <View style={stylesObj.experienceHeader}>
                      <View
                        style={{
                          flexDirection: "row",
                          width: "100%",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={[
                            stylesObj.experiencePosition,
                            { fontSize: 12 },
                          ]}
                        >
                          {proj.name}
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            gap: 5,
                            alignItems: "center",
                          }}
                        >
                          {proj.githubLink && (
                            <Link
                              style={[stylesObj.textSmall, stylesObj.textGray]}
                              src={proj.githubLink}
                            >
                              Github
                            </Link>
                          )}
                          {proj.liveLink && (
                            <Link
                              style={[stylesObj.textSmall, stylesObj.textGray]}
                              src={proj.liveLink}
                            >
                              Live
                            </Link>
                          )}
                          <Text
                            style={[stylesObj.textGray, stylesObj.textSmall]}
                          >
                            {formatDate(proj.startDate)} -{" "}
                            {proj.endDate
                              ? formatDate(proj.endDate)
                              : "Present"}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <Text style={[stylesObj.textSmall, stylesObj.textGray]}>
                      {proj.description}
                    </Text>
                    <View style={stylesObj.projectTechnologies}>
                      {proj.technologies.map((tech) => (
                        <Text key={tech} style={stylesObj.projectTechItem}>
                          {tech}
                        </Text>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Education */}
          {data.educations && data.educations.length > 0 && (
            <View style={{ marginTop: 12 }}>
              <Text style={stylesObj.sectionTitle}>Education</Text>
              <View style={{ flexDirection: "column", gap: 12, marginTop: 8 }}>
                {data.educations.map((edu, i) => (
                  <View key={i} style={{ flexDirection: "column", gap: 3 }}>
                    <Text
                      style={[stylesObj.experiencePosition, { fontSize: 12 }]}
                    >
                      {edu.degree}
                    </Text>
                    <Text style={[stylesObj.textSmall, stylesObj.textGray]}>
                      {edu.institution}
                    </Text>
                    <Text style={[stylesObj.textSmall, stylesObj.textGray]}>
                      {formatDate(edu.startDate)} -{" "}
                      {edu.endDate ? formatDate(edu.endDate) : "Present"}{" "}
                      {edu.grade && `• GPA: ${edu.grade}`}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Certifications */}
          {data.certifications && data.certifications.length > 0 && (
            <View style={{ marginTop: 10, marginBottom: -10 }}>
              <Text style={stylesObj.sectionTitle}>Certifications</Text>
              <View style={{ marginTop: 8, flexDirection: "column", gap: 5 }}>
                {data.certifications.map((cert, i) => (
                  <View key={i} style={{ flexDirection: "column", gap: 3 }}>
                    <Text
                      style={[stylesObj.experiencePosition, { fontSize: 12 }]}
                    >
                      {cert.title}
                    </Text>
                    <Text style={[stylesObj.textSmall, stylesObj.textGray]}>
                      {cert.issuer}
                    </Text>
                    <Text style={[stylesObj.textSmall, stylesObj.textGray]}>
                      {formatDate(cert.date)}{" "}
                      {cert.url && (
                        <>
                          <Text> • </Text>

                          <Link style={stylesObj.textGray} wrap>
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
      </Page>
    </Document>
  );
}

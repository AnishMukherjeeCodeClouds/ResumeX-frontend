import {
  GithubIcon,
  IconWithText,
  LinkedinIcon,
  LinkIcon,
  LocationIcon,
  MailIcon,
  PhoneIcon,
  WebIcon,
} from "@/app/(general)/(protected)/resume/_templates/icons";
import {
  extractUsername,
  formatDate,
} from "@/app/(general)/(protected)/resume/_templates/utils";
import { ResumeSchemaType } from "@/app/(general)/(protected)/resume/resume-schema"; // Create styles for PDF
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
    container: {
      width: "210mm",
      minHeight: "297mm",
      margin: "0 auto",
      padding: "8mm",
      fontFamily: "Helvetica",
      backgroundColor: "white",
      boxShadow: "0 4mm 4mm rgba(0, 0, 0, 0.1)",
    },
    header: {
      marginBottom: 12,
    },
    name: {
      fontSize: 24,
      fontWeight: "light",
      color: accentColor,
    },
    designation: {
      marginTop: 3,
      fontSize: 12,
      fontWeight: "light",
    },
    contactInfo: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      fontSize: 10,
      color: "#555",
      flexWrap: "wrap",
      marginTop: 8,
      marginBottom: 8,
    },
    section: {
      marginTop: -8,
      marginBottom: 10,
      flexDirection: "column",
      gap: 8,
    },
    sectionHeading: {
      fontSize: 16,
      fontWeight: "bold",
      color: accentColor,
    },
    text: {
      fontSize: 10,
      color: "#555",
    },
    experienceItem: {
      borderLeft: `1mm solid ${accentColor}`,
      paddingLeft: 12,
      flexDirection: "column",
      gap: 5,
    },
    projectItem: {
      borderLeft: `1mm solid ${accentColor}`,
      paddingLeft: 12,
      flexDirection: "column",
      gap: 5,
    },
    educationItem: {
      borderLeft: `1mm solid ${accentColor}`,
      paddingLeft: 12,
      flexDirection: "column",
      gap: 5,
    },
    badge: {
      backgroundColor: accentColor,
      color: "white",
      fontSize: 10,
      padding: "1mm 3mm",
      borderRadius: 50,
      // padding: "2mm 4mm",
      // borderRadius: 50,
      // marginRight: 6,
      // marginBottom: 6,
    },
    dateText: {
      fontSize: 10,
      color: "#777",
    },
  });

export function ClassicTemplateReactPDF({
  data,
  accentColor,
}: {
  data: Omit<ResumeSchemaType, "accentColor">;
  accentColor: string;
}) {
  const stylesWithColor = styles(accentColor);

  return (
    <Document>
      <Page size="A4">
        <View style={stylesWithColor.container}>
          {/* HEADER */}
          <View style={stylesWithColor.header}>
            <Text style={stylesWithColor.name}>
              {data.personalDetails.fullName || "Your Name"}
            </Text>
            <Text style={stylesWithColor.designation}>
              {data.personalDetails.designation}
            </Text>

            {/* Contact Info */}
            <View style={stylesWithColor.contactInfo}>
              {data.personalDetails.email && (
                <IconWithText
                  icon={<MailIcon />}
                  text={
                    <Text style={stylesWithColor.text}>
                      {data.personalDetails.email}
                    </Text>
                  }
                />
              )}
              {data.personalDetails.phone && (
                <IconWithText
                  icon={<PhoneIcon />}
                  text={
                    <Text style={stylesWithColor.text}>
                      {data.personalDetails.phone}
                    </Text>
                  }
                />
              )}
              {data.personalDetails.location && (
                <IconWithText
                  icon={<LocationIcon />}
                  text={
                    <Text style={stylesWithColor.text}>
                      {data.personalDetails.location}
                    </Text>
                  }
                />
              )}
              {data.socials?.linkedIn && (
                <Link
                  src={data.socials.linkedIn}
                  style={[stylesWithColor.text, { textDecoration: "none" }]}
                >
                  <IconWithText
                    icon={<LinkedinIcon />}
                    text={
                      <Text style={stylesWithColor.text}>
                        {extractUsername(data.socials.linkedIn)}
                      </Text>
                    }
                  />
                </Link>
              )}
              {data.socials?.github && (
                <Link
                  src={data.socials.github}
                  style={[stylesWithColor.text, { textDecoration: "none" }]}
                >
                  <IconWithText
                    icon={<GithubIcon />}
                    text={
                      <Text style={stylesWithColor.text}>
                        {extractUsername(data.socials.github)}
                      </Text>
                    }
                  />
                </Link>
              )}
              {data.socials?.portfolio && (
                <Link
                  src={data.socials.portfolio}
                  style={[stylesWithColor.text, { textDecoration: "none" }]}
                >
                  <IconWithText
                    icon={<WebIcon />}
                    text={
                      <Text style={stylesWithColor.text}>
                        {data.socials.portfolio.replace(/^https?:\/\//, "")}
                      </Text>
                    }
                  />
                </Link>
                // <Text style={stylesWithColor.text}>
                //   {data.socials.portfolio.replace(/^https?:\/\//, "")}
                // </Text>
              )}
            </View>
          </View>

          {/* SUMMARY */}
          {data.summary && (
            <View style={stylesWithColor.section}>
              <Text style={stylesWithColor.sectionHeading}>
                Professional Summary
              </Text>
              <Text
                style={{
                  ...stylesWithColor.text,
                  marginBottom: 10,
                  fontWeight: "light",
                }}
              >
                {data.summary}
              </Text>
            </View>
          )}

          {/* EXPERIENCE */}
          {data.experiences?.length > 0 && (
            <View style={stylesWithColor.section}>
              <Text style={stylesWithColor.sectionHeading}>Experience</Text>
              {data.experiences.map((exp, i) => (
                <View key={`exp-${i}`} style={stylesWithColor.experienceItem}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 5,
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          ...stylesWithColor.text,
                          fontWeight: "bold",
                          fontSize: 12,
                          color: "#000",
                        }}
                      >
                        {exp.position}
                      </Text>
                      <Text style={{ ...stylesWithColor.text, fontSize: 12 }}>
                        •
                      </Text>
                      <Text
                        style={{
                          ...stylesWithColor.text,
                          fontWeight: "bold",
                          fontSize: 12,
                        }}
                      >
                        {exp.organization}
                      </Text>
                    </View>
                    <Text style={stylesWithColor.dateText}>
                      {formatDate(exp.startDate)} –{" "}
                      {exp.endDate ? formatDate(exp.endDate) : "Present"}
                    </Text>
                  </View>
                  {exp.description && (
                    <Text style={stylesWithColor.text}>{exp.description}</Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* PROJECTS */}
          {data.projects?.length > 0 && (
            <View style={{ ...stylesWithColor.section, marginTop: 3 }}>
              <Text style={stylesWithColor.sectionHeading}>Projects</Text>
              {data.projects.map((proj, i) => (
                <View key={`proj-${i}`} style={stylesWithColor.projectItem}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        ...stylesWithColor.text,
                        fontWeight: "bold",
                        color: "#000",
                        fontSize: 12,
                      }}
                    >
                      {proj.name}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 6,
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 6,
                          alignItems: "center",
                        }}
                      >
                        {proj.githubLink && (
                          <Link
                            src={proj.githubLink}
                            style={stylesWithColor.text}
                          >
                            <GithubIcon />
                            {/*Github*/}
                          </Link>
                        )}
                        {proj.liveLink && (
                          <Link
                            src={proj.liveLink}
                            style={stylesWithColor.text}
                          >
                            <LinkIcon />
                            {/*Live*/}
                          </Link>
                        )}
                      </View>
                      <Text style={stylesWithColor.dateText}>
                        {formatDate(proj.startDate)} –{" "}
                        {proj.endDate ? formatDate(proj.endDate) : "Present"}
                      </Text>
                    </View>
                  </View>
                  {proj.description && (
                    <Text style={stylesWithColor.text}>{proj.description}</Text>
                  )}
                  {proj.technologies?.length > 0 && (
                    <View style={{ flexDirection: "row", gap: 3 }}>
                      {proj.technologies.map((tech, idx) => (
                        <Text key={idx} style={stylesWithColor.badge}>
                          {tech}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          <View
            style={{ flexDirection: "row", width: "100%", flexWrap: "wrap" }}
          >
            {/* Education */}
            {data.educations?.length > 0 && (
              <View style={{ flex: 1, paddingRight: 8 }}>
                <Text
                  style={[stylesWithColor.sectionHeading, { marginBottom: 8 }]}
                >
                  Education
                </Text>

                <View style={{ flexDirection: "column", gap: 8 }}>
                  {data.educations.map((edu, i) => (
                    <View
                      key={`edu-${i}`}
                      style={stylesWithColor.educationItem}
                    >
                      <Text
                        style={{
                          ...stylesWithColor.text,
                          fontWeight: "bold",
                          fontSize: 12,
                          color: "#000",
                        }}
                      >
                        {edu.degree} {edu.field && `in ${edu.field}`}
                      </Text>
                      <Text
                        style={{ ...stylesWithColor.text, fontWeight: "bold" }}
                      >
                        {edu.institution}
                      </Text>
                      <Text style={stylesWithColor.dateText}>
                        {formatDate(edu.startDate)} –{" "}
                        {edu.endDate ? formatDate(edu.endDate) : "Present"}
                        {edu.grade && ` • GPA: ${edu.grade}`}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Skills */}
            {data.skills?.length > 0 && (
              <View style={{ flex: 1, paddingLeft: 8 }}>
                <Text
                  style={[stylesWithColor.sectionHeading, { marginBottom: 8 }]}
                >
                  Skills
                </Text>

                <View
                  style={{ flexDirection: "row", flexWrap: "wrap", gap: 3 }}
                >
                  {data.skills.map((skill, i) => (
                    <Text key={i} style={stylesWithColor.badge}>
                      {skill}
                    </Text>
                  ))}
                </View>
              </View>
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              flexWrap: "wrap",
              marginTop: 8,
            }}
          >
            {data.certifications?.length > 0 && (
              <View style={{ flex: 1, paddingRight: 8 }}>
                <Text
                  style={[stylesWithColor.sectionHeading, { marginBottom: 8 }]}
                >
                  Certifications
                </Text>
                <View style={{ flexDirection: "column", gap: 8 }}>
                  {data.certifications.map((cert, i) => (
                    <View
                      key={`cert-${i}`}
                      style={stylesWithColor.educationItem}
                    >
                      <Text
                        style={[
                          stylesWithColor.text,
                          { fontWeight: "bold", fontSize: 12, color: "#000" },
                        ]}
                      >
                        {cert.title}
                      </Text>
                      <Text
                        style={[stylesWithColor.text, { fontWeight: "bold" }]}
                      >
                        {cert.issuer}
                      </Text>
                      <View
                        style={[
                          stylesWithColor.dateText,
                          {
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 3,
                          },
                        ]}
                      >
                        <Text>{formatDate(cert.date)}</Text>
                        {cert.url && (
                          <>
                            <Text>•</Text>
                            <Link
                              src={cert.url}
                              style={[
                                stylesWithColor.text,
                                { textDecoration: "none" },
                              ]}
                            >
                              <LinkIcon />
                              {/*{cert.url}*/}
                            </Link>
                          </>
                        )}
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}
            {/* Languages */}
            {data.languages?.length > 0 && (
              <View style={{ flex: 1, paddingLeft: 8 }}>
                <Text
                  style={[stylesWithColor.sectionHeading, { marginBottom: 8 }]}
                >
                  Languages
                </Text>
                <View
                  style={{ flexDirection: "row", flexWrap: "wrap", gap: 3 }}
                >
                  {data.languages.map((lang, i) => (
                    <Text key={i} style={stylesWithColor.badge}>
                      {lang}
                    </Text>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}

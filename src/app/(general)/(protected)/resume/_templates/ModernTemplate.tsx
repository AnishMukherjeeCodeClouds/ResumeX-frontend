// import {
//   DateString,
//   ResumeDataType,
// } from "@/app/(general)/(protected)/resume/_templates/resume-data";
// import {
//   Document,
//   Link,
//   Page,
//   StyleSheet,
//   Text,
//   View,
// } from "@react-pdf/renderer";
// import React from "react";
//
// // Optional: Register a font
// // Font.register({ family: 'Roboto', src: '/fonts/Roboto-Regular.ttf' });
//
// const styles = StyleSheet.create({
//   page: {
//     padding: 40,
//     fontSize: 11,
//     fontFamily: "Helvetica",
//     color: "#333",
//     lineHeight: 1.4,
//   },
//   header: {
//     paddingBottom: 20,
//     marginBottom: 10,
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: "light",
//     marginBottom: 4,
//   },
//   sectionTitle: (color: string) => ({
//     fontSize: 16,
//     fontWeight: "light",
//     marginBottom: 8,
//     paddingBottom: 2,
//     borderBottomWidth: 1,
//     borderBottomColor: color,
//     color: "#333",
//   }),
//   contactRow: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     marginBottom: 8,
//   },
//   contactItem: {
//     marginRight: 12,
//     fontSize: 10,
//   },
//   experienceItem: {
//     marginBottom: 8,
//     paddingLeft: 8,
//     borderLeftWidth: 2,
//     borderLeftColor: "#000",
//   },
//   experienceTitle: {
//     fontSize: 12,
//     fontWeight: "bold",
//   },
//   experienceCompany: (color: string) => ({
//     fontSize: 11,
//     color: color,
//     fontWeight: "bold",
//   }),
//   dateBox: {
//     fontSize: 10,
//     color: "#666",
//     backgroundColor: "#eee",
//     padding: 2,
//     borderRadius: 2,
//   },
//   skillTag: (color: string) => ({
//     fontSize: 10,
//     color: "#fff",
//     backgroundColor: color,
//     paddingHorizontal: 4,
//     paddingVertical: 2,
//     borderRadius: 2,
//     marginRight: 4,
//     marginBottom: 4,
//   }),
//   link: {
//     fontSize: 10,
//     color: "#0077cc",
//   },
// });
//
// const formatDate = (dateStr?: DateString) => {
//   if (!dateStr) return "";
//   const [year, month] = dateStr.split("-");
//   return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString(
//     "en-US",
//     {
//       year: "numeric",
//       month: "short",
//     },
//   );
// };
//
// interface ModernPDFProps {
//   data: ResumeDataType;
//   accentColor: string;
// }
//
// const ModernPDF: React.FC<ModernPDFProps> = ({ data, accentColor }) => {
//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         {/* Header */}
//         <View style={styles.header}>
//           <Text style={styles.name}>
//             {data.personalDetails.fullName || "Your Name"}
//           </Text>
//           <View style={styles.contactRow}>
//             {data.personalDetails.email && (
//               <Text style={styles.contactItem}>
//                 {data.personalDetails.email}
//               </Text>
//             )}
//             {data.personalDetails.phone && (
//               <Text style={styles.contactItem}>
//                 {data.personalDetails.phone}
//               </Text>
//             )}
//             {data.personalDetails.location && (
//               <Text style={styles.contactItem}>
//                 {data.personalDetails.location}
//               </Text>
//             )}
//             {data.socials?.linkedin && (
//               <Link src={data.socials.linkedin} style={styles.link}>
//                 {data.socials.linkedin.replace(/^https?:\/\/(www\.)?/, "")}
//               </Link>
//             )}
//             {data.socials?.portfolio && (
//               <Link src={data.socials.portfolio} style={styles.link}>
//                 {data.socials.portfolio.replace(/^https?:\/\//, "")}
//               </Link>
//             )}
//           </View>
//         </View>
//
//         {/* Summary */}
//         {data.summary && (
//           <View style={{ marginBottom: 12 }}>
//             <Text style={styles.sectionTitle(accentColor)}>
//               Professional Summary
//             </Text>
//             <Text>{data.summary}</Text>
//           </View>
//         )}
//
//         {/* Experience */}
//         {data.experience && data.experience.length > 0 && (
//           <View style={{ marginBottom: 12 }}>
//             <Text style={styles.sectionTitle(accentColor)}>Experience</Text>
//             {data.experience.map((exp) => (
//               <View
//                 key={exp.id}
//                 style={[
//                   styles.experienceItem,
//                   { borderLeftColor: accentColor },
//                 ]}
//               >
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <View>
//                     <Text style={styles.experienceTitle}>{exp.position}</Text>
//                     <Text style={styles.experienceCompany(accentColor)}>
//                       {exp.organization}
//                     </Text>
//                   </View>
//                   <Text style={styles.dateBox}>
//                     {formatDate(exp.startDate)} -{" "}
//                     {exp.endDate ? formatDate(exp.endDate) : "Present"}
//                   </Text>
//                 </View>
//                 {exp.description && (
//                   <Text style={{ marginTop: 4 }}>{exp.description}</Text>
//                 )}
//               </View>
//             ))}
//           </View>
//         )}
//
//         {/* Projects */}
//         {data.projects && data.projects.length > 0 && (
//           <View style={{ marginBottom: 12 }}>
//             <Text style={styles.sectionTitle(accentColor)}>Projects</Text>
//             {data.projects.map((proj) => (
//               <View
//                 key={proj.id}
//                 style={[
//                   styles.experienceItem,
//                   { borderLeftColor: accentColor },
//                 ]}
//               >
//                 <Text style={styles.experienceTitle}>{proj.name}</Text>
//                 {proj.description && (
//                   <Text style={{ marginTop: 2 }}>{proj.description}</Text>
//                 )}
//               </View>
//             ))}
//           </View>
//         )}
//
//         <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
//           {/* Education */}
//           {data.education && data.education.length > 0 && (
//             <View style={{ flex: 1, marginRight: 8 }}>
//               <Text style={styles.sectionTitle(accentColor)}>Education</Text>
//               {data.education.map((edu) => (
//                 <View key={edu.id} style={{ marginBottom: 6 }}>
//                   <Text style={styles.experienceTitle}>
//                     {edu.degree} {edu.field && `in ${edu.field}`}
//                   </Text>
//                   <Text style={{ color: accentColor }}>{edu.institution}</Text>
//                   <Text style={{ fontSize: 10, color: "#666" }}>
//                     {formatDate(edu.startDate)} -{" "}
//                     {edu.endDate ? formatDate(edu.endDate) : "Present"}{" "}
//                     {edu.grade ? `• GPA: ${edu.grade}` : ""}
//                   </Text>
//                 </View>
//               ))}
//             </View>
//           )}
//
//           {/* Skills */}
//           {data.skills && data.skills.length > 0 && (
//             <View style={{ flex: 1 }}>
//               <Text style={styles.sectionTitle(accentColor)}>Skills</Text>
//               <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
//                 {data.skills.map((skill) => (
//                   <Text key={skill} style={styles.skillTag(accentColor)}>
//                     {skill}
//                   </Text>
//                 ))}
//               </View>
//             </View>
//           )}
//         </View>
//       </Page>
//     </Document>
//   );
// };
//
// export default ModernPDF;

// import {
//   DateString,
//   ResumeDataType,
// } from "@/app/(general)/(protected)/resume/_templates/resume-data";
// import { Globe, Linkedin, Mail, MapPin, Phone } from "lucide-react";
// import { Ref } from "react";
//
// const ModernTemplate = ({
//   data,
//   accentColor,
//   ref,
// }: {
//   data: ResumeDataType;
//   accentColor: string;
//   ref?: Ref<HTMLDivElement>;
// }) => {
//   const formatDate = (dateStr?: DateString) => {
//     if (!dateStr) return "";
//     const [year, month] = dateStr.split("-");
//     return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString(
//       "en-US",
//       {
//         year: "numeric",
//         month: "short",
//       },
//     );
//   };
//
//   return (
//     <div ref={ref} className="max-w-4xl mx-auto bg-white text-gray-800">
//       {/* Header */}
//       <header
//         className="p-8 text-white"
//         style={{ backgroundColor: accentColor }}
//       >
//         <h1 className="text-4xl font-light mb-3">
//           {data.personalDetails.fullName || "Your Name"}
//         </h1>
//
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
//           {data.personalDetails.email && (
//             <div className="flex items-center gap-2">
//               <Mail className="size-4" />
//               <span>{data.personalDetails.email}</span>
//             </div>
//           )}
//           {data.personalDetails.phone && (
//             <div className="flex items-center gap-2">
//               <Phone className="size-4" />
//               <span>{data.personalDetails.phone}</span>
//             </div>
//           )}
//           {data.personalDetails.location && (
//             <div className="flex items-center gap-2">
//               <MapPin className="size-4" />
//               <span>{data.personalDetails.location}</span>
//             </div>
//           )}
//           {data.socials?.linkedin && (
//             <a
//               target="_blank"
//               rel="noreferrer"
//               href={data.socials.linkedin}
//               className="flex items-center gap-2"
//             >
//               <Linkedin className="size-4" />
//               <span className="break-all text-xs">
//                 {data.socials.linkedin.replace(/^https?:\/\/(www\.)?/, "")}
//               </span>
//             </a>
//           )}
//           {data.socials?.portfolio && (
//             <a
//               target="_blank"
//               rel="noreferrer"
//               href={data.socials.portfolio}
//               className="flex items-center gap-2"
//             >
//               <Globe className="size-4" />
//               <span className="break-all text-xs">
//                 {data.socials.portfolio.replace(/^https?:\/\//, "")}
//               </span>
//             </a>
//           )}
//         </div>
//       </header>
//
//       <div className="p-8">
//         {/* Professional Summary */}
//         {data.summary && (
//           <section className="mb-8">
//             <h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
//               Professional Summary
//             </h2>
//             <p className="text-gray-700">{data.summary}</p>
//           </section>
//         )}
//
//         {/* Experience */}
//         {data.experience && data.experience.length > 0 && (
//           <section className="mb-8">
//             <h2 className="text-2xl font-light mb-6 pb-2 border-b border-gray-200">
//               Experience
//             </h2>
//
//             <div className="space-y-6">
//               {data.experience.map((exp) => (
//                 <div
//                   key={exp.id}
//                   className="relative pl-6 border-l border-gray-200"
//                   style={{ borderLeftColor: accentColor }}
//                 >
//                   <div className="flex justify-between items-start mb-2">
//                     <div>
//                       <h3 className="text-xl font-medium text-gray-900">
//                         {exp.position}
//                       </h3>
//                       <p className="font-medium" style={{ color: accentColor }}>
//                         {exp.organization}
//                       </p>
//                     </div>
//                     <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
//                       {formatDate(exp.startDate)} -{" "}
//                       {exp.endDate ? formatDate(exp.endDate) : "Present"}
//                     </div>
//                   </div>
//                   {exp.description && (
//                     <div className="text-gray-700 leading-relaxed mt-3 whitespace-pre-line">
//                       {exp.description}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}
//
//         {/* Projects */}
//         {data.projects && data.projects.length > 0 && (
//           <section className="mb-8">
//             <h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
//               Projects
//             </h2>
//
//             <div className="space-y-6">
//               {data.projects.map((proj) => (
//                 <div
//                   key={proj.id}
//                   className="relative pl-6 border-l border-gray-200"
//                   style={{ borderLeftColor: accentColor }}
//                 >
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="text-lg font-medium text-gray-900">
//                         {proj.name}
//                       </h3>
//                     </div>
//                   </div>
//                   {proj.description && (
//                     <div className="text-gray-700 leading-relaxed text-sm mt-3">
//                       {proj.description}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}
//
//         <div className="grid sm:grid-cols-2 gap-8">
//           {/* Education */}
//           {data.education && data.education.length > 0 && (
//             <section>
//               <h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
//                 Education
//               </h2>
//
//               <div className="space-y-4">
//                 {data.education.map((edu) => (
//                   <div key={edu.id}>
//                     <h3 className="font-semibold text-gray-900">
//                       {edu.degree} {edu.field && `in ${edu.field}`}
//                     </h3>
//                     <p style={{ color: accentColor }}>{edu.institution}</p>
//                     <div className="flex justify-between items-center text-sm text-gray-600">
//                       <span>
//                         {formatDate(edu.startDate)} -{" "}
//                         {edu.endDate ? formatDate(edu.endDate) : "Present"}
//                       </span>
//                       {edu.grade && <span>GPA: {edu.grade}</span>}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </section>
//           )}
//
//           {/* Skills */}
//           {data.skills && data.skills.length > 0 && (
//             <section>
//               <h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
//                 Skills
//               </h2>
//
//               <div className="flex flex-wrap gap-2">
//                 {data.skills.map((skill) => (
//                   <span
//                     key={skill}
//                     className="px-3 py-1 text-sm text-white rounded-full"
//                     style={{ backgroundColor: accentColor }}
//                   >
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             </section>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default ModernTemplate;

import { ResumeDataType } from "@/app/(general)/(protected)/resume/_templates/resume-data-type";

interface ModernTemplateHTMLProps {
  data: ResumeDataType;
  accentColor: string;
}

// export const ModernTemplateHTML: React.FC<ModernTemplateHTMLProps> = ({
//   data,
//   accentColor,
// }) => {
//   return (
//     <div className="max-w-4xl mx-auto bg-white text-gray-800 shadow-lg p-8 font-sans">
//       {/* Header */}
//       <header className="mb-6">
//         <h1 className="text-4xl font-light mb-3" style={{ color: accentColor }}>
//           {data.personalDetails.fullName || "Your Name"}
//         </h1>
//         <div className="flex flex-wrap gap-4 text-sm text-gray-600">
//           {data.personalDetails.email && (
//             <div className="flex items-center gap-1">
//               <Mail className="size-4" />
//               {data.personalDetails.email}
//             </div>
//           )}
//           {data.personalDetails.phone && (
//             <div className="flex items-center gap-1">
//               <Phone className="size-4" />
//               {data.personalDetails.phone}
//             </div>
//           )}
//           {data.personalDetails.location && (
//             <div className="flex items-center gap-1">
//               <MapPin className="size-4" />
//               {data.personalDetails.location}
//             </div>
//           )}
//           {data.socials?.linkedin && (
//             <a
//               target="_blank"
//               rel="noreferrer"
//               href={data.socials.linkedin}
//               className="flex items-center gap-1"
//             >
//               <Linkedin className="size-4" />
//               {data.socials.linkedin.replace(/^https?:\/\/(www\.)?/, "")}
//             </a>
//           )}
//           {data.socials?.portfolio && (
//             <a
//               target="_blank"
//               rel="noreferrer"
//               href={data.socials.portfolio}
//               className="flex items-center gap-1"
//             >
//               <Globe className="size-4" />
//               {data.socials.portfolio.replace(/^https?:\/\//, "")}
//             </a>
//           )}
//         </div>
//       </header>
//
//       {/* Summary */}
//       {data.summary && (
//         <section className="mb-6">
//           <h2
//             className="text-xl font-semibold mb-2"
//             style={{ color: accentColor }}
//           >
//             Professional Summary
//           </h2>
//           <p>{data.summary}</p>
//         </section>
//       )}
//
//       {/* Experience */}
//       {data.experience?.length > 0 && (
//         <section className="mb-6">
//           <h2
//             className="text-xl font-semibold mb-2"
//             style={{ color: accentColor }}
//           >
//             Experience
//           </h2>
//           <div className="space-y-4">
//             {data.experience.map((exp) => (
//               <div
//                 key={exp.id}
//                 className="pl-4 border-l-4"
//                 style={{ borderColor: accentColor }}
//               >
//                 <div className="flex justify-between">
//                   <div>
//                     <h3 className="font-semibold">{exp.position}</h3>
//                     <p className="text-gray-700 font-medium">
//                       {exp.organization}
//                     </p>
//                   </div>
//                   <div className="text-sm text-gray-600">
//                     {formatDate(exp.startDate)} -{" "}
//                     {exp.endDate ? formatDate(exp.endDate) : "Present"}
//                   </div>
//                 </div>
//                 {exp.description && <p className="mt-2">{exp.description}</p>}
//               </div>
//             ))}
//           </div>
//         </section>
//       )}
//
//       {/* Projects */}
//       {data.projects?.length > 0 && (
//         <section className="mb-6">
//           <h2
//             className="text-xl font-semibold mb-2"
//             style={{ color: accentColor }}
//           >
//             Projects
//           </h2>
//           <div className="space-y-4">
//             {data.projects.map((proj) => (
//               <div
//                 key={proj.id}
//                 className="pl-4 border-l-4"
//                 style={{ borderColor: accentColor }}
//               >
//                 <h3 className="font-semibold">{proj.name}</h3>
//                 {proj.description && (
//                   <p className="mt-1 text-gray-700">{proj.description}</p>
//                 )}
//               </div>
//             ))}
//           </div>
//         </section>
//       )}
//
//       <div className="grid md:grid-cols-2 gap-6">
//         {/* Education */}
//         {data.education?.length > 0 && (
//           <section>
//             <h2
//               className="text-xl font-semibold mb-2"
//               style={{ color: accentColor }}
//             >
//               Education
//             </h2>
//             <div className="space-y-2">
//               {data.education.map((edu) => (
//                 <div key={edu.id}>
//                   <h3 className="font-semibold">
//                     {edu.degree} {edu.field && `in ${edu.field}`}
//                   </h3>
//                   <p style={{ color: accentColor }}>{edu.institution}</p>
//                   <p className="text-sm text-gray-600">
//                     {formatDate(edu.startDate)} -{" "}
//                     {edu.endDate ? formatDate(edu.endDate) : "Present"}{" "}
//                     {edu.grade && `• GPA: ${edu.grade}`}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}
//
//         {/* Skills */}
//         {data.skills?.length > 0 && (
//           <section>
//             <h2
//               className="text-xl font-semibold mb-2"
//               style={{ color: accentColor }}
//             >
//               Skills
//             </h2>
//             <div className="flex flex-wrap gap-2">
//               {data.skills.map((skill) => (
//                 <span
//                   key={skill}
//                   className="px-3 py-1 text-white rounded-full"
//                   style={{ backgroundColor: accentColor }}
//                 >
//                   {skill}
//                 </span>
//               ))}
//             </div>
//           </section>
//         )}
//       </div>
//     </div>
//   );
// };
//
export const formatDate = (dateStr?: string) => {
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

// const styles = StyleSheet.create({
//   page: {
//     padding: 40,
//     fontSize: 11,
//     fontFamily: "Helvetica",
//     color: "#333",
//     lineHeight: 1.4,
//   },
//   sectionTitle: (color: string) => ({
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 8,
//     color,
//   }),
//   headerName: (color: string) => ({
//     fontSize: 24,
//     fontWeight: "light",
//     marginBottom: 4,
//     color,
//   }),
//   section: { marginBottom: 12 },
//   experienceItem: { marginBottom: 8, paddingLeft: 8, borderLeftWidth: 2 },
//   experienceTitle: { fontSize: 12, fontWeight: "bold" },
//   experienceCompany: (color: string) => ({
//     fontSize: 11,
//     color,
//     fontWeight: "bold",
//   }),
//   dateBox: { fontSize: 10, color: "#666" },
//   skillTag: (color: string) => ({
//     fontSize: 10,
//     color: "#fff",
//     backgroundColor: color,
//     paddingLeft: 8,
//     paddingRight: 8,
//     paddingTop: 5,
//     marginRight: 4,
//     marginBottom: 4,
//     borderRadius: 10,
//   }),
//   link: { fontSize: 10, color: "#0077cc" },
//   headerRow: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     marginBottom: 4,
//     marginTop: 16,
//   },
//   headerItem: { marginRight: 12, fontSize: 10 },
// });
//
// interface ModernTemplatePDFProps {
//   data: ResumeDataType;
//   accentColor: string;
// }
//
// export const ModernTemplatePDF: React.FC<ModernTemplatePDFProps> = ({
//   data,
//   accentColor,
// }) => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       {/* Header */}
//       <View style={styles.section}>
//         <Text style={styles.headerName(accentColor)}>
//           {data.personalDetails.fullName || "Your Name"}
//         </Text>
//         <View style={styles.headerRow}>
//           {data.personalDetails.email && (
//             <Text style={styles.headerItem}>{data.personalDetails.email}</Text>
//           )}
//           {data.personalDetails.phone && (
//             <Text style={styles.headerItem}>{data.personalDetails.phone}</Text>
//           )}
//           {data.personalDetails.location && (
//             <Text style={styles.headerItem}>
//               {data.personalDetails.location}
//             </Text>
//           )}
//           {data.socials?.linkedin && (
//             <Link src={data.socials.linkedin} style={styles.link}>
//               {data.socials.linkedin.replace(/^https?:\/\/(www\.)?/, "")}
//             </Link>
//           )}
//           {data.socials?.portfolio && (
//             <Link src={data.socials.portfolio} style={styles.link}>
//               {data.socials.portfolio.replace(/^https?:\/\//, "")}
//             </Link>
//           )}
//         </View>
//       </View>
//
//       {/* Summary */}
//       {data.summary && (
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle(accentColor)}>
//             Professional Summary
//           </Text>
//           <Text>{data.summary}</Text>
//         </View>
//       )}
//
//       {/* Experience */}
//       {data.experience?.length > 0 && (
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle(accentColor)}>Experience</Text>
//           {data.experience.map((exp) => (
//             <View
//               key={exp.id}
//               style={[styles.experienceItem, { borderLeftColor: accentColor }]}
//             >
//               <View
//                 style={{
//                   flexDirection: "row",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 <View>
//                   <Text style={styles.experienceTitle}>{exp.position}</Text>
//                   <Text style={styles.experienceCompany(accentColor)}>
//                     {exp.organization}
//                   </Text>
//                 </View>
//                 <Text style={styles.dateBox}>
//                   {formatDate(exp.startDate)} -{" "}
//                   {exp.endDate ? formatDate(exp.endDate) : "Present"}
//                 </Text>
//               </View>
//               {exp.description && <Text>{exp.description}</Text>}
//             </View>
//           ))}
//         </View>
//       )}
//
//       {/* Projects */}
//       {data.projects?.length > 0 && (
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle(accentColor)}>Projects</Text>
//           {data.projects.map((proj) => (
//             <View
//               key={proj.id}
//               style={[styles.experienceItem, { borderLeftColor: accentColor }]}
//             >
//               <Text style={styles.experienceTitle}>{proj.name}</Text>
//               {proj.description && <Text>{proj.description}</Text>}
//             </View>
//           ))}
//         </View>
//       )}
//
//       {/* Education & Skills side by side */}
//       <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
//         {data.education?.length > 0 && (
//           <View style={{ flex: 1, marginRight: 8 }}>
//             <Text style={styles.sectionTitle(accentColor)}>Education</Text>
//             {data.education.map((edu) => (
//               <View key={edu.id} style={{ marginBottom: 6 }}>
//                 <Text style={styles.experienceTitle}>
//                   {edu.degree} {edu.field && `in ${edu.field}`}
//                 </Text>
//                 <Text style={{ color: accentColor }}>{edu.institution}</Text>
//                 <Text style={{ fontSize: 10, color: "#666" }}>
//                   {formatDate(edu.startDate)} -{" "}
//                   {edu.endDate ? formatDate(edu.endDate) : "Present"}{" "}
//                   {edu.grade && `• GPA: ${edu.grade}`}
//                 </Text>
//               </View>
//             ))}
//           </View>
//         )}
//
//         {data.skills && data.skills?.length > 0 && (
//           <View style={{ flex: 1 }}>
//             <Text style={styles.sectionTitle(accentColor)}>Skills</Text>
//             <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
//               {data.skills.map((skill) => (
//                 <Text key={skill} style={styles.skillTag(accentColor)}>
//                   {skill}
//                 </Text>
//               ))}
//             </View>
//           </View>
//         )}
//       </View>
//     </Page>
//   </Document>
// );

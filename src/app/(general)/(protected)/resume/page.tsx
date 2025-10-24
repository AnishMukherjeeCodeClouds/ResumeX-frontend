"use client";

import { MainForm } from "@/app/(general)/(protected)/resume/_form/MainForm";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

// export const data = {
//   summary:
//     "Full Stack Developer with 3+ years of experience in building scalable web apps using React, Node.js, and TypeScript. Passionate about clean UI, performance, and accessibility.",
//   personalDetails: {
//     fullName: "John Doe",
//     email: "john.doe@email.com",
//     phone: "+91 9876543210",
//     location: "Bangalore, India",
//   },
//   socials: {
//     portfolio: "https://johndoe.dev",
//     linkedin: "https://linkedin.com/in/johndoe",
//     github: "https://github.com/johndoe",
//   },
//   experience: [
//     {
//       id: "exp-1",
//       position: "Frontend Developer",
//       organization: "EcoKart Pvt Ltd",
//       startDate: "2023-01",
//       location: "Remote",
//       description:
//         "Developed responsive and accessible UI for eco-friendly e-commerce platform using React, Zustand, and TailwindCSS.",
//     },
//     {
//       id: "exp-2",
//       position: "Intern - Web Developer",
//       organization: "NextTech Labs",
//       startDate: "2022-04",
//       endDate: "2022-12",
//       location: "Chennai, India",
//       description:
//         "Worked on dashboard components and optimized data-fetching performance.",
//     },
//   ],
//   education: [
//     {
//       id: "edu-1",
//       degree: "B.Tech in Computer Science",
//       institution: "VIT University",
//       startDate: "2019-07",
//       endDate: "2023-05",
//       grade: "8.9 CGPA",
//     },
//     {
//       id: "edu-2",
//       degree: "B.Tech in Computer Science",
//       institution: "VIT University",
//       startDate: "2019-07",
//       // endDate: "2023-05",
//       grade: "8.9 CGPA",
//     },
//   ],
//
//   projects: [
//     {
//       id: "proj-1",
//       name: "EcoKart",
//       description:
//         "Full-stack MERN web app promoting sustainable products with IndexedDB-powered offline cart and secure checkout.",
//       technologies: [],
//       startDate: "2022-03",
//       liveLink: "https://ecokart.vercel.app",
//     },
//     {
//       id: "proj-2",
//       name: "Resume Builder",
//       description:
//         "Interactive resume builder with live preview, template selection, and one-click PDF export.",
//       technologies: [],
//       startDate: "2021-05",
//       endDate: "2022-07",
//       liveLink: "https://resume-builder.vercel.app",
//     },
//   ],
//   skills: [
//     "React",
//     "Next.js",
//     "Node.js",
//     "TypeScript",
//     "MongoDB",
//     "Tailwind CSS",
//     "Git",
//     "REST APIs",
//     "DevOps",
//   ],
// };

export default function Page() {
  const printRef = useRef<HTMLDivElement>(null);
  const reactToPrint = useReactToPrint({ contentRef: printRef });

  return (
    <div>
      <MainForm />
      {/*<ModernTemplateReact accentColor={}  />*/}
    </div>
  );
}

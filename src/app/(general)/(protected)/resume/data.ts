import { ResumeSchemaType } from "@/app/(general)/(protected)/resume/resume-schema";

export const TEMPLATE_PREVIEW_DATA: ResumeSchemaType = {
	title: "Full-Stack Developer Resume",
	summary:
		"Versatile full-stack developer with 5+ years of experience building responsive web applications and scalable backend systems. Passionate about writing clean, efficient code and delivering seamless user experiences.",
	personalDetails: {
		fullName: "John Doe",
		designation: "Full-stack Developer",
		email: "john.doe@example.com",
		phone: "+14155552671",
		location: "San Francisco, CA",
	},

	socials: {
		linkedIn: "https://www.linkedin.com/in/johndoe",
		github: "https://github.com/johndoe",
		portfolio: "https://johndoe.dev",
	},

	experiences: [
		{
			organization: "BrightEdge Technologies",
			position: "Senior Software Engineer",
			startDate: "2021-03-01",
			endDate: "2024-08-01",
			description:
				"Designed and developed scalable microservices for an analytics platform serving over 1M users. Mentored junior developers and led front-end performance optimization, improving load times by 35%.",
		},
		{
			organization: "CodeStream Labs",
			position: "Full-Stack Developer",
			startDate: "2018-05-01",
			endDate: "2021-02-01",
			description:
				"Built and maintained RESTful APIs and React dashboards. Automated CI/CD pipelines using GitHub Actions and Docker. Collaborated with design teams to refine UX and UI consistency.",
		},
		{
			organization: "Bluewave Solutions",
			position: "Software Developer Intern",
			startDate: "2017-06-01",
			endDate: "2018-04-01",
			description:
				"Assisted in developing internal tools and dashboards. Implemented data visualization components using Chart.js and optimized SQL queries for performance.",
		},
	],

	educations: [
		{
			institution: "University of California, Berkeley",
			degree: "Bachelor of Science",
			field: "Computer Science",
			startDate: "2013-08-01",
			endDate: "2017-05-01",
			grade: "3.8",
		},
		{
			institution: "Westview High School",
			degree: "High School Diploma",
			field: "Science",
			startDate: "2011-06-01",
			endDate: "2013-04-01",
			grade: "3.9",
		},
	],

	skills: [
		"JavaScript",
		"TypeScript",
		"React",
		"Next.js",
		"Node.js",
		"Express",
		"MongoDB",
		"PostgreSQL",
	],

	projects: [
		{
			name: "TaskFlow",
			description:
				"A Kanban-style productivity app with drag-and-drop task management and real-time sync using WebSockets.",
			technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Vercel"],
			startDate: "2022-02-01",
			endDate: "2023-01-01",
			githubLink: "https://github.com/johndoe/taskflow",
			liveLink: "https://taskflow.app",
		},
		{
			name: "FitTrack",
			description:
				"Health tracking web app that visualizes workout data and nutrition stats using D3.js and REST APIs.",
			technologies: ["Next.js", "D3.js", "Firebase", "TailwindCSS"],
			startDate: "2021-03-01",
			endDate: "2021-11-01",
			githubLink: "https://github.com/johndoe/fittrack",
			liveLink: "https://fittrack.io",
		},
	],
	certifications: [
		{
			title: "Google Cloud Professional Developer",
			issuer: "Google Cloud",
			date: "2023-02-01",
			url: "https://cloud.google.com/certification",
		},
		{
			title: "React Developer Certification",
			issuer: "Meta",
			date: "2022-08-01",
			url: "https://www.coursera.org/meta-certification",
		},
	],
	languages: ["English", "Spanish", "German", "Japanese", "French"],
	accentColor: "#000",
	template: "Classic",
};
export const TEMPLATE_INITIAL_STATE: ResumeSchemaType = {
	template: "Classic",
	accentColor: "#27407e",
	personalDetails: {
		fullName: "",
		email: "",
		phone: "",
		location: "",
		designation: "",
	},
	socials: {
		linkedIn: "",
		github: "",
		portfolio: "",
	},
	summary: "",
	experiences: [],
	projects: [],
	educations: [],
	skills: [],
	certifications: [],
	languages: [],
	title: "",
};

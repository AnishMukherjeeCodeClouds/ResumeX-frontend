import z from "zod";

const DateSchema = (error?: string) => z.iso.date(error);

const PersonalDetailsSchema = z.object(
  {
    fullName: z.string("Full name is required"),
    email: z.email("Email is required").trim().toLowerCase(),
    phone: z
      .string()
      .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
      .optional(),
    location: z.string().optional(),
  },
  "Personal details are required",
);

const SocialsSchema = z.object({
  linkedIn: z
    .url("Invalid LinkedIn URL")
    .regex(
      /^https:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/,
      "Invalid LinkedIn profile URL",
    )
    .optional(),

  X: z
    .url("Invalid X (Twitter) URL")
    .regex(
      /^https:\/\/(www\.)?(x\.com|twitter\.com)\/[A-Za-z0-9_]+\/?$/,
      "Invalid X (Twitter) profile URL",
    )
    .optional(),

  github: z
    .url("Invalid GitHub URL")
    .regex(
      /^https:\/\/(www\.)?github\.com\/[A-Za-z0-9_-]+\/?$/,
      "Invalid GitHub profile URL",
    )
    .optional(),

  portfolio: z.url("Invalid portfolio URL").optional(),
});

const ExperienceSchema = z.object({
  organization: z.string("Organization name is required"),
  position: z.string("Experience position is required"),
  startDate: DateSchema("Experience start date is required"),
  endDate: DateSchema().optional(),
  description: z.string(),
  location: z.string().optional(),
});

const EducationSchema = z.object({
  institution: z.string("Institution is required"),
  degree: z.string("Degree is required"),
  field: z.string().optional(),
  description: z.string("Education description is required"),
  startDate: DateSchema("Education start date is required"),
  endDate: DateSchema().optional(),
  grade: z.float32().optional(),
});

export const MAX_PROJECT_TECHNOLOGIES = 5;

const ProjectSchema = z.object({
  name: z.string("Project name is required"),
  description: z.string("Project description is required"),
  technologies: z
    .array(z.string(), "Project technologies are required")
    .nonempty("At least one project technology is required")
    .max(MAX_PROJECT_TECHNOLOGIES),
  liveLink: z.url().optional(),
  githubLink: z
    .url()
    .regex(
      /^https:\/\/(www\.)?github\.com\/[A-Za-z0-9_-]+\/?$/,
      "Invalid GitHub profile URL",
    )
    .optional(),
  startDate: DateSchema("Project start date is required"),
  endDate: DateSchema().optional(),
});

const CertificationSchema = z.object({
  title: z.string("Certification title is required"),
  issuer: z.string("Certification issuer is required"),
  date: DateSchema("Certification date is required"),
  url: z.url("Certification url is required"),
});

export const MAX_EXPERIENCES = 3;
export const MAX_PROJECTS = 3;
export const MAX_EDUCATIONS = 2;

export const ResumeSchema = z.object({
  title: z
    .string("Resume title is required")
    .min(2, "Title should be at least 2 characters")
    .max(255, "Title should be at most 255 characters")
    .optional(),
  summary: z
    .string()
    .max(500, "Summary should be at most 1000 characters")
    .optional(),
  personalDetails: PersonalDetailsSchema,
  socials: SocialsSchema.optional(),
  experiences: z.array(ExperienceSchema).max(MAX_EXPERIENCES),
  educations: z.array(EducationSchema).max(MAX_EDUCATIONS),
  skills: z.array(z.string()).max(8),
  projects: z.array(ProjectSchema).max(MAX_PROJECTS),
  certifications: z.array(CertificationSchema).max(3),
});

export type ResumeSchemaType = z.infer<typeof ResumeSchema>;

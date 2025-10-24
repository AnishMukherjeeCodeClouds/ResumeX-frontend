export type DateString = `${number}-${number}`;
export type ResumeDataType = {
  personalDetails: {
    fullName: string;
    email: string;
    phone?: string;
    location?: string;
  };
  summary?: string;
  socials?: {
    linkedin?: string;
    X?: string;
    github?: string;
    portfolio?: string;
  };
  experience?: {
    id: string;
    organization: string;
    position: string;
    startDate: DateString;
    endDate?: DateString;
    description?: string;
    location?: string;
  }[];
  education?: {
    id: string;
    institution: string;
    degree: string;
    field?: string;
    startDate: DateString;
    endDate?: DateString;
    grade?: string;
  }[];
  projects?: {
    id: string;
    name: string;
    description?: string;
    technologies: string[];
    liveLink?: string;
    githubLink?: string;
    startDate: DateString;
    endDate?: DateString;
  }[];
  skills?: string[];
  // certifications?: {
  //   name: string;
  //   year?: string;
  // }[];
};

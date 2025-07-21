export type WorkExperience = {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
  description: string;
};

export type Education = {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  location: string;
};

export type Project = {
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  startDate: string;
  endDate: string;
};

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
};

export type CVContent = {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    linkedin?: string;
    website?: string;
    github?: string;
  };
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: {
    technical: string[];
    soft: string[];
    languages: string[];
  };
  projects: Project[];
  certifications: Certification[];
  achievements: string[];
  references: {
    available: boolean;
    contacts?: Array<{
      name: string;
      position: string;
      company: string;
      email: string;
      phone: string;
    }>;
  };
};

export type CV = {
  id: number;
  template: string;
  content: {
    personalInfo?: {
      name?: string;
      email?: string;
      phone?: string;
    };
    summary?: string;
    workExperience?: Array<{
      company: string;
      position: string;
    }>;
    education?: Array<{
      institution: string;
      degree: string;
    }>;
    skills?: {
      technical?: string[];
      soft?: string[];
      languages?: string[];
    };
  };
  photo?: string | null;
  createdAt: string;
  updatedAt: string;
};

import type React from "react";
import { Linkedin, Globe, Github } from "lucide-react";

type PersonalInfo = {
  name: string;
  email: string;
  phone: string;
  address: string;
  linkedin?: string;
  website?: string;
  github?: string;
};

type WorkExperience = {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
  description: string;
};

type Education = {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  location: string;
};

type Project = {
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  startDate: string;
  endDate: string;
};

type Certification = {
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
};

type AtsTemplateProps = {
  personalInfo: PersonalInfo;
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
};

const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <h3 className="text-lg font-bold uppercase mt-4 mb-1 pb-0.5 border-b border-black">
    {title}
  </h3>
);

const BulletList: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="list-disc list-inside ml-4 text-sm text-gray-800 space-y-0.5">
    {items.map((item, idx) => (
      <li key={idx}>{item}</li>
    ))}
  </ul>
);

export const AtsTemplate: React.FC<AtsTemplateProps> = ({
  personalInfo,
  summary,
  workExperience,
  education,
  skills,
  projects,
  certifications,
  achievements,
}) => {
  return (
    <div className="font-sans text-gray-900 leading-normal px-4 py-3">
      <div className="text-center mb-4 break-inside-avoid">
        <h1 className="text-3xl font-bold uppercase mb-1">
          {personalInfo.name}
        </h1>
        <p className="text-sm text-gray-700 flex justify-center items-center flex-wrap gap-x-2">
          <span>{personalInfo.address}</span> &bull;{" "}
          <span>{personalInfo.email}</span> &bull;{" "}
          <span>{personalInfo.phone}</span>
          {personalInfo.linkedin && (
            <>
              {" "}
              &bull; <Linkedin className="h-3 w-3 inline-block mr-0.5" />
              <span className="text-gray-700">{personalInfo.linkedin}</span>
            </>
          )}
          {personalInfo.website && (
            <>
              {" "}
              &bull; <Globe className="h-3 w-3 inline-block mr-0.5" />
              <span className="text-gray-700">{personalInfo.website}</span>
            </>
          )}
          {personalInfo.github && (
            <>
              {" "}
              &bull; <Github className="h-3 w-3 inline-block mr-0.5" />
              <span className="text-gray-700">{personalInfo.github}</span>
            </>
          )}
        </p>
      </div>

      {summary && (
        <div className="break-inside-avoid">
          <SectionTitle title="Professional Summary" />
          <p className="text-sm text-gray-800 text-justify">{summary}</p>
        </div>
      )}

      {workExperience.length > 0 && (
        <div className="break-inside-avoid">
          <SectionTitle title="Work Experience" />
          {workExperience.map((exp, idx) => (
            <div key={idx} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h4 className="font-bold text-base">{exp.company}</h4>
                <span className="text-sm text-gray-700 text-right flex-shrink-0 ml-2">
                  {exp.location}
                </span>
              </div>
              <div className="flex justify-between items-baseline mb-0.5">
                <p className="text-sm font-semibold">{exp.position}</p>
                <span className="text-sm text-gray-700 text-right flex-shrink-0 ml-2">
                  {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                </span>
              </div>
              <BulletList items={exp.description.split("\n").filter(Boolean)} />
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && (
        <div className="break-inside-avoid">
          <SectionTitle title="Education" />
          {education.map((edu, idx) => (
            <div key={idx} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h4 className="font-bold text-base">{edu.institution}</h4>
                <span className="text-sm text-gray-700 text-right flex-shrink-0 ml-2">
                  {edu.location}
                </span>
              </div>
              <div className="flex justify-between items-baseline mb-0.5">
                <p className="text-sm font-semibold">
                  {edu.degree} in {edu.field}
                </p>
                <span className="text-sm text-gray-700 text-right flex-shrink-0 ml-2">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              {edu.gpa && (
                <p className="text-sm text-gray-700">GPA: {edu.gpa}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {(skills.technical.length > 0 ||
        skills.soft.length > 0 ||
        skills.languages.length > 0) && (
        <div className="break-inside-avoid">
          <SectionTitle title="Skills" />
          <div className="text-sm text-gray-800">
            {skills.technical.length > 0 && (
              <p className="mb-1">
                <span className="font-semibold">Technical Skills:</span>{" "}
                {skills.technical.join(", ")}
              </p>
            )}
            {skills.soft.length > 0 && (
              <p className="mb-1">
                <span className="font-semibold">Soft Skills:</span>{" "}
                {skills.soft.join(", ")}
              </p>
            )}
            {skills.languages.length > 0 && (
              <p className="mb-1">
                <span className="font-semibold">Languages:</span>{" "}
                {skills.languages.join(", ")}
              </p>
            )}
          </div>
        </div>
      )}

      {projects.length > 0 && (
        <div className="break-inside-avoid">
          <SectionTitle title="Projects" />
          {projects.map((project, idx) => (
            <div key={idx} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h4 className="font-bold text-base">{project.name}</h4>
                <span className="text-sm text-gray-700 text-right flex-shrink-0 ml-2">
                  {project.startDate} - {project.endDate}
                </span>
              </div>
              {project.url && (
                <p className="text-sm text-gray-700 mb-0.5">
                  <span className="text-gray-700">{project.url}</span>
                </p>
              )}
              <BulletList
                items={project.description.split("\n").filter(Boolean)}
              />
              {project.technologies.length > 0 && (
                <p className="text-xs text-gray-700 mt-1">
                  <span className="font-semibold">Technologies:</span>{" "}
                  {project.technologies.join(", ")}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {certifications.length > 0 && (
        <div className="break-inside-avoid">
          <SectionTitle title="Certifications" />
          {certifications.map((cert, idx) => (
            <div key={idx} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h4 className="font-bold text-base">{cert.name}</h4>
                <span className="text-sm text-gray-700 text-right flex-shrink-0 ml-2">
                  {cert.date} {cert.expiryDate && `- ${cert.expiryDate}`}
                </span>
              </div>
              <p className="text-sm text-gray-700">
                {cert.issuer}
                {cert.credentialId && ` | Credential ID: ${cert.credentialId}`}
              </p>
            </div>
          ))}
        </div>
      )}

      {achievements.length > 0 && (
        <div className="break-inside-avoid">
          <SectionTitle title="Achievements & Awards" />
          <BulletList items={achievements} />
        </div>
      )}
    </div>
  );
};

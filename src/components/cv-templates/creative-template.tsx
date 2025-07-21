import type React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe, Github } from "lucide-react";

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

type CreativeTemplateProps = {
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
  photo?: string | null;
};

const CreativeSectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <h3 className="text-2xl font-bold text-teal-950 mb-4 pb-2 border-b-2 border-teal-400">
    {title}
  </h3>
);

const CreativeBulletList: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="list-disc list-inside text-gray-800 text-sm space-y-1">
    {items.map((item, idx) => (
      <li key={idx}>{item}</li>
    ))}
  </ul>
);

export const CreativeTemplate: React.FC<CreativeTemplateProps> = ({
  personalInfo,
  summary,
  workExperience,
  education,
  skills,
  projects,
  certifications,
  achievements,
  photo,
}) => {
  return (
    <div className="font-sans text-gray-800 leading-relaxed p-8 bg-white">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-8 pb-4 border-b border-gray-200 break-inside-avoid">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h1 className="text-5xl font-extrabold text-teal-950 leading-tight">
            {personalInfo.name}
          </h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 mt-3 text-gray-800 text-sm">
            <p className="flex items-center gap-1">
              <Mail className="h-4 w-4 text-teal-600" /> {personalInfo.email}
            </p>
            <p className="flex items-center gap-1">
              <Phone className="h-4 w-4 text-teal-600" /> {personalInfo.phone}
            </p>
            <p className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-teal-600" />{" "}
              {personalInfo.address}
            </p>
            {personalInfo.linkedin && (
              <p className="flex items-center gap-1">
                <Linkedin className="h-4 w-4 text-teal-600" />{" "}
                {personalInfo.linkedin}
              </p>
            )}
            {personalInfo.website && (
              <p className="flex items-center gap-1">
                <Globe className="h-4 w-4 text-teal-600" />{" "}
                {personalInfo.website}
              </p>
            )}
            {personalInfo.github && (
              <p className="flex items-center gap-1">
                <Github className="h-4 w-4 text-teal-600" />{" "}
                {personalInfo.github}
              </p>
            )}
          </div>
        </div>
        {photo && (
          <div className="flex-shrink-0 mt-4 md:mt-0 md:ml-8">
            <img
              src={photo || "/placeholder.svg"}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full border-4 border-teal-200 shadow-md"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4 bg-teal-100 p-6 rounded-lg shadow-sm space-y-6">
          {summary && (
            <div className="break-inside-avoid">
              <CreativeSectionTitle title="Professional Summary" />
              <p className="text-gray-800 text-sm">{summary}</p>
            </div>
          )}

          {(skills.technical.length > 0 ||
            skills.soft.length > 0 ||
            skills.languages.length > 0) && (
            <div className="break-inside-avoid">
              <CreativeSectionTitle title="Skills" />
              <div className="space-y-3">
                {skills.technical.length > 0 && (
                  <div className="break-inside-avoid">
                    <h4 className="font-semibold text-base text-gray-900 mb-1">
                      Technical
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {skills.technical.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-teal-200 text-teal-950 px-2.5 py-1 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {skills.soft.length > 0 && (
                  <div className="break-inside-avoid">
                    <h4 className="font-semibold text-base text-gray-900 mb-1">
                      Soft Skills
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {skills.soft.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-teal-200 text-teal-950 px-2.5 py-1 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {skills.languages.length > 0 && (
                  <div className="break-inside-avoid">
                    <h4 className="font-semibold text-base text-gray-900 mb-1">
                      Languages
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {skills.languages.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-teal-200 text-teal-950 px-2.5 py-1 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {certifications.length > 0 && (
            <div className="break-inside-avoid">
              <CreativeSectionTitle title="Certifications" />
              <ul className="space-y-3 text-sm">
                {certifications.map((cert, idx) => (
                  <li key={idx} className="break-inside-avoid">
                    <p className="font-semibold text-gray-900">{cert.name}</p>
                    <p className="text-gray-800">{cert.issuer}</p>
                    <p className="text-gray-700 text-xs">
                      {cert.date} {cert.expiryDate && `- ${cert.expiryDate}`}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {achievements.length > 0 && (
            <div className="break-inside-avoid">
              <CreativeSectionTitle title="Achievements & Awards" />
              <CreativeBulletList items={achievements} />
            </div>
          )}
        </div>

        <div className="md:col-span-8 space-y-8">
          {workExperience.length > 0 && (
            <div className="break-inside-avoid">
              <CreativeSectionTitle title="Work Experience" />
              <div className="space-y-6">
                {workExperience.map((exp, idx) => (
                  <div key={idx} className="break-inside-avoid">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-bold text-lg text-gray-900">
                        {exp.position}
                      </h4>
                      <span className="text-sm text-gray-700 flex-shrink-0 ml-2">
                        {exp.startDate} -{" "}
                        {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                    <p className="text-sm text-gray-800 mb-2">
                      {exp.company} | {exp.location}
                    </p>
                    <CreativeBulletList
                      items={exp.description.split("\n").filter(Boolean)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="break-inside-avoid">
              <CreativeSectionTitle title="Education" />
              <div className="space-y-6">
                {education.map((edu, idx) => (
                  <div key={idx} className="break-inside-avoid">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-bold text-lg text-gray-900">
                        {edu.degree} in {edu.field}
                      </h4>
                      <span className="text-sm text-gray-700 flex-shrink-0 ml-2">
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                    <p className="text-sm text-gray-800 mb-1">
                      {edu.institution} | {edu.location}
                    </p>
                    {edu.gpa && (
                      <p className="text-sm text-gray-700">GPA: {edu.gpa}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {projects.length > 0 && (
            <div className="break-inside-avoid">
              <CreativeSectionTitle title="Projects" />
              <div className="space-y-6">
                {projects.map((project, idx) => (
                  <div key={idx} className="break-inside-avoid">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-bold text-lg text-gray-900">
                        {project.name}
                      </h4>
                      <span className="text-sm text-gray-700 flex-shrink-0 ml-2">
                        {project.startDate} - {project.endDate}
                      </span>
                    </div>
                    {project.url && (
                      <p className="text-sm text-gray-800 mb-2">
                        {project.url}
                      </p>
                    )}
                    <CreativeBulletList
                      items={project.description.split("\n").filter(Boolean)}
                    />
                    {project.technologies.length > 0 && (
                      <p className="text-xs text-gray-700 mt-2">
                        <span className="font-semibold">Technologies:</span>{" "}
                        {project.technologies.join(", ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

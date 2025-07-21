"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toast } from "@/components/ui/toast";
import {
  User,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  FileText,
  Camera,
  Save,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import type { CVContent } from "@/types/cv";
import { useCVForm } from "@/hooks/useCVForm";
import { PersonalInfoSection } from "@/components/cv/form/PersonalInfoSection";
import { ExperienceSection } from "@/components/cv/form/ExperienceSection";
import { EducationSection } from "@/components/cv/form/EducationSection";
import { SkillsSection } from "@/components/cv/form/SkillsSection";
import { ProjectsSection } from "@/components/cv/form/ProjectsSection";
import { AdditionalSection } from "@/components/cv/form/AdditionalSection";
import { Label } from "@/components/ui/label";

type CVFormProps = {
  initialValues?: {
    template?: string;
    content?: CVContent;
    photo?: string | null;
  };
  loading?: boolean;
  onSubmit: (form: {
    template: string;
    content: CVContent;
    photo?: File | null;
  }) => void;
};

export default function CVForm({
  initialValues,
  loading = false,
  onSubmit,
}: CVFormProps) {
  const router = useRouter();
  const {
    template,
    setTemplate,
    photo,
    error,
    showToast,
    setShowToast,
    activeTab,
    setActiveTab,
    validationErrors,
    setValidationErrors,
    tabsWithErrors,
    formData,
    setFormData,

    showFormError,
    validateForm,

    handlePersonalInfoChange,
    handleSummaryChange,
    handleFileChange,
    handleAchievementsChange,
  } = useCVForm({ initialValues });

  const addWorkExperience = () => {
    setFormData((prev) => ({
      ...prev,
      workExperience: [
        ...prev.workExperience,
        {
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          current: false,
          location: "",
          description: "",
        },
      ],
    }));
  };

  const updateWorkExperience = (
    index: number,
    field: string,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      ),
    }));
    setValidationErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[`workExperience[${index}].${field}`];
      if (field === "startDate" || field === "endDate") {
        delete newErrors[`workExperience[${index}].startDate`];
        delete newErrors[`workExperience[${index}].endDate`];
      }
      return newErrors;
    });
  };

  const removeWorkExperience = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, i) => i !== index),
    }));
    setValidationErrors((prev) => {
      const newErrors = { ...prev };
      Object.keys(newErrors).forEach((key) => {
        if (key.startsWith(`workExperience[${index}]`)) {
          delete newErrors[key];
        }
      });
      return newErrors;
    });
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          institution: "",
          degree: "",
          field: "",
          startDate: "",
          endDate: "",
          location: "",
        },
      ],
    }));
  };

  const updateEducation = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      ),
    }));
    setValidationErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[`education[${index}].${field}`];
      if (field === "startDate" || field === "endDate") {
        delete newErrors[`education[${index}].startDate`];
        delete newErrors[`education[${index}].endDate`];
      }
      return newErrors;
    });
  };

  const removeEducation = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
    setValidationErrors((prev) => {
      const newErrors = { ...prev };
      Object.keys(newErrors).forEach((key) => {
        if (key.startsWith(`education[${index}]`)) {
          delete newErrors[key];
        }
      });
      return newErrors;
    });
  };

  const addSkill = (
    category: "technical" | "soft" | "languages",
    skill: string
  ) => {
    if (skill.trim()) {
      setFormData((prev) => ({
        ...prev,
        skills: {
          ...prev.skills,
          [category]: [...prev.skills[category], skill.trim()],
        },
      }));
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`skills.${category}`];
        return newErrors;
      });
    }
  };

  const removeSkill = (
    category: "technical" | "soft" | "languages",
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: prev.skills[category].filter((_, i) => i !== index),
      },
    }));
  };

  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          name: "",
          description: "",
          technologies: [],
          startDate: "",
          endDate: "",
        },
      ],
    }));
  };

  const updateProject = (
    index: number,
    field: string,
    value: string | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((project, i) =>
        i === index ? { ...project, [field]: value } : project
      ),
    }));
    setValidationErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[`projects[${index}].${field}`];
      if (field === "startDate" || field === "endDate") {
        delete newErrors[`projects[${index}].startDate`];
        delete newErrors[`projects[${index}].endDate`];
      }
      return newErrors;
    });
  };

  const removeProject = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
    setValidationErrors((prev) => {
      const newErrors = { ...prev };
      Object.keys(newErrors).forEach((key) => {
        if (key.startsWith(`projects[${index}]`)) {
          delete newErrors[key];
        }
      });
      return newErrors;
    });
  };

  const addCertification = () => {
    setFormData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          name: "",
          issuer: "",
          date: "",
        },
      ],
    }));
  };

  const updateCertification = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) =>
        i === index ? { ...cert, [field]: value } : cert
      ),
    }));
    setValidationErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[`certifications[${index}].${field}`];
      if (field === "date" || field === "expiryDate") {
        delete newErrors[`certifications[${index}].date`];
        delete newErrors[`certifications[${index}].expiryDate`];
      }
      return newErrors;
    });
  };

  const removeCertification = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
    setValidationErrors((prev) => {
      const newErrors = { ...prev };
      Object.keys(newErrors).forEach((key) => {
        if (key.startsWith(`certifications[${index}]`)) {
          delete newErrors[key];
        }
      });
      return newErrors;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) {
      showFormError("Please fix the errors in the form.");
      const firstErrorTab = Array.from(tabsWithErrors)[0];
      if (firstErrorTab) {
        setActiveTab(firstErrorTab);
      }
      return;
    }
    onSubmit({ template, content: formData, photo });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {error && showToast && (
        <Toast
          message={error}
          type="error"
          onClose={() => setShowToast(false)}
        />
      )}

      <Card className="shadow-md border-0 bg-gradient-to-br from-white to-gray-50">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card
              className={cn("border-2 border-dashed border-gray-200", {
                "border-red-500": validationErrors["template"],
              })}
            >
              <CardContent className="pt-2">
                <div className="space-y-3">
                  <Label className="text-base font-semibold flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Template Selection *
                  </Label>
                  <Select
                    value={template}
                    onValueChange={(value) => {
                      setTemplate(value);
                      setValidationErrors((prev) => {
                        const newErrors = { ...prev };
                        delete newErrors["template"];
                        return newErrors;
                      });
                    }}
                  >
                    <SelectTrigger
                      size="default"
                      className={cn("h-16 w-full min-h-16", {
                        "border-red-500": validationErrors["template"],
                      })}
                    >
                      <SelectValue placeholder="Choose your CV template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ats">
                        <div className="flex flex-col items-start">
                          <span className="font-medium">ATS Optimized</span>
                          <span className="text-sm text-gray-500">
                            Clean, professional format for applicant tracking
                            systems
                          </span>
                        </div>
                      </SelectItem>
                      <SelectItem value="creative">
                        <div className="flex flex-col items-start">
                          <span className="font-medium">
                            Creative Professional
                          </span>
                          <span className="text-sm text-gray-500">
                            Modern design with photo and visual elements
                          </span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {validationErrors["template"] && (
                    <p className="text-sm text-red-500">
                      {validationErrors["template"]}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {template === "creative" && (
              <Card
                className={cn("border-2 border-dashed border-gray-200", {
                  "border-red-500": validationErrors["photo"],
                })}
              >
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <Label className="text-base font-semibold flex items-center gap-2">
                      <Camera className="h-5 w-5" />
                      Professional Photo {template === "creative" ? "*" : ""}
                    </Label>
                    <div className="space-y-3">
                      <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="flex-1 w-full">
                          <div
                            className={cn(
                              "relative border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 hover:bg-blue-50/50 transition-colors cursor-pointer group",
                              { "border-red-500": validationErrors["photo"] }
                            )}
                            onClick={() =>
                              document.getElementById("photo-input")?.click()
                            }
                          >
                            <input
                              id="photo-input"
                              type="file"
                              accept="image/jpeg,image/png,image/webp"
                              onChange={handleFileChange}
                              className="hidden"
                            />
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                                <Camera className="h-5 w-5 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-700">
                                  {photo ? photo.name : "Click to upload photo"}
                                </p>
                                <p className="text-xs text-gray-500">
                                  JPG, PNG, WEBP (max 2MB)
                                </p>
                              </div>
                              <div className="text-blue-600 font-medium text-sm">
                                Browse
                              </div>
                            </div>
                          </div>
                          {validationErrors["photo"] && (
                            <p className="text-sm text-red-500 mt-2">
                              {validationErrors["photo"]}
                            </p>
                          )}
                        </div>
                        {(photo || initialValues?.photo) && (
                          <div className="relative flex items-center gap-3 bg-gray-50 p-3 rounded-lg border mt-4 md:mt-0">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                const fileInput = document.getElementById(
                                  "photo-input"
                                ) as HTMLInputElement;
                                if (fileInput) fileInput.value = "";
                                setValidationErrors((prev) => {
                                  const newErrors = { ...prev };
                                  delete newErrors["photo"];
                                  return newErrors;
                                });
                              }}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold transition-colors z-10 shadow-md"
                              title="Remove photo"
                            >
                              ×
                            </button>
                            <img
                              src={
                                photo
                                  ? URL.createObjectURL(photo)
                                  : initialValues?.photo || "/placeholder.svg"
                              }
                              alt="CV Photo"
                              className="w-12 h-12 object-cover rounded-lg border shadow-sm"
                            />
                            <div className="text-sm">
                              {photo ? (
                                <div>
                                  <span className="text-green-600 font-medium block">
                                    ✓ New photo selected
                                  </span>
                                  <span className="text-gray-500 text-xs">
                                    {(photo.size / 1024 / 1024).toFixed(2)} MB
                                  </span>
                                </div>
                              ) : (
                                <span className="text-gray-600">
                                  Current photo
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="flex flex-wrap justify-center w-full h-auto">
                <TabsTrigger
                  value="personal"
                  className={cn(
                    "flex flex-col sm:flex-row items-center gap-1 px-2 py-2 sm:px-4 sm:py-2",
                    {
                      "text-red-500": tabsWithErrors.has("personal"),
                    }
                  )}
                >
                  <User className="h-4 w-4" />
                  <span className="text-xs sm:text-sm md:text-base hidden sm:inline">
                    Personal
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="experience"
                  className={cn(
                    "flex flex-col sm:flex-row items-center gap-1 px-2 py-2 sm:px-4 sm:py-2",
                    {
                      "text-red-500": tabsWithErrors.has("experience"),
                    }
                  )}
                >
                  <Briefcase className="h-4 w-4" />
                  <span className="text-xs sm:text-sm md:text-base hidden sm:inline">
                    Experience
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="education"
                  className={cn(
                    "flex flex-col sm:flex-row items-center gap-1 px-2 py-2 sm:px-4 sm:py-2",
                    {
                      "text-red-500": tabsWithErrors.has("education"),
                    }
                  )}
                >
                  <GraduationCap className="h-4 w-4" />
                  <span className="text-xs sm:text-sm md:text-base hidden sm:inline">
                    Education
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="skills"
                  className={cn(
                    "flex flex-col sm:flex-row items-center gap-1 px-2 py-2 sm:px-4 sm:py-2",
                    {
                      "text-red-500": tabsWithErrors.has("skills"),
                    }
                  )}
                >
                  <Code className="h-4 w-4" />
                  <span className="text-xs sm:text-sm md:text-base hidden sm:inline">
                    Skills
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="projects"
                  className={cn(
                    "flex flex-col sm:flex-row items-center gap-1 px-2 py-2 sm:px-4 sm:py-2",
                    {
                      "text-red-500": tabsWithErrors.has("projects"),
                    }
                  )}
                >
                  <FileText className="h-4 w-4" />
                  <span className="text-xs sm:text-sm md:text-base hidden sm:inline">
                    Projects
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="additional"
                  className={cn(
                    "flex flex-col sm:flex-row items-center gap-1 px-2 py-2 sm:px-4 sm:py-2",
                    {
                      "text-red-500": tabsWithErrors.has("additional"),
                    }
                  )}
                >
                  <Award className="h-4 w-4" />
                  <span className="text-xs sm:text-sm md:text-base hidden sm:inline">
                    Additional
                  </span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-6 mt-6">
                <PersonalInfoSection
                  formData={formData}
                  validationErrors={validationErrors}
                  onPersonalInfoChange={handlePersonalInfoChange}
                  onSummaryChange={handleSummaryChange}
                />
              </TabsContent>

              <TabsContent value="experience" className="space-y-6 mt-6">
                <ExperienceSection
                  formData={formData}
                  validationErrors={validationErrors}
                  onAddWorkExperience={addWorkExperience}
                  onUpdateWorkExperience={updateWorkExperience}
                  onRemoveWorkExperience={removeWorkExperience}
                />
              </TabsContent>

              <TabsContent value="education" className="space-y-6 mt-6">
                <EducationSection
                  formData={formData}
                  validationErrors={validationErrors}
                  onAddEducation={addEducation}
                  onUpdateEducation={updateEducation}
                  onRemoveEducation={removeEducation}
                />
              </TabsContent>

              <TabsContent value="skills" className="space-y-6 mt-6">
                <SkillsSection
                  formData={formData}
                  validationErrors={validationErrors}
                  onAddSkill={addSkill}
                  onRemoveSkill={removeSkill}
                />
              </TabsContent>

              <TabsContent value="projects" className="space-y-6 mt-6">
                <ProjectsSection
                  formData={formData}
                  validationErrors={validationErrors}
                  onAddProject={addProject}
                  onUpdateProject={updateProject}
                  onRemoveProject={removeProject}
                />
              </TabsContent>

              <TabsContent value="additional" className="space-y-6 mt-6">
                <AdditionalSection
                  formData={formData}
                  validationErrors={validationErrors}
                  onAddCertification={addCertification}
                  onUpdateCertification={updateCertification}
                  onRemoveCertification={removeCertification}
                  onAchievementsChange={handleAchievementsChange}
                />
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/cv")}
                size="lg"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 border-gray-300 hover:border-gray-400 transition-colors duration-200 rounded-xl px-8 py-3"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </Button>
              <Button
                type="submit"
                disabled={loading}
                size="lg"
                className={cn(
                  "bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                <Save className="h-5 w-5 mr-2" />
                {loading ? "Saving CV..." : "Save CV"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

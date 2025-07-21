"use client";

import type React from "react";

import { useState } from "react";
import type { CVContent } from "@/types/cv";

type CVFormProps = {
  initialValues?: {
    template?: string;
    content?: CVContent;
    photo?: string | null;
  };
};

export function useCVForm({ initialValues }: CVFormProps = {}) {
  const [template, setTemplate] = useState(initialValues?.template || "ats");
  const [photo, setPhoto] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [tabsWithErrors, setTabsWithErrors] = useState<Set<string>>(new Set());

  // Initialize form data with comprehensive structure
  const [formData, setFormData] = useState<CVContent>({
    personalInfo: {
      name: initialValues?.content?.personalInfo?.name || "",
      email: initialValues?.content?.personalInfo?.email || "",
      phone: initialValues?.content?.personalInfo?.phone || "",
      address: initialValues?.content?.personalInfo?.address || "",
      linkedin: initialValues?.content?.personalInfo?.linkedin || "",
      website: initialValues?.content?.personalInfo?.website || "",
      github: initialValues?.content?.personalInfo?.github || "",
    },
    summary: initialValues?.content?.summary || "",
    workExperience: initialValues?.content?.workExperience || [],
    education: initialValues?.content?.education || [],
    skills: {
      technical: initialValues?.content?.skills?.technical || [],
      soft: initialValues?.content?.skills?.soft || [],
      languages: initialValues?.content?.skills?.languages || [],
    },
    projects: initialValues?.content?.projects || [],
    certifications: initialValues?.content?.certifications || [],
    achievements: initialValues?.content?.achievements || [],
    references: initialValues?.content?.references || { available: true },
  });

  // Helper functions
  const showFormError = (message: string) => {
    setError(message);
    setShowToast(true);
  };

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };
  const isValidMonthYear = (dateString: string) =>
    /^\d{4}-\d{2}$/.test(dateString);

  // Validation function
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    const newTabsWithErrors = new Set<string>();

    // Template validation
    if (!template || !["ats", "creative"].includes(template)) {
      errors["template"] = "Please select a valid template.";
    }
    if (template === "creative" && !photo && !initialValues?.photo) {
      errors["photo"] = "Photo is required for creative template.";
    }

    // Personal Info validation
    if (!formData.personalInfo.name.trim()) {
      errors["personalInfo.name"] = "Full Name is required.";
      newTabsWithErrors.add("personal");
    } else if (formData.personalInfo.name.trim().length < 3) {
      errors["personalInfo.name"] = "Full Name must be at least 3 characters.";
      newTabsWithErrors.add("personal");
    }

    if (!formData.personalInfo.email.trim()) {
      errors["personalInfo.email"] = "Email Address is required.";
      newTabsWithErrors.add("personal");
    } else if (!isValidEmail(formData.personalInfo.email)) {
      errors["personalInfo.email"] = "Invalid email format.";
      newTabsWithErrors.add("personal");
    }

    if (!formData.personalInfo.address.trim()) {
      errors["personalInfo.address"] = "Address is required.";
      newTabsWithErrors.add("personal");
    }

    if (
      formData.personalInfo.phone &&
      !/^\+?\d{8,15}$/.test(formData.personalInfo.phone.replace(/\s/g, ""))
    ) {
      errors["personalInfo.phone"] = "Invalid phone number format.";
      newTabsWithErrors.add("personal");
    }

    if (
      formData.personalInfo.linkedin &&
      !isValidUrl(formData.personalInfo.linkedin)
    ) {
      errors["personalInfo.linkedin"] = "Invalid LinkedIn URL.";
      newTabsWithErrors.add("personal");
    }

    if (
      formData.personalInfo.website &&
      !isValidUrl(formData.personalInfo.website)
    ) {
      errors["personalInfo.website"] = "Invalid Website URL.";
      newTabsWithErrors.add("personal");
    }

    if (
      formData.personalInfo.github &&
      !isValidUrl(formData.personalInfo.github)
    ) {
      errors["personalInfo.github"] = "Invalid GitHub URL.";
      newTabsWithErrors.add("personal");
    }

    // Summary validation
    if (!formData.summary.trim()) {
      errors["summary"] = "Professional Summary is required.";
      newTabsWithErrors.add("personal");
    } else if (formData.summary.trim().length < 50) {
      errors["summary"] = "Summary should be at least 50 characters.";
      newTabsWithErrors.add("personal");
    } else if (formData.summary.trim().length > 500) {
      errors["summary"] = "Summary should not exceed 500 characters.";
      newTabsWithErrors.add("personal");
    }

    // Work Experience validation
    if (formData.workExperience.length === 0) {
      errors["workExperience"] =
        "At least one work experience entry is required.";
      newTabsWithErrors.add("experience");
    } else {
      formData.workExperience.forEach((exp, index) => {
        if (!exp.company.trim()) {
          errors[`workExperience[${index}].company`] =
            "Company Name is required.";
          newTabsWithErrors.add("experience");
        }
        if (!exp.position.trim()) {
          errors[`workExperience[${index}].position`] = "Position is required.";
          newTabsWithErrors.add("experience");
        }
        if (!exp.startDate.trim()) {
          errors[`workExperience[${index}].startDate`] =
            "Start Date is required.";
          newTabsWithErrors.add("experience");
        } else if (!isValidMonthYear(exp.startDate)) {
          errors[`workExperience[${index}].startDate`] =
            "Invalid date format (YYYY-MM).";
          newTabsWithErrors.add("experience");
        }
        if (!exp.current && !exp.endDate.trim()) {
          errors[`workExperience[${index}].endDate`] =
            "End Date is required if not current.";
          newTabsWithErrors.add("experience");
        } else if (
          !exp.current &&
          exp.endDate.trim() &&
          !isValidMonthYear(exp.endDate)
        ) {
          errors[`workExperience[${index}].endDate`] =
            "Invalid date format (YYYY-MM).";
          newTabsWithErrors.add("experience");
        } else if (
          !exp.current &&
          exp.startDate &&
          exp.endDate &&
          new Date(exp.startDate) > new Date(exp.endDate)
        ) {
          errors[`workExperience[${index}].endDate`] =
            "End Date must be after Start Date.";
          newTabsWithErrors.add("experience");
        }
        if (!exp.location.trim()) {
          errors[`workExperience[${index}].location`] = "Location is required.";
          newTabsWithErrors.add("experience");
        }
        if (!exp.description.trim()) {
          errors[`workExperience[${index}].description`] =
            "Job Description is required.";
          newTabsWithErrors.add("experience");
        } else if (exp.description.trim().length < 20) {
          errors[`workExperience[${index}].description`] =
            "Description should be at least 20 characters.";
          newTabsWithErrors.add("experience");
        }
      });
    }

    // Education validation
    if (formData.education.length === 0) {
      errors["education"] = "At least one education entry is required.";
      newTabsWithErrors.add("education");
    } else {
      formData.education.forEach((edu, index) => {
        if (!edu.institution.trim()) {
          errors[`education[${index}].institution`] =
            "Institution is required.";
          newTabsWithErrors.add("education");
        }
        if (!edu.degree.trim()) {
          errors[`education[${index}].degree`] = "Degree is required.";
          newTabsWithErrors.add("education");
        }
        if (!edu.field.trim()) {
          errors[`education[${index}].field`] = "Field of Study is required.";
          newTabsWithErrors.add("education");
        }
        if (!edu.startDate.trim()) {
          errors[`education[${index}].startDate`] = "Start Date is required.";
          newTabsWithErrors.add("education");
        } else if (!isValidMonthYear(edu.startDate)) {
          errors[`education[${index}].startDate`] =
            "Invalid date format (YYYY-MM).";
          newTabsWithErrors.add("education");
        }
        if (!edu.endDate.trim()) {
          errors[`education[${index}].endDate`] = "End Date is required.";
          newTabsWithErrors.add("education");
        } else if (!isValidMonthYear(edu.endDate)) {
          errors[`education[${index}].endDate`] =
            "Invalid date format (YYYY-MM).";
          newTabsWithErrors.add("education");
        } else if (
          edu.startDate &&
          edu.endDate &&
          new Date(edu.startDate) > new Date(edu.endDate)
        ) {
          errors[`education[${index}].endDate`] =
            "End Date must be after Start Date.";
          newTabsWithErrors.add("education");
        }
        if (!edu.location.trim()) {
          errors[`education[${index}].location`] = "Location is required.";
          newTabsWithErrors.add("education");
        }
        if (edu.gpa && !/^\d+(\.\d+)?(\/\d+(\.\d+)?)?$/.test(edu.gpa)) {
          errors[`education[${index}].gpa`] =
            "Invalid GPA format (e.g., 3.8 or 3.8/4.0).";
          newTabsWithErrors.add("education");
        }
      });
    }

    // Skills validation
    if (formData.skills.technical.length === 0) {
      errors["skills.technical"] = "At least one technical skill is required.";
      newTabsWithErrors.add("skills");
    }
    if (formData.skills.soft.length === 0) {
      errors["skills.soft"] = "At least one soft skill is required.";
      newTabsWithErrors.add("skills");
    }
    if (formData.skills.languages.length === 0) {
      errors["skills.languages"] = "At least one language skill is required.";
      newTabsWithErrors.add("skills");
    }

    // Projects validation
    formData.projects.forEach((project, index) => {
      if (!project.name.trim()) {
        errors[`projects[${index}].name`] = "Project Name is required.";
        newTabsWithErrors.add("projects");
      }
      if (!project.description.trim()) {
        errors[`projects[${index}].description`] =
          "Project Description is required.";
        newTabsWithErrors.add("projects");
      } else if (project.description.trim().length < 20) {
        errors[`projects[${index}].description`] =
          "Description should be at least 20 characters.";
        newTabsWithErrors.add("projects");
      }
      if (
        project.technologies.length === 0 ||
        project.technologies.every((tech) => !tech.trim())
      ) {
        errors[`projects[${index}].technologies`] =
          "At least one technology is required.";
        newTabsWithErrors.add("projects");
      }
      if (project.url && !isValidUrl(project.url)) {
        errors[`projects[${index}].url`] = "Invalid Project URL.";
        newTabsWithErrors.add("projects");
      }
      if (!project.startDate.trim()) {
        errors[`projects[${index}].startDate`] = "Start Date is required.";
        newTabsWithErrors.add("projects");
      } else if (!isValidMonthYear(project.startDate)) {
        errors[`projects[${index}].startDate`] =
          "Invalid date format (YYYY-MM).";
        newTabsWithErrors.add("projects");
      }
      if (!project.endDate.trim()) {
        errors[`projects[${index}].endDate`] = "End Date is required.";
        newTabsWithErrors.add("projects");
      } else if (!isValidMonthYear(project.endDate)) {
        errors[`projects[${index}].endDate`] = "Invalid date format (YYYY-MM).";
        newTabsWithErrors.add("projects");
      } else if (
        project.startDate &&
        project.endDate &&
        new Date(project.startDate) > new Date(project.endDate)
      ) {
        errors[`projects[${index}].endDate`] =
          "End Date must be after Start Date.";
        newTabsWithErrors.add("projects");
      }
    });

    // Certifications validation
    formData.certifications.forEach((cert, index) => {
      if (!cert.name.trim()) {
        errors[`certifications[${index}].name`] =
          "Certification Name is required.";
        newTabsWithErrors.add("additional");
      }
      if (!cert.issuer.trim()) {
        errors[`certifications[${index}].issuer`] =
          "Issuing Organization is required.";
        newTabsWithErrors.add("additional");
      }
      if (!cert.date.trim()) {
        errors[`certifications[${index}].date`] = "Issue Date is required.";
        newTabsWithErrors.add("additional");
      } else if (!isValidMonthYear(cert.date)) {
        errors[`certifications[${index}].date`] =
          "Invalid date format (YYYY-MM).";
        newTabsWithErrors.add("additional");
      }
      if (cert.expiryDate && !isValidMonthYear(cert.expiryDate)) {
        errors[`certifications[${index}].expiryDate`] =
          "Invalid date format (YYYY-MM).";
        newTabsWithErrors.add("additional");
      } else if (
        cert.date &&
        cert.expiryDate &&
        new Date(cert.date) > new Date(cert.expiryDate)
      ) {
        errors[`certifications[${index}].expiryDate`] =
          "Expiry Date must be after Issue Date.";
        newTabsWithErrors.add("additional");
      }
    });

    setValidationErrors(errors);
    setTabsWithErrors(newTabsWithErrors);
    return Object.keys(errors).length === 0;
  };

  // Handlers
  const handlePersonalInfoChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
    setValidationErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[`personalInfo.${field}`];
      return newErrors;
    });
  };

  const handleSummaryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, summary: value }));
    setValidationErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors["summary"];
      return newErrors;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        showFormError("File size must be less than 2MB");
        setPhoto(null);
        setValidationErrors((prev) => ({
          ...prev,
          photo: "File size must be less than 2MB",
        }));
        return;
      }
      setPhoto(file);
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors["photo"];
        return newErrors;
      });
    } else {
      setPhoto(null);
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors["photo"];
        return newErrors;
      });
    }
  };

  const handleAchievementsChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      achievements: value
        .split("\n")
        .map((a) => a.trim())
        .filter(Boolean),
    }));
  };

  return {
    // State
    template,
    setTemplate,
    photo,
    setPhoto,
    error,
    setError,
    showToast,
    setShowToast,
    activeTab,
    setActiveTab,
    validationErrors,
    setValidationErrors,
    tabsWithErrors,
    setTabsWithErrors,
    formData,
    setFormData,

    // Functions
    showFormError,
    validateForm,

    // Handlers
    handlePersonalInfoChange,
    handleSummaryChange,
    handleFileChange,
    handleAchievementsChange,
  };
}

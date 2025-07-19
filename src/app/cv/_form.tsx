"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type CVFormProps = {
  initialValues?: {
    template?: string;
    content?: any;
    photo?: string | null;
  };
  loading?: boolean;
  onSubmit: (form: {
    template: string;
    content: any;
    photo?: File | null;
  }) => void;
};

export default function CVForm({
  initialValues,
  loading = false,
  onSubmit,
}: CVFormProps) {
  const [template, setTemplate] = useState(initialValues?.template || "ats");
  const [fields, setFields] = useState({
    name: initialValues?.content?.name || "",
    summary: initialValues?.content?.summary || "",
    email: initialValues?.content?.email || "",
    phone: initialValues?.content?.phone || "",
    skills: initialValues?.content?.skills?.join(", ") || "",
    experience: initialValues?.content?.experience || "",
    education: initialValues?.content?.education || "",
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validasi sederhana
    if (!fields.name || !fields.summary || !fields.email) {
      setError("Name, summary, and email are required.");
      return;
    }
    if (!template || !["ats", "creative"].includes(template)) {
      setError("Template must be 'ats' or 'creative'.");
      return;
    }
    if (template === "creative" && !photo && !initialValues?.photo) {
      setError("Photo is required for creative template.");
      return;
    }

    // Build content object
    const content = {
      name: fields.name,
      summary: fields.summary,
      email: fields.email,
      phone: fields.phone,
      skills: fields.skills
        ? fields.skills
            .split(",")
            .map((s: string) => s.trim())
            .filter(Boolean)
        : [],
      experience: fields.experience,
      education: fields.education,
    };

    onSubmit({ template, content, photo });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-6"
    >
      <div>
        <Label htmlFor="template" className="font-medium text-gray-700">
          Template
        </Label>
        <select
          id="template"
          name="template"
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          className="mt-2 block w-full rounded-xl border-gray-200 bg-gray-50 text-gray-900 h-12 px-4"
        >
          <option value="ats">ATS</option>
          <option value="creative">Creative</option>
        </select>
      </div>

      <div>
        <Label htmlFor="name" className="font-medium text-gray-700">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          value={fields.name}
          onChange={handleChange}
          className="mt-2"
          required
        />
      </div>

      <div>
        <Label htmlFor="summary" className="font-medium text-gray-700">
          Summary
        </Label>
        <textarea
          id="summary"
          name="summary"
          value={fields.summary}
          onChange={handleChange}
          className="mt-2 block w-full rounded-xl border-gray-200 bg-gray-50 text-gray-900 h-20 px-4 py-2"
          required
        />
      </div>

      <div>
        <Label htmlFor="email" className="font-medium text-gray-700">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={fields.email}
          onChange={handleChange}
          className="mt-2"
          required
        />
      </div>

      <div>
        <Label htmlFor="phone" className="font-medium text-gray-700">
          Phone
        </Label>
        <Input
          id="phone"
          name="phone"
          value={fields.phone}
          onChange={handleChange}
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="skills" className="font-medium text-gray-700">
          Skills (comma separated)
        </Label>
        <Input
          id="skills"
          name="skills"
          value={fields.skills}
          onChange={handleChange}
          className="mt-2"
          placeholder="e.g. JavaScript, React, Node.js"
        />
      </div>

      <div>
        <Label htmlFor="experience" className="font-medium text-gray-700">
          Experience
        </Label>
        <textarea
          id="experience"
          name="experience"
          value={fields.experience}
          onChange={handleChange}
          className="mt-2 block w-full rounded-xl border-gray-200 bg-gray-50 text-gray-900 h-20 px-4 py-2"
        />
      </div>

      <div>
        <Label htmlFor="education" className="font-medium text-gray-700">
          Education
        </Label>
        <textarea
          id="education"
          name="education"
          value={fields.education}
          onChange={handleChange}
          className="mt-2 block w-full rounded-xl border-gray-200 bg-gray-50 text-gray-900 h-20 px-4 py-2"
        />
      </div>

      {template === "creative" && (
        <div>
          <Label htmlFor="photo" className="font-medium text-gray-700">
            Photo (JPG, PNG, WEBP, max 2MB)
          </Label>
          <Input
            id="photo"
            name="photo"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="mt-2"
          />
          {initialValues?.photo && (
            <div className="mt-2">
              <img
                src={initialValues.photo}
                alt="Current CV Photo"
                className="w-32 h-32 object-cover rounded-xl border border-gray-200"
              />
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg text-center">
          {error}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className={cn(
            "bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {loading ? "Saving..." : "Save CV"}
        </button>
      </div>
    </form>
  );
}

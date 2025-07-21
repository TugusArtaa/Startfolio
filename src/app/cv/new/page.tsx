"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toast } from "@/components/ui/toast";
import CVForm from "../_form";
import type { CVContent } from "@/types/cv";
import { CVHeader } from "@/components/cv/CVHeader";

export default function NewCVPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (form: {
    template: string;
    content: CVContent;
    photo?: File | null;
  }) => {
    setError(null);

    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
      setError("Unauthorized. Please login.");
      setShowToast(true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("template", form.template);
      formData.append("content", JSON.stringify(form.content));
      if (form.photo) formData.append("photo", form.photo);

      const res = await fetch("/api/cv/create", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create CV.");
        setShowToast(true);
      } else {
        setSuccess(true);
        setShowToast(true);
        if (data.cv && data.cv.id) {
          setTimeout(() => {
            router.push(`/cv/${data.cv.id}/preview`);
          }, 1200);
        }
      }
    } catch {
      setError("Failed to create CV.");
      setShowToast(true);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50/30">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-36">
        <CVHeader
          title="Create Your Professional CV"
          description="Build a standout CV that gets you noticed by employers and passes through ATS systems"
        />

        {error && showToast && (
          <Toast
            message={error}
            type="error"
            onClose={() => setShowToast(false)}
          />
        )}

        {success && showToast && (
          <Toast
            message="CV created successfully!"
            type="success"
            onClose={() => setShowToast(false)}
          />
        )}

        <div>
          <CVForm loading={false} onSubmit={handleSubmit} />
        </div>
      </div>
    </main>
  );
}

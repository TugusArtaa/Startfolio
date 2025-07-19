"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CVForm from "../_form";

export default function NewCVPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (form: {
    template: string;
    content: any;
    photo?: File | null;
  }) => {
    setLoading(true);
    setError(null);

    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      setError("Unauthorized. Please login.");
      setLoading(false);
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
      } else {
        router.push("/cv");
      }
    } catch {
      setError("Failed to create CV.");
    }
    setLoading(false);
  };

  return (
    <main className="flex flex-col flex-1 min-h-screen bg-gradient-to-br from-teal-50/50 via-white to-blue-50/30 py-8">
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">
          Create New CV
        </h1>
        <CVForm loading={loading} onSubmit={handleSubmit} />
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg text-center mt-4">
            {error}
          </div>
        )}
      </section>
    </main>
  );
}

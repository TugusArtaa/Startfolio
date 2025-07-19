"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import CVForm from "../../_form";

type CV = {
  id: number;
  template: string;
  content: any;
  photo?: string | null;
};

export default function EditCVPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [cv, setCV] = useState<CV | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCV = async () => {
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
        const res = await fetch(`/api/cv/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Failed to fetch CV.");
        } else {
          setCV(data.cv);
        }
      } catch {
        setError("Failed to fetch CV.");
      }
      setLoading(false);
    };
    if (id) fetchCV();
  }, [id]);

  const handleSubmit = async (form: {
    template: string;
    content: any;
    photo?: File | null;
  }) => {
    setSubmitLoading(true);
    setError(null);
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      setError("Unauthorized. Please login.");
      setSubmitLoading(false);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("template", form.template);
      formData.append("content", JSON.stringify(form.content));
      if (form.photo) formData.append("photo", form.photo);

      const res = await fetch(`/api/cv/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to update CV.");
      } else {
        router.push("/cv");
      }
    } catch {
      setError("Failed to update CV.");
    }
    setSubmitLoading(false);
  };

  return (
    <main className="flex flex-col flex-1 min-h-screen bg-gradient-to-br from-teal-50/50 via-white to-blue-50/30 py-8">
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">
          Edit CV
        </h1>
        {loading ? (
          <div className="text-center py-12 text-teal-600 font-semibold">
            Loading...
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg text-center mt-4">
            {error}
          </div>
        ) : cv ? (
          <CVForm
            initialValues={cv}
            loading={submitLoading}
            onSubmit={handleSubmit}
          />
        ) : (
          <div className="text-center py-12 text-gray-600">CV not found.</div>
        )}
      </section>
    </main>
  );
}

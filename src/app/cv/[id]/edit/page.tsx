"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Toast } from "@/components/ui/toast";
import CVForm from "../../_form";
import { CVHeader } from "@/components/cv/CVHeader";

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
  const [showToast, setShowToast] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchCV = async () => {
      setLoading(true);
      setError(null);
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        setError("Unauthorized. Please login.");
        setLoading(false);
        setShowToast(true);
        return;
      }
      try {
        const res = await fetch(`/api/cv/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Failed to fetch CV.");
          setShowToast(true);
        } else {
          setCV(data.cv);
        }
      } catch {
        setError("Failed to fetch CV.");
        setShowToast(true);
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
      setShowToast(true);
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
        setShowToast(true);
      } else {
        setSuccess(true);
        setShowToast(true);
      }
    } catch {
      setError("Failed to update CV.");
      setShowToast(true);
    }
    setSubmitLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50/30">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-36">
        <CVHeader
          title="Edit Your CV"
          description="Update your CV to keep your professional profile up-to-date"
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
            message="CV updated successfully!"
            type="success"
            onClose={() => {
              setShowToast(false);
              if (cv?.id) {
                router.push(`/cv/${cv.id}/preview`);
              } else {
                router.push("/cv");
              }
            }}
          />
        )}

        <div>
          {loading ? (
            <div className="text-center py-12 text-teal-600 font-semibold">
              Loading...
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
        </div>
      </div>
    </main>
  );
}

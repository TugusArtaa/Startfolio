"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2, AlertCircle, Palette, FileText } from "lucide-react";

type CV = {
  id: number;
  template: string;
  content: any;
  photo?: string | null;
  createdAt: string;
  updatedAt: string;
};

export default function CVDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [cv, setCV] = useState<CV | null>(null);
  const [loading, setLoading] = useState(true);
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

  return (
    <main className="flex flex-col flex-1 min-h-screen bg-gradient-to-br from-teal-50/50 via-white to-blue-50/30 py-8">
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">
          CV Detail
        </h1>
        {loading ? (
          <div className="text-center py-12 text-teal-600 font-semibold">
            <Loader2 className="animate-spin w-8 h-8 inline-block" />
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg text-center mt-4">
            <AlertCircle className="w-5 h-5 inline-block mr-1" />
            {error}
          </div>
        ) : cv ? (
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
              <div className="flex-shrink-0 mb-4 sm:mb-0">
                {cv.photo ? (
                  <img
                    src={cv.photo}
                    alt="CV Photo"
                    className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full border border-gray-200"
                  />
                ) : cv.template === "creative" ? (
                  <div className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center rounded-full bg-gradient-to-br from-pink-100 to-purple-200 text-purple-600">
                    <Palette className="w-10 h-10" />
                  </div>
                ) : (
                  <div className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center rounded-full bg-gradient-to-br from-teal-100 to-teal-200 text-teal-600">
                    <FileText className="w-10 h-10" />
                  </div>
                )}
              </div>
              <div className="ml-0 sm:ml-4 text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                  {cv.template === "creative" ? "Creative CV" : "ATS CV"}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  Created:{" "}
                  {new Date(cv.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  <br />
                  Last Updated:{" "}
                  {new Date(cv.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                CV Content
              </h3>
              <pre className="whitespace-pre-wrap break-words text-gray-700">
                {JSON.stringify(cv.content, null, 2)}
              </pre>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-600">CV not found.</div>
        )}
      </section>
    </main>
  );
}

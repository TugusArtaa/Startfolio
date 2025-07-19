"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle,
  FileText,
  Palette,
  Loader2,
  AlertCircle,
  Pencil,
  Trash2,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

type CV = {
  id: number;
  template: string;
  content: any;
  photo?: string | null;
  createdAt: string;
  updatedAt: string;
};

export default function CVListPage() {
  const { isLoggedIn, userName } = useAuth();
  const [cvs, setCvs] = useState<CV[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCVs = async () => {
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
        const res = await fetch("/api/cv/list", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Failed to fetch CVs.");
        } else {
          setCvs(data.cvs || []);
        }
      } catch {
        setError("Failed to fetch CVs.");
      }
      setLoading(false);
    };
    fetchCVs();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this CV?")) return;
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) return;
    try {
      const res = await fetch(`/api/cv/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setCvs((prev) => prev.filter((cv) => cv.id !== id));
      } else {
        alert(data.error || "Failed to delete CV.");
      }
    } catch {
      alert("Failed to delete CV.");
    }
  };

  return (
    <main className="flex flex-col flex-1 min-h-screen bg-gradient-to-br from-teal-50/50 via-white to-blue-50/30">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="mb-8 text-left sm:text-center">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-2">
            Your CV List
          </h1>
          <p className="text-base sm:text-xl text-gray-600">
            All your created CVs are listed here. You can view, edit, or create
            a new CV.
          </p>
        </div>
        <div className="flex flex-row justify-between items-center mb-6">
          {isLoggedIn && (
            <div className="inline-flex items-center bg-teal-50 text-teal-800 px-4 py-2 rounded-full text-sm font-medium border border-teal-200/50 shadow-sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              Welcome, {userName}
            </div>
          )}
          <Link
            href="/cv/new"
            className="group inline-flex items-center justify-center px-4 py-2 sm:px-8 sm:py-4 text-xs sm:text-lg font-semibold text-white bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl hover:from-teal-700 hover:to-teal-800 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            Create New CV
          </Link>
        </div>
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="animate-spin w-8 h-8 text-teal-600" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
            <span className="text-red-600 text-lg">{error}</span>
          </div>
        ) : cvs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <FileText className="w-10 h-10 text-gray-400 mb-2" />
            <span className="text-gray-600 text-lg">
              No CVs found. Create your first CV!
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cvs.map((cv) => (
              <div
                key={cv.id}
                className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-teal-200 transition-all duration-300 flex flex-col"
              >
                <Link href={`/cv/${cv.id}`} className="flex items-center mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mr-3
                    ${
                      cv.template === "creative"
                        ? "bg-gradient-to-br from-pink-100 to-purple-200 text-purple-600"
                        : "bg-gradient-to-br from-teal-100 to-teal-200 text-teal-600"
                    }`}
                  >
                    {cv.template === "creative" ? (
                      <Palette className="w-6 h-6" />
                    ) : (
                      <FileText className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <span className="text-lg font-bold text-gray-900">
                      {cv.template === "creative" ? "Creative CV" : "ATS CV"}
                    </span>
                  </div>
                </Link>
                <div className="flex-1 mb-4">
                  <span className="text-gray-600 text-sm">
                    Created: {new Date(cv.createdAt).toLocaleDateString()}
                  </span>
                  <br />
                  <span className="text-gray-600 text-sm">
                    Last Updated: {new Date(cv.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                {cv.photo && (
                  <div className="mb-4">
                    <img
                      src={cv.photo}
                      alt="CV Photo"
                      className="w-full h-32 object-cover rounded-xl border border-gray-200"
                    />
                  </div>
                )}
                <div className="flex justify-between items-center mt-auto pt-2 gap-2">
                  <Link
                    href={`/cv/${cv.id}/edit`}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold hover:bg-teal-100 transition"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(cv.id)}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-semibold hover:bg-red-100 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                  <Link
                    href={`/cv/${cv.id}`}
                    className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold hover:bg-teal-100 transition"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

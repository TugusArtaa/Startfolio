"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Toast } from "@/components/ui/toast";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Register failed");
    } else {
      setSuccess("Register success! Silakan login.");
      setForm({ name: "", email: "", password: "" });
      setTimeout(() => {
        window.location.href = "/login";
      }, 1200);
    }
  };

  return (
    <>
      {success && <Toast message={success} onClose={() => setSuccess(null)} />}
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-2 sm:px-4">
        <div className="w-full max-w-md lg:max-w-5xl">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-teal-100 rounded-full -translate-y-8 sm:-translate-y-16 translate-x-8 sm:translate-x-16 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-teal-200 rounded-full translate-y-6 sm:translate-y-12 -translate-x-6 sm:-translate-x-12 opacity-30"></div>

            <div className="flex flex-col lg:flex-row min-h-[600px]">
              <div className="hidden lg:flex bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700 px-6 py-8 sm:px-8 sm:py-12 lg:p-16 text-white lg:w-2/5 flex-col justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <pattern
                        id="grid"
                        width="10"
                        height="10"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 10 0 L 0 0 0 10"
                          fill="none"
                          stroke="white"
                          strokeWidth="0.5"
                        />
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#grid)" />
                  </svg>
                </div>

                <div className="relative z-10">
                  <div className="mb-8">
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                      </svg>
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                      Already have an account?
                    </h1>
                    <p className="text-teal-100 mb-8 leading-relaxed text-lg">
                      Log in to access and edit your CV anytime.
                    </p>
                  </div>

                  <button
                    onClick={() => (window.location.href = "/login")}
                    className="group bg-white text-teal-600 font-semibold px-8 py-4 rounded-xl hover:bg-teal-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-3"
                  >
                    <span>Login</span>
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="px-4 py-8 sm:px-6 sm:py-12 lg:p-16 w-full lg:w-3/5 flex items-center">
                <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">
                      Create Account
                    </h2>
                    <p className="text-gray-600">
                      Register now and build your CV easily.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <LabelInputContainer>
                      <Label
                        htmlFor="name"
                        className="text-gray-700 font-medium"
                      >
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter your full name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 h-12 rounded-xl"
                      />
                      {error && error.toLowerCase().includes("name") && (
                        <span className="text-red-600 text-xs mt-1">
                          {error}
                        </span>
                      )}
                    </LabelInputContainer>

                    <LabelInputContainer>
                      <Label
                        htmlFor="email"
                        className="text-gray-700 font-medium"
                      >
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        placeholder="Enter your email address"
                        type="text"
                        value={form.email}
                        onChange={handleChange}
                        className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 h-12 rounded-xl"
                      />
                      {error && error.toLowerCase().includes("email") && (
                        <span className="text-red-600 text-xs mt-1">
                          {error}
                        </span>
                      )}
                    </LabelInputContainer>

                    <LabelInputContainer>
                      <Label
                        htmlFor="password"
                        className="text-gray-700 font-medium"
                      >
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          placeholder="Create a strong password"
                          type={showPassword ? "text" : "password"}
                          value={form.password}
                          onChange={handleChange}
                          className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 h-12 rounded-xl pr-10"
                        />
                        <button
                          type="button"
                          tabIndex={-1}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-600"
                          onClick={() => setShowPassword((v) => !v)}
                        >
                          {showPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                      {error && error.toLowerCase().includes("password") && (
                        <span className="text-red-600 text-xs mt-1">
                          {error}
                        </span>
                      )}
                    </LabelInputContainer>

                    <div className="flex justify-end">
                      <button
                        className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Creating Account...
                          </div>
                        ) : (
                          "Create Account"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>
    {children}
  </div>
);

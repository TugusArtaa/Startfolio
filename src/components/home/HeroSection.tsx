"use client";
import Link from "next/link";
import {
  CheckCircle,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  Download,
  Smartphone,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export function HeroSection() {
  const { isLoggedIn, userName } = useAuth();
  return (
    <section className="relative min-h-[70vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-white to-blue-50/30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(20,184,166,0.08),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.06),transparent_50%)]"></div>
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-24">
        <div className="text-left sm:text-center space-y-6 sm:space-y-8">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-teal-200/50 text-teal-700 px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-medium shadow-sm">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Trusted by 10,000+ professionals worldwide
          </div>
          <div className="space-y-4 sm:space-y-6 text-left sm:text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight tracking-tight">
              Create Your Perfect
              <span className="block bg-gradient-to-r from-teal-600 via-teal-700 to-blue-600 bg-clip-text text-transparent mt-2">
                Professional CV
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto text-left sm:text-center">
              Build professional ATS-friendly resumes or stunning creative CVs
              in minutes. Choose from our collection of expertly designed
              templates.
            </p>
          </div>
          <div className="w-full mt-4 sm:mt-0 mb-4 sm:mb-0">
            {isLoggedIn ? (
              <div className="flex flex-row justify-start sm:justify-center items-center gap-2 sm:gap-4 w-full max-w-xl mx-auto">
                <div className="inline-flex items-center justify-center bg-teal-50 text-teal-800 px-3 py-2 sm:px-6 sm:py-4 rounded-full text-xs sm:text-base font-medium border border-teal-200/50 shadow-sm min-h-[40px] sm:min-h-[56px] w-auto text-left">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Welcome back, {userName}!
                </div>
                <Link
                  href="/cv/new"
                  className="group inline-flex items-center justify-center px-4 py-2 sm:px-8 sm:py-4 text-xs sm:text-lg font-semibold text-white bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl hover:from-teal-700 hover:to-teal-800 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg min-h-[40px] sm:min-h-[56px] w-auto"
                >
                  Create New CV
                  <ArrowRight className="ml-2 sm:ml-3 w-4 h-4 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ) : (
              <div className="flex flex-row justify-start sm:justify-center items-center gap-2 sm:gap-4 w-full max-w-xl mx-auto">
                <Link
                  href="/register"
                  className="group inline-flex items-center justify-center px-4 py-2 sm:px-8 sm:py-4 text-xs sm:text-lg font-semibold text-white bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl hover:from-teal-700 hover:to-teal-800 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg min-h-[40px] sm:min-h-[56px] w-auto"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 sm:ml-3 w-4 h-4 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center px-4 py-2 sm:px-8 sm:py-4 text-xs sm:text-lg font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-lg min-h-[40px] sm:min-h-[56px] w-auto"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
          <div className="pt-6 sm:pt-16 space-y-4 sm:space-y-6">
            <div className="flex flex-wrap justify-start sm:justify-center gap-2 sm:gap-3 max-w-4xl mx-auto">
              <div className="inline-flex items-center bg-white/70 backdrop-blur-sm border border-green-200/50 text-green-700 px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                ATS-Friendly
              </div>
              <div className="inline-flex items-center bg-white/70 backdrop-blur-sm border border-blue-200/50 text-blue-700 px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                5-Min Setup
              </div>
              <div className="inline-flex items-center bg-white/70 backdrop-blur-sm border border-purple-200/50 text-purple-700 px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300">
                <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Instant PDF
              </div>
              <div className="inline-flex items-center bg-white/70 backdrop-blur-sm border border-orange-200/50 text-orange-700 px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300">
                <Smartphone className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Mobile Friendly
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import {
  CheckCircle,
  ArrowRight,
  Palette,
  Target,
  Download,
  Sparkles,
  Zap,
  Shield,
  Smartphone,
} from "lucide-react";

import { useAuth } from "../hooks/useAuth";
import {
  features,
  howItWorks,
  atsTemplateFeatures,
  creativeTemplateFeatures,
} from "../data/homepage";

export default function HomePage() {
  const { isLoggedIn, userName } = useAuth();

  return (
    <main className="flex flex-col flex-1">
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
                    href="/cv/create"
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

      <section className="py-10 sm:py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-1 sm:gap-6 md:grid-cols-3 md:gap-12 text-center">
            <div>
              <div className="text-base sm:text-2xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent mb-1 sm:mb-3">
                12k+
              </div>
              <div className="text-gray-600 font-medium text-xs sm:text-lg">
                CV Created This Month
              </div>
            </div>
            <div>
              <div className="text-base sm:text-2xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent mb-1 sm:mb-3">
                ATS
              </div>
              <div className="text-gray-600 font-medium text-xs sm:text-lg">
                Optimized Designs
              </div>
            </div>
            <div>
              <div className="text-base sm:text-2xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent mb-1 sm:mb-3">
                PDF
              </div>
              <div className="text-gray-600 font-medium text-xs sm:text-lg">
                Export Ready
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-28 bg-teal-50/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left sm:text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-2">
              Why Choose Our CV Generator?
            </h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Everything you need to create professional CVs that stand out from
              the crowd
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 md:gap-12">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 hover:border-gray-200"
              >
                <div
                  className={`w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-br ${feature.gradient} ${feature.iconColor} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 transition-transform duration-300`}
                >
                  <feature.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-base sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-4">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left sm:text-center mb-8 sm:mb-16">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-2">
              Choose Your Perfect Template Style
            </h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Whether you need an ATS-friendly format or a creative design, we
              have the perfect template for your industry
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-12">
            <div className="group bg-gradient-to-br from-gray-50 to-white p-5 sm:p-10 rounded-2xl sm:rounded-3xl border border-gray-200 hover:border-teal-200">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-teal-100 to-teal-200 text-teal-600 rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4 transition-transform duration-300">
                  <Target className="w-5 h-5 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-gray-900">
                  ATS Templates
                </h3>
              </div>
              <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-lg">
                Clean, professional layouts optimized for Applicant Tracking
                Systems. Perfect for corporate jobs, finance, consulting, and
                traditional industries.
              </p>
              <ul className="space-y-2 sm:space-y-4">
                {atsTemplateFeatures.map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <CheckCircle className="w-4 h-4 text-teal-600 mr-2 flex-shrink-0" />
                    <span className="font-medium text-xs sm:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="group bg-gradient-to-br from-gray-50 to-white p-5 sm:p-10 rounded-2xl sm:rounded-3xl border border-gray-200 hover:border-teal-200">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-teal-100 to-teal-200 text-teal-600 rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4 transition-transform duration-300">
                  <Palette className="w-5 h-5 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-gray-900">
                  Creative Templates
                </h3>
              </div>
              <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-lg">
                Eye-catching designs that showcase your creativity. Ideal for
                graphic design, marketing, advertising, and creative industries.
              </p>
              <ul className="space-y-2 sm:space-y-4">
                {creativeTemplateFeatures.map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <CheckCircle className="w-4 h-4 text-teal-600 mr-2 flex-shrink-0" />
                    <span className="font-medium text-xs sm:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-24 bg-teal-50/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left sm:text-center mb-8 sm:mb-16">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-2">
              How It Works
            </h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Create your professional CV in just 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 md:gap-12 relative">
            {howItWorks.map((item) => (
              <div key={item.step} className="relative">
                <div className="p-4 sm:p-8 text-left sm:text-center relative z-10 rounded-xl sm:rounded-2xl shadow-sm">
                  <div className="mb-4 sm:mb-6">
                    <div
                      className={`w-10 h-10 sm:w-16 sm:h-16 ${item.iconBg} rounded-xl sm:rounded-2xl flex items-center justify-center mx-0 sm:mx-auto mb-2 sm:mb-4 transition-transform duration-300`}
                    >
                      <span className="text-lg sm:text-2xl font-bold text-white">
                        {item.step}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-2 sm:mb-4">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-xs mx-0 sm:mx-auto">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

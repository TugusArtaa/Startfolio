import { Target, Palette, CheckCircle } from "lucide-react";
import {
  atsTemplateFeatures,
  creativeTemplateFeatures,
} from "../../data/homepage";

export function TemplatesSection() {
  return (
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
  );
}

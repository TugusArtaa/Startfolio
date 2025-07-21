import { howItWorks } from "../../data/homepage";

export function HowItWorksSection() {
  return (
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
  );
}

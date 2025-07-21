import { features } from "../../data/homepage";

export function FeaturesSection() {
  return (
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
          {features.map((feature) => (
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
  );
}

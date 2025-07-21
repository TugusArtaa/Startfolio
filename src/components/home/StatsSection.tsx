export function StatsSection() {
  return (
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
  );
}

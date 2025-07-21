import { FileText, Sparkles } from "lucide-react";

export function CVHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center mb-8">
      <div className="flex flex-col items-center gap-2 mb-4">
        <div className="relative flex items-center justify-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
            <FileText className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
          </div>
        </div>
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-teal-800 to-teal-800 bg-clip-text text-transparent mb-2 sm:mb-4 text-center leading-tight">
        {title}
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xl sm:max-w-2xl mx-auto mb-2 text-center">
        {description}
      </p>
    </div>
  );
}

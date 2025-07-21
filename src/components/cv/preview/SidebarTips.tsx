import { Settings } from "lucide-react";

export function SidebarTips() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-blue-100 rounded-xl">
          <Settings className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h2 className="font-semibold text-gray-900">Tips</h2>
          <p className="text-sm text-gray-500">Optimize your CV</p>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-start space-x-2">
          <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
          <p className="text-sm text-gray-600">Keep it to 1-2 pages maximum</p>
        </div>
        <div className="flex items-start space-x-2">
          <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
          <p className="text-sm text-gray-600">
            Use action verbs in descriptions
          </p>
        </div>
        <div className="flex items-start space-x-2">
          <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
          <p className="text-sm text-gray-600">Quantify your achievements</p>
        </div>
      </div>
    </div>
  );
}

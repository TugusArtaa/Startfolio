import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { CV } from "@/types/cv";

export function SidebarInfo({
  cv,
  error,
  showToast,
  setShowToast,
}: {
  cv: CV | null;
  error: string | null;
  showToast: boolean;
  setShowToast: (v: boolean) => void;
}) {
  const router = useRouter();
  if (!cv) return null;
  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-green-100 rounded-xl">
            <User className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">CV Information</h2>
            <p className="text-sm text-gray-500">Document details</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Name</span>
            <span className="text-sm font-medium text-gray-900 truncate ml-2 max-w-32">
              {cv.content?.personalInfo?.name || "Not specified"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Template</span>
            <span className="text-sm font-medium text-gray-900 capitalize">
              {cv.template}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Email</span>
            <span className="text-sm font-medium text-gray-900 truncate ml-2 max-w-32">
              {cv.content?.personalInfo?.email || "Not specified"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Phone</span>
            <span className="text-sm font-medium text-gray-900">
              {cv.content?.personalInfo?.phone || "Not specified"}
            </span>
          </div>
          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Status</span>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm font-medium text-green-600">
                  Ready
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button
        variant="outline"
        className="w-full mt-2"
        onClick={() => router.push("/cv")}
      >
        ← Back to List CV
      </Button>
      {error && showToast && (
        <div className="bg-red-50 rounded-2xl shadow-sm p-4 border border-red-200">
          <Toast
            message={error}
            type="error"
            onClose={() => setShowToast(false)}
          />
        </div>
      )}
    </>
  );
}

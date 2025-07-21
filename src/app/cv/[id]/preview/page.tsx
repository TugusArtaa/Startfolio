"use client";
import { useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Download, FileText } from "lucide-react";
import { AtsTemplate } from "@/components/cv-templates/ats-template";
import { CreativeTemplate } from "@/components/cv-templates/creative-template";
import { CVHeader } from "@/components/cv/CVHeader";
import { useCVPreview } from "@/hooks/useCVPreview";
import { exportCVToPDF } from "@/lib/exportPdf";
import { SidebarInfo } from "@/components/cv/preview/SidebarInfo";
import { SidebarTips } from "@/components/cv/preview/SidebarTips";

export default function CVPreviewPage() {
  const params = useParams();
  const id = params?.id as string;
  const { cv, loading, error, showToast, setShowToast } = useCVPreview(id);
  const [exporting, setExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    if (!previewRef.current || !cv) return;
    setExporting(true);
    try {
      await exportCVToPDF(
        previewRef.current,
        `cv-${cv?.content?.personalInfo?.name || "preview"}.pdf`
      );
    } catch (err) {
      setShowToast(true);
    } finally {
      setExporting(false);
    }
  };

  function getSafeCVContent(content: any) {
    return {
      personalInfo: {
        name: content?.personalInfo?.name || "",
        email: content?.personalInfo?.email || "",
        phone: content?.personalInfo?.phone || "",
        address: content?.personalInfo?.address || "",
        linkedin: content?.personalInfo?.linkedin || "",
        website: content?.personalInfo?.website || "",
        github: content?.personalInfo?.github || "",
      },
      summary: content?.summary || "",
      workExperience: Array.isArray(content?.workExperience)
        ? content.workExperience
        : [],
      education: Array.isArray(content?.education) ? content.education : [],
      skills: {
        technical: Array.isArray(content?.skills?.technical)
          ? content.skills.technical
          : [],
        soft: Array.isArray(content?.skills?.soft) ? content.skills.soft : [],
        languages: Array.isArray(content?.skills?.languages)
          ? content.skills.languages
          : [],
      },
      projects: Array.isArray(content?.projects) ? content.projects : [],
      certifications: Array.isArray(content?.certifications)
        ? content.certifications
        : [],
      achievements: Array.isArray(content?.achievements)
        ? content.achievements
        : [],
    };
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-36">
        <CVHeader
          title="CV Preview"
          description="View and export your professional CV as PDF."
        />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-teal-100 rounded-xl">
                  <Download className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">Export CV</h2>
                  <p className="text-sm text-gray-500">Download as PDF</p>
                </div>
              </div>
              <Button
                onClick={handleExportPDF}
                disabled={loading || exporting || !cv}
                className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-medium px-4 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {exporting ? (
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                ) : (
                  <Download className="h-4 w-4 mr-2" />
                )}
                {exporting ? "Generating PDF..." : "Download PDF"}
              </Button>
            </div>
            <SidebarTips />
            <SidebarInfo
              cv={cv}
              error={error}
              showToast={showToast}
              setShowToast={setShowToast}
            />
          </div>
          <div className="lg:col-span-9">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-600 font-medium">
                    {cv?.content?.personalInfo?.name
                      ? `${cv.content.personalInfo.name}'s CV`
                      : "CV Preview"}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Live Preview</span>
                </div>
              </div>
              <div className="p-6 min-h-[800px] flex items-center justify-center">
                {loading ? (
                  <div className="flex flex-col items-center space-y-4">
                    <Loader2 className="animate-spin h-12 w-12 text-teal-600" />
                    <p className="text-gray-600 font-medium">
                      Loading your CV...
                    </p>
                  </div>
                ) : cv ? (
                  <div className="w-full flex justify-center">
                    <div
                      ref={previewRef}
                      id="cv-preview"
                      className="bg-white shadow-md mx-auto w-full max-w-[794px] rounded-lg overflow-hidden"
                      style={{ minHeight: 800 }}
                    >
                      {cv.template === "ats" ? (
                        <AtsTemplate {...getSafeCVContent(cv.content)} />
                      ) : (
                        <CreativeTemplate
                          {...getSafeCVContent(cv.content)}
                          photo={cv.photo}
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-4">
                    <div className="p-4 bg-gray-200 rounded-full">
                      <FileText className="h-12 w-12 text-gray-400" />
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600 text-lg font-medium">
                        CV not found
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        The requested CV could not be loaded.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

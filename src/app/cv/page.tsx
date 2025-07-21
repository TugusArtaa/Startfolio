"use client";
import Link from "next/link";
import { Plus, Search, Filter, Trash, FileText, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toast } from "@/components/ui/toast";
import { useCVList } from "@/hooks/useCVList";
import { CVCard } from "@/components/cv/CVCard";
import { PaginationControls } from "@/components/cv/PaginationControls";
import { CVHeader } from "@/components/cv/CVHeader";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function CVListPage() {
  const {
    cvs,
    filteredCvs,
    currentCvs,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    filterTemplate,
    setFilterTemplate,
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    endIndex,
    setCvs,
    setFilteredCvs,
  } = useCVList();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [cvToDelete, setCvToDelete] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (error) setShowToast(true);
  }, [error]);

  const handleDeleteClick = (id: number) => {
    setCvToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!cvToDelete) return;
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) return;
    try {
      const res = await fetch(`/api/cv/${cvToDelete}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setCvs((prev) => prev.filter((cv) => cv.id !== cvToDelete));
        setFilteredCvs((prev) => prev.filter((cv) => cv.id !== cvToDelete));
        const newTotalPages = Math.ceil((filteredCvs.length - 1) / 9);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
        setSuccess(true);
        setShowToast(true);
      } else {
        setShowToast(true);
      }
    } catch {
      setShowToast(true);
    }
    setDeleteDialogOpen(false);
    setCvToDelete(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        {error && showToast && (
          <Toast
            message={error}
            type="error"
            onClose={() => setShowToast(false)}
          />
        )}
        {success && showToast && (
          <Toast
            message="CV deleted successfully!"
            type="success"
            onClose={() => {
              setShowToast(false);
              setSuccess(false);
            }}
          />
        )}

        <CVHeader
          title="Your CV Collection"
          description="Manage and organize all your professional CV in one place"
        />

        <Card className="mb-8">
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search CV by name, email, or template..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-row w-full sm:w-auto items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <Select
                  value={filterTemplate}
                  onValueChange={setFilterTemplate}
                >
                  <SelectTrigger className="w-[140px] sm:w-[180px]">
                    <SelectValue placeholder="Filter by template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Templates</SelectItem>
                    <SelectItem value="ats">ATS Optimized</SelectItem>
                    <SelectItem value="creative">Creative</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  asChild
                  size="lg"
                  className="flex-1 sm:flex-shrink-0 w-full sm:w-auto bg-gradient-to-r from-emerald-400 to-emerald-500/90 hover:from-emerald-500 hover:to-emerald-600 hover:-translate-y-1 shadow-md hover:shadow-lg transition-transform duration-250"
                >
                  <Link href="/cv/new">
                    <Plus className="h-5 w-5 mr-2" />
                    <span className="hidden sm:inline">Create New CV</span>
                    <span className="inline sm:hidden">New CV</span>
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <Card>
            <CardContent className="flex justify-center items-center py-12">
              <div className="text-center">
                <Loader className="animate-spin w-8 h-8 text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">Loading your CV...</p>
              </div>
            </CardContent>
          </Card>
        ) : filteredCvs.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {cvs.length === 0
                    ? "No CV Created Yet"
                    : "No CV Match Your Search"}
                </h3>
                <p className="text-gray-600 mb-6 max-w-md">
                  {cvs.length === 0
                    ? "Start building your professional CV today and take the next step in your career journey."
                    : "Try adjusting your search terms or filters to find what you're looking for."}
                </p>
                {cvs.length === 0 && (
                  <Button asChild size="lg">
                    <Link href="/cv/new">
                      <Plus className="h-5 w-5 mr-2" />
                      Create Your First CV
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="mb-6 flex flex-row items-center justify-between gap-2">
              <p className="text-sm text-gray-600">
                Showing {startIndex + 1}-
                {Math.min(endIndex, filteredCvs.length)} of {filteredCvs.length}{" "}
                CV
                {filteredCvs.length !== cvs.length &&
                  ` (filtered from ${cvs.length} total)`}
              </p>
              {totalPages > 1 && (
                <p className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCvs.map((cv) => (
                <CVCard key={cv.id} cv={cv} onDelete={handleDeleteClick} />
              ))}
            </div>
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete CV</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this CV? This action cannot be
                undone and will permanently remove all CV data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
                className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete CV
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

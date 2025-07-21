import { useEffect, useState } from "react";
import { CV } from "@/types/cv";

const ITEMS_PER_PAGE = 9;

export function useCVList() {
  const [cvs, setCvs] = useState<CV[]>([]);
  const [filteredCvs, setFilteredCvs] = useState<CV[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTemplate, setFilterTemplate] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchCVs = async () => {
      setLoading(true);
      setError(null);
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        setError("Unauthorized. Please login.");
        setLoading(false);
        return;
      }
      try {
        const res = await fetch("/api/cv/list", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Failed to fetch CV.");
        } else {
          setCvs(data.cvs || []);
          setFilteredCvs(data.cvs || []);
        }
      } catch {
        setError("Failed to fetch CV.");
      }
      setLoading(false);
    };
    fetchCVs();
  }, []);

  useEffect(() => {
    let filtered = cvs;
    if (filterTemplate !== "all") {
      filtered = filtered.filter((cv) => cv.template === filterTemplate);
    }
    if (searchTerm) {
      filtered = filtered.filter((cv) => {
        const name = cv.content?.personalInfo?.name?.toLowerCase() || "";
        const email = cv.content?.personalInfo?.email?.toLowerCase() || "";
        const template = cv.template.toLowerCase();
        const searchLower = searchTerm.toLowerCase();
        return (
          name.includes(searchLower) ||
          email.includes(searchLower) ||
          template.includes(searchLower)
        );
      });
    }
    setFilteredCvs(filtered);
    setCurrentPage(1);
  }, [cvs, searchTerm, filterTemplate]);

  const totalPages = Math.ceil(filteredCvs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCvs = filteredCvs.slice(startIndex, endIndex);

  return {
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
  };
}

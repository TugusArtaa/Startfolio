import { useEffect, useState } from "react";
import { CV } from "@/types/cv";

export function useCVPreview(id: string | undefined) {
  const [cv, setCV] = useState<CV | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchCV = async () => {
      setLoading(true);
      setError(null);
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        setError("Unauthorized. Please login.");
        setShowToast(true);
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`/api/cv/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Failed to fetch CV.");
          setShowToast(true);
        } else {
          setCV(data.cv);
        }
      } catch {
        setError("Failed to fetch CV.");
        setShowToast(true);
      }
      setLoading(false);
    };
    if (id) fetchCV();
  }, [id]);

  return { cv, loading, error, showToast, setShowToast };
}

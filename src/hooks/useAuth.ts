"use client";
import { useEffect, useState } from "react";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserName(payload.name || null);
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
        setUserName(null);
      }
    } else {
      setIsLoggedIn(false);
      setUserName(null);
    }
  }, []);

  return { isLoggedIn, userName };
}

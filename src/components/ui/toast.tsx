"use client";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

const iconBg = {
  success: "bg-teal-100 text-teal-600",
  error: "bg-red-100 text-red-600",
  warning: "bg-yellow-100 text-yellow-600",
  info: "bg-blue-100 text-blue-600",
};

const toastIcons = {
  success: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4"
      />
    </svg>
  ),
  error: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 9l-6 6M9 9l6 6"
      />
    </svg>
  ),
  warning: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8v4m0 4h.01"
      />
    </svg>
  ),
  info: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 16v-4m0-4h.01"
      />
    </svg>
  ),
};

export function Toast({
  message,
  type = "success",
  duration = 4000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed top-4 right-4 z-[9999] animate-in slide-in-from-right-full duration-300">
      <div
        className={cn(
          "flex items-center gap-4 px-3 py-2 sm:px-4 sm:py-3 rounded-xl shadow-lg border border-gray-100 bg-white min-w-[200px] max-w-[90vw] sm:min-w-[260px] sm:max-w-xs",
          "transition-all"
        )}
      >
        <span
          className={cn(
            "flex items-center justify-center rounded-full w-9 h-9 sm:w-10 sm:h-10",
            iconBg[type]
          )}
        >
          {toastIcons[type]}
        </span>
        <span className="text-gray-700 text-xs sm:text-sm font-medium flex-1">
          {message}
        </span>
        <button
          onClick={onClose}
          className="ml-2 text-gray-400 hover:text-red-500 focus:text-red-500 transition-colors duration-200"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 6l12 12M6 18L18 6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

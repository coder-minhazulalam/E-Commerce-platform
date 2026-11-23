"use client";

import React, { useEffect } from "react";

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export function ToastNotification({ message, onClose }: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 2800);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 bg-[#31302d] text-[#f3f0eb] px-5 py-3.5 shadow-2xl transition-all duration-300 flex items-center gap-3 border border-white/10 animate-in fade-in slide-in-from-bottom-4"
    >
      <span className="material-symbols-outlined text-[18px] text-[#fed892]">
        check_circle
      </span>
      <span className="text-xs font-medium tracking-wide">{message}</span>
      <button
        type="button"
        onClick={onClose}
        className="ml-2 text-white/60 hover:text-white cursor-pointer"
        aria-label="Close notification"
      >
        <span className="material-symbols-outlined text-[16px]">close</span>
      </button>
    </div>
  );
}

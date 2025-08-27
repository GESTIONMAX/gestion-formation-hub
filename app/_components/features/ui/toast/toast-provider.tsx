"use client";

import React from "react";
import { Toaster as SonnerToaster } from "sonner";

export interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <SonnerToaster 
        position="top-right"
        toastOptions={{
          style: {
            background: "#fff",
            color: "#333",
            border: "1px solid #ddd",
          },
          duration: 5000,
        }}
      />
    </>
  );
}

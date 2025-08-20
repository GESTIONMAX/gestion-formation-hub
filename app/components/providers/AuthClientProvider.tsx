"use client";

import { AuthProvider } from "../../hooks/useAuth";
import { ReactNode } from "react";

export function AuthClientProvider({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}

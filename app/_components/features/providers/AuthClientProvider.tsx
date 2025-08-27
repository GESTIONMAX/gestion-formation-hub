"use client";

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "../../_lib/hooks/useAuth";
import { ReactNode } from "react";

export function AuthClientProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </SessionProvider>
  );
}

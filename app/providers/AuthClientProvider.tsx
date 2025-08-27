"use client";

import { SessionProvider as NextAuthProvider } from "next-auth/react";
import { ReactNode } from "react";

export function AuthClientProvider({ children }: { children: ReactNode }) {
  return (
    <NextAuthProvider>
      {children}
    </NextAuthProvider>
  );
}

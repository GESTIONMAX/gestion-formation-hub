"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

// Ce hook sert de compatibilité entre l'ancien système useAuth et NextAuth
export function useNextAuthCompat() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Fournit une interface compatible avec l'ancien hook useAuth
  return {
    user: session?.user ? {
      id: session.user.id || "",
      email: session.user.email || "",
      name: session.user.name || "",
      role: session.user.role || "user"
    } : null,
    loading: status === "loading",
    error: null,
    logout: async () => {
      await signOut({ redirect: false });
      router.push("/login");
    }
  };
}

export default useNextAuthCompat;

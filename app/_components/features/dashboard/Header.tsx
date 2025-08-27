"use client";

import { Button } from "@/components/ui/button";
import { useNextAuthCompat } from "@/lib/hooks/useNextAuthCompat";
import Link from "next/link";

export default function Header() {
  const { user, logout } = useNextAuthCompat();

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-900">
          GestionMax Formation Hub
        </Link>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm text-gray-700">
                Connecté en tant que {user.email}
              </span>
              <Button variant="outline" onClick={logout}>
                Déconnexion
              </Button>
            </>
          ) : (
            <Button asChild variant="outline">
              <Link href="/login">Connexion</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

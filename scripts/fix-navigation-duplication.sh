#!/bin/bash

# Script pour résoudre les problèmes de navigation dupliquée
PROJECT_ROOT="/home/gestionmax-aur-lien/CascadeProjects/lovable/gestionmax-formation-hub"
BACKUP_DIR="${PROJECT_ROOT}/ARCHIVES/navigation_backup_$(date +%Y%m%d_%H%M%S)"

# Créer un dossier de sauvegarde
mkdir -p "$BACKUP_DIR"
echo "Répertoire de sauvegarde créé: $BACKUP_DIR"

# Sauvegarder les fichiers avant modification
echo "Sauvegarde des fichiers de navigation..."
cp -r "${PROJECT_ROOT}/components/shared/navigation" "$BACKUP_DIR/"
cp -r "${PROJECT_ROOT}/app/_components/core/layout" "$BACKUP_DIR/"

# 1. Corriger le Header.tsx pour ne pas inclure de Navigation
sed -i 's/import Navigation from ".\/\/Navigation";//g' "${PROJECT_ROOT}/app/_components/core/layout/Header.tsx"
sed -i 's/<Navigation \/>//g' "${PROJECT_ROOT}/app/_components/core/layout/Header.tsx"

# 2. Créer un nouveau composant Navigation unique qui sera utilisé partout
cat > "${PROJECT_ROOT}/components/shared/navigation/unified-nav.tsx" << 'EOL'
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "../../../lib/utils";
import { Button } from "../../ui/button";

const UnifiedNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const routes = [
    {
      href: "/",
      label: "Accueil",
      active: pathname === "/",
    },
    {
      href: "/formations",
      label: "Formations",
      active: pathname.startsWith("/formations"),
    },
    {
      href: "/sur-mesure",
      label: "Sur-mesure",
      active: pathname === "/sur-mesure",
    },
    {
      href: "/a-propos",
      label: "À propos",
      active: pathname === "/a-propos",
    },
    {
      href: "/contact",
      label: "Contact",
      active: pathname === "/contact",
    },
  ];

  return (
    <nav className="w-full bg-white border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-semibold text-blue-600">
                GestionMax Formation
              </span>
            </Link>
          </div>
          
          {/* Menu desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md",
                    route.active
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  {route.label}
                </Link>
              ))}
              <Button asChild size="sm" className="ml-3">
                <Link href="/connexion">
                  Connexion
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Hamburger menu */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded="false"
            >
              <span className="sr-only">Ouvrir le menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  route.active
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                )}
                onClick={() => setMenuOpen(false)}
              >
                {route.label}
              </Link>
            ))}
            <Button asChild className="w-full mt-2">
              <Link href="/connexion" onClick={() => setMenuOpen(false)}>
                Connexion
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default UnifiedNav;
EOL

# 3. Modifier le layout racine pour utiliser UnifiedNav
sed -i 's/import MainNav from "..\/components\/shared\/navigation\/main-nav";/import UnifiedNav from "..\/components\/shared\/navigation\/unified-nav";/g' "${PROJECT_ROOT}/app/layout.tsx"
sed -i 's/<MainNav \/>/<UnifiedNav \/>/g' "${PROJECT_ROOT}/app/layout.tsx"

# 4. Désactiver les autres navigations potentiellement conflictuelles
# Renommer le fichier Navigation.tsx pour qu'il ne soit plus utilisé
if [ -f "${PROJECT_ROOT}/app/_components/core/layout/Navigation.tsx" ]; then
  mv "${PROJECT_ROOT}/app/_components/core/layout/Navigation.tsx" "${PROJECT_ROOT}/app/_components/core/layout/Navigation.tsx.bak"
fi

echo "Terminé! La navigation a été unifiée."
echo "Vous devez redémarrer le serveur Next.js pour voir les changements."

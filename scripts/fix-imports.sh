#!/bin/bash

# Script pour corriger tous les problèmes d'importation
PROJECT_ROOT="/home/gestionmax-aur-lien/CascadeProjects/lovable/gestionmax-formation-hub"

echo "Nettoyage du cache Next.js..."
rm -rf "${PROJECT_ROOT}/.next"

echo "Correction des chemins d'importation dans les providers..."

# 1. Correction des providers dans layout.tsx
sed -i 's|import { ClientProviders } from \'\./components/providers/ClientProviders\';|import { ClientProviders } from \'./_components/features/providers/ClientProviders\';|g' "${PROJECT_ROOT}/app/layout.tsx"
sed -i 's|import { ReactQueryProvider } from \'\./components/providers/ReactQueryProvider\';|import { ReactQueryProvider } from \'./_components/features/providers/ReactQueryProvider\';|g' "${PROJECT_ROOT}/app/layout.tsx"
sed -i 's|import { AuthClientProvider } from \'\./components/providers/AuthClientProvider\';|import { AuthClientProvider } from \'./_components/features/providers/AuthClientProvider\';|g' "${PROJECT_ROOT}/app/layout.tsx"
sed -i 's|import { BodyAttributes } from \'\./components/providers/BodyAttributes\';|import { BodyAttributes } from \'./_components/features/providers/BodyAttributes\';|g' "${PROJECT_ROOT}/app/layout.tsx"

# 2. Correction du path d'AuthProvider
sed -i 's|import { AuthProvider } from \"../../_lib/hooks/useAuth\";|import { AuthProvider } from \"../../../_lib/utils/hooks/useAuth\";|g' "${PROJECT_ROOT}/app/_components/features/providers/AuthClientProvider.tsx"

# 3. Vérifions si les fichiers d'imports existent
if [ ! -f "${PROJECT_ROOT}/app/_lib/utils/hooks/useAuth.tsx" ]; then
  echo "Le fichier useAuth.tsx est manquant, création depuis les archives..."
  
  # Chercher dans les archives
  BACKUP_FILE=$(find "${PROJECT_ROOT}/ARCHIVES" -name "useAuth.tsx" | head -n 1)
  
  if [ -n "$BACKUP_FILE" ]; then
    # Créer le répertoire s'il n'existe pas
    mkdir -p "${PROJECT_ROOT}/app/_lib/utils/hooks"
    # Copier depuis la sauvegarde
    cp "$BACKUP_FILE" "${PROJECT_ROOT}/app/_lib/utils/hooks/useAuth.tsx"
    echo "useAuth.tsx restauré depuis $BACKUP_FILE"
  else
    # Créer un fichier minimal si aucune sauvegarde n'est trouvée
    mkdir -p "${PROJECT_ROOT}/app/_lib/utils/hooks"
    
    cat > "${PROJECT_ROOT}/app/_lib/utils/hooks/useAuth.tsx" << 'EOL'
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";

type User = {
  id: string;
  email: string;
  name?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

// Contexte d'authentification
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status: sessionStatus } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionStatus === "loading") return;

    if (session?.user) {
      setUser({
        id: session.user.id || "",
        email: session.user.email || "",
        name: session.user.name || ""
      });
      setLoading(false);
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [session, sessionStatus]);

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }
  return context;
};
EOL
    
    echo "Fichier useAuth.tsx créé avec une implémentation minimale"
  fi
fi

# 4. Vérifier les types dans next-auth.d.ts
if [ ! -f "${PROJECT_ROOT}/types/next-auth.d.ts" ]; then
  echo "Création du fichier de types pour next-auth..."
  mkdir -p "${PROJECT_ROOT}/types"
  
  cat > "${PROJECT_ROOT}/types/next-auth.d.ts" << 'EOL'
import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name?: string;
  }

  interface Session {
    user: User;
  }
}
EOL
  
  echo "Fichier next-auth.d.ts créé"
fi

echo "Corrections terminées!"

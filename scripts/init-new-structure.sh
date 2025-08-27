#!/bin/bash

# Script d'initialisation de la nouvelle structure de projet
# Usage: ./scripts/init-new-structure.sh

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Initialisation de la nouvelle structure   ║${NC}"
echo -e "${BLUE}║        GestionMax Formation Hub            ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════╝${NC}"

# Vérifier si le répertoire courant est bien la racine du projet
if [ ! -f "package.json" ]; then
  echo -e "${RED}Erreur: Ce script doit être exécuté depuis la racine du projet${NC}"
  exit 1
fi

# Demander confirmation avant de continuer
echo -e "${YELLOW}⚠️  Ce script va créer une nouvelle structure de projet.${NC}"
echo -e "${YELLOW}⚠️  Le code actuel sera archivé mais non supprimé.${NC}"
read -p "Voulez-vous continuer? (o/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Oo]$ ]]; then
  echo -e "${YELLOW}Opération annulée.${NC}"
  exit 0
fi

# Timestamp pour le nom d'archive
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
ARCHIVE_DIR="ARCHIVES/backup_$TIMESTAMP"

echo -e "\n${GREEN}[1/5]${NC} Sauvegarde des fichiers actuels..."
mkdir -p "$ARCHIVE_DIR"

# Archiver les répertoires principaux
for dir in app lib prisma public; do
  if [ -d "$dir" ]; then
    echo "   📦 Archivage de $dir/"
    cp -r "$dir" "$ARCHIVE_DIR/"
  fi
done

# Archiver les fichiers importants à la racine
echo "   📦 Archivage des fichiers de configuration..."
cp package.json package-lock.json tsconfig.json next.config.* "$ARCHIVE_DIR/" 2>/dev/null || true

echo -e "\n${GREEN}[2/5]${NC} Création de la nouvelle structure de répertoires..."

# Créer la structure de base pour les dossiers app
mkdir -p app/domains/{formations,rendezvous,users}/{components,hooks,services,types}
mkdir -p "app/(auth)/login" "app/(auth)/register"
mkdir -p "app/(public)/contact" "app/(public)/formations"
mkdir -p app/api/{auth,formations,rendezvous}

# Créer la structure pour les composants partagés
mkdir -p components/ui components/shared

# Créer la structure pour lib
mkdir -p lib/api lib/prisma lib/utils

echo -e "\n${GREEN}[3/5]${NC} Configuration du nouveau schéma Prisma..."

# Déplacer le nouveau schéma s'il existe
if [ -f "prisma/schema.prisma.new" ]; then
  cp prisma/schema.prisma "prisma/schema.prisma.bak.$TIMESTAMP"
  cp prisma/schema.prisma.new prisma/schema.prisma
  echo "   ✅ Nouveau schéma Prisma installé"
else
  echo "   ⚠️  Le fichier prisma/schema.prisma.new n'existe pas"
  echo "   ℹ️  Le schéma Prisma actuel a été conservé"
fi

echo -e "\n${GREEN}[4/5]${NC} Création des fichiers barrels..."

# Créer des fichiers barrels pour chaque domaine
for domain in formations rendezvous users; do
  # Barrel principal du domaine
  cat > "app/domains/$domain/index.ts" << EOF
// Export principal du domaine $domain
export * from './components';
export * from './hooks';
export * from './services';
export * from './types';
EOF

  # Barrel des composants
  cat > "app/domains/$domain/components/index.ts" << EOF
// Export des composants du domaine $domain
// Ajoutez vos exports ici
EOF

  # Barrel des hooks
  cat > "app/domains/$domain/hooks/index.ts" << EOF
// Export des hooks du domaine $domain
// Ajoutez vos exports ici
EOF

  # Barrel des services
  cat > "app/domains/$domain/services/index.ts" << EOF
// Export des services du domaine $domain
// Ajoutez vos exports ici
EOF

  # Barrel des types
  cat > "app/domains/$domain/types/index.ts" << EOF
// Export des types du domaine $domain
// Ajoutez vos exports ici
EOF
done

echo -e "\n${GREEN}[5/5]${NC} Création des fichiers essentiels..."

# Créer le client Prisma
cat > "lib/prisma/client.ts" << EOF
import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

// PrismaClient est attaché à l'objet global en développement pour éviter
// l'épuisement des connexions pendant le hot-reloading
export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;
EOF

# Créer un fichier types global
cat > "lib/types/index.ts" << EOF
// Types globaux partagés dans l'application

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}
EOF

# Créer un fichier README pour expliquer la nouvelle structure
cat > "README.new.md" << EOF
# GestionMax Formation Hub

## Architecture du projet

Le projet suit une architecture domain-driven avec Next.js App Router :

\`\`\`
/app
  /(auth)       # Routes d'authentification
  /(public)     # Pages publiques
  /api          # API Routes de Next.js
  /domains      # Domaines fonctionnels
    /formations # Tout ce qui concerne les formations
    /rendezvous # Tout ce qui concerne les rendez-vous
    /users      # Tout ce qui concerne les utilisateurs

/components
  /ui           # Composants UI génériques
  /shared       # Composants partagés entre domaines

/lib
  /api          # Utilitaires pour l'API
  /prisma       # Client Prisma et utilitaires
  /utils        # Fonctions utilitaires

/prisma         # Schéma et migrations Prisma
\`\`\`

## Développement

1. Installer les dépendances : \`npm install\`
2. Lancer le serveur de développement : \`npm run dev\`
3. Accéder à l'application : http://localhost:3000

## Conventions

- **Composants** : Utilisez des composants serveurs par défaut, sauf si vous avez besoin d'interactivité côté client
- **Données** : Utilisez les Server Actions pour les mutations et le pattern React Server Components pour récupérer des données
- **État** : Minimisez l'état client et privilégiez les Server Components quand possible
- **API** : Utilisez les API Routes pour les endpoints d'API REST

## Organisation des fonctionnalités

- Organisez toujours le code par domaine fonctionnel
- Regroupez composants, hooks, services et types relatifs à un même domaine
- Utilisez les barrels (index.ts) pour faciliter les imports
EOF

echo -e "\n${GREEN}✅ Initialisation de la nouvelle structure terminée avec succès!${NC}"
echo -e "\nVoici la liste des prochaines étapes recommandées :"
echo -e "   1️⃣ Mettre à jour les dépendances: ${YELLOW}npm install${NC}"
echo -e "   2️⃣ Appliquer le nouveau schéma Prisma: ${YELLOW}npx prisma migrate dev --name initial_reset${NC}"
echo -e "   3️⃣ Migrer les données: ${YELLOW}node scripts/migrate-data.js${NC}"
echo -e "   4️⃣ Adapter les composants existants à la nouvelle structure${NC}"
echo -e "   5️⃣ Tester l'application: ${YELLOW}npm run dev${NC}"
echo -e "\nConsultez ${BLUE}README.new.md${NC} pour plus d'informations sur la nouvelle structure."

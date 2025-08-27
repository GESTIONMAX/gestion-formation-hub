#!/bin/bash

# Script pour nettoyer les problèmes de navigation sans perdre de travail
PROJECT_ROOT="/home/gestionmax-aur-lien/CascadeProjects/lovable/gestionmax-formation-hub"

echo "Vérification du cache Next.js..."
if [ -d "${PROJECT_ROOT}/.next" ]; then
  echo "Suppression du cache Next.js..."
  rm -rf "${PROJECT_ROOT}/.next"
  echo "Cache Next.js supprimé."
fi

echo "Vérification des composants de navigation..."
# Vérifier si main-nav.tsx est utilisé
MAIN_NAV_USAGE=$(grep -r --include="*.tsx" --include="*.jsx" "<MainNav" ${PROJECT_ROOT}/app/)

if [ -n "$MAIN_NAV_USAGE" ]; then
  echo "MainNav est encore utilisé dans l'application:"
  echo "$MAIN_NAV_USAGE"
  echo "Suppression des références à MainNav..."
  
  # Trouver tous les fichiers qui utilisent MainNav et supprimer ces références
  FILES_WITH_MAINNAV=$(grep -l -r --include="*.tsx" --include="*.jsx" "<MainNav" ${PROJECT_ROOT}/app/)
  
  for file in $FILES_WITH_MAINNAV; do
    echo "Modification du fichier: $file"
    # Backup du fichier avant modification
    cp "$file" "${file}.bak"
    # Supprimer les lignes qui contiennent <MainNav />
    sed -i '/<MainNav \/>/d' "$file"
    # Supprimer les imports de MainNav
    sed -i '/import MainNav/d' "$file"
  done
fi

# Supprimer le fichier unified-nav.tsx s'il existe pour éviter toute confusion
if [ -f "${PROJECT_ROOT}/components/shared/navigation/unified-nav.tsx" ]; then
  echo "Suppression du composant unified-nav..."
  rm "${PROJECT_ROOT}/components/shared/navigation/unified-nav.tsx"
fi

echo "Nettoyage terminé! Redémarrez le serveur Next.js pour appliquer les changements."

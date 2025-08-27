#!/bin/bash

# Script pour résoudre les routes API dupliquées dans Next.js
PROJECT_ROOT="/home/gestionmax-aur-lien/CascadeProjects/lovable/gestionmax-formation-hub"

# 1. Créer un répertoire de sauvegarde
BACKUP_DIR="${PROJECT_ROOT}/ARCHIVES/api_routes_backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
echo "Répertoire de sauvegarde créé: $BACKUP_DIR"

# 2. Déplacer les routes dupliquées de app/(pages)/api/ vers le backup
if [ -d "${PROJECT_ROOT}/app/(pages)/api" ]; then
  echo "Sauvegarde des routes de app/(pages)/api/ vers $BACKUP_DIR..."
  cp -r "${PROJECT_ROOT}/app/(pages)/api" "$BACKUP_DIR/"
  
  # 3. Supprimer les routes dupliquées pour éviter les conflits
  echo "Suppression des routes dupliquées dans app/(pages)/api/..."
  rm -rf "${PROJECT_ROOT}/app/(pages)/api"
fi

echo "Terminé! Les routes API dupliquées ont été sauvegardées dans $BACKUP_DIR"
echo "Vous devriez maintenant pouvoir démarrer Next.js sans avertissements de routes dupliquées."

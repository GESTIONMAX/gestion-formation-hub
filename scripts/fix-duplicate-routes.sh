#!/bin/bash

# Script pour résoudre les routes API dupliquées
PROJECT_ROOT="/home/gestionmax-aur-lien/CascadeProjects/lovable/gestionmax-formation-hub"

# 1. Identifier les routes dupliquées
echo "Identification des routes API dupliquées..."

# Routes mentionnées dans les avertissements
DUPLICATED_ROUTES=(
  "apprenants"
  "categories"
  "documents"
  "programmes-formation"
  "reclamations"
  "rendezvous"
  "programmes-formation/par-categorie"
)

# 2. Résoudre les routes dupliquées en renommant les dossiers dans app/api
for route in "${DUPLICATED_ROUTES[@]}"; do
  APP_API_PATH="${PROJECT_ROOT}/app/api/${route}"
  PAGES_API_PATH="${PROJECT_ROOT}/app/(pages)/api/${route}"
  
  # Vérifier si les deux chemins existent
  if [ -d "$APP_API_PATH" ] && [ -d "$PAGES_API_PATH" ]; then
    echo "Route dupliquée trouvée: ${route}"
    
    # Créer un répertoire backup
    BACKUP_DIR="${PROJECT_ROOT}/ARCHIVES/duplicate_api_backup_$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$BACKUP_DIR"
    
    # Déplacer la route de app/api vers le backup
    if [ -d "$APP_API_PATH" ]; then
      echo "Sauvegarde de ${APP_API_PATH} vers ${BACKUP_DIR}/${route}"
      mkdir -p "$(dirname "${BACKUP_DIR}/${route}")"
      mv "$APP_API_PATH" "${BACKUP_DIR}/${route}"
    fi
  fi
done

echo "Nettoyage terminé. Les routes dupliquées ont été sauvegardées dans ${BACKUP_DIR}"

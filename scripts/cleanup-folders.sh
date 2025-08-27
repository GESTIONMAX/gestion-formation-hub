#!/bin/bash

# Sortir en cas d'erreur
set -e

# Dossiers à nettoyer
TARGET_DIRS=(
  "app/_components/ui"
  # Ajouter d'autres dossiers à nettoyer ici
)

echo "Début du nettoyage des dossiers..."

for dir in "${TARGET_DIRS[@]}"; do
  if [ -d "$dir" ]; then
    echo "Suppression du dossier $dir..."
    rm -r "$dir"
    echo "✅ Dossier $dir supprimé avec succès"
  else
    echo "⚠️ Le dossier $dir n'existe pas ou a déjà été supprimé"
  fi
done

# Trouver et supprimer les dossiers vides
echo -e "\nRecherche de dossiers vides..."
find app -type d -empty -delete -print | while read -r dir; do
  echo "Supprimé le dossier vide: $dir"
done

echo -e "\n✅ Nettoyage terminé"

# Mettre à jour la liste des tâches
echo -e "\nMise à jour de la liste des tâches..."
# Marquer la tâche 5 comme terminée
echo "✅ Suppression des dossiers vides et des doublons"

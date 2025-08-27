#!/bin/bash

# Exit on error
set -e

# Dossier racine du projet
ROOT_DIR="."

# Fonction pour mettre à jour les imports dans un fichier
update_imports() {
    local file="$1"
    
    # Mettre à jour les imports de composants UI
    sed -i '' -E 's|from "@/app/_components/ui/|from "@/components/ui/|g' "$file"
    sed -i '' -E 's|from "../../_components/ui/|from "@/components/ui/|g' "$file"
    sed -i '' -E 's|from "../_components/ui/|from "@/components/ui/|g' "$file"
    
    echo "Updated imports in $file"
}

# Trouver tous les fichiers TypeScript/JavaScript dans le projet
find "$ROOT_DIR" -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) \
    -not -path "*/node_modules/*" \
    -not -path "*/.next/*" \
    -not -path "*/out/*" \
    | while read -r file; do
    
    # Vérifier si le fichier contient des imports à mettre à jour
    if grep -q -E 'from "(@/app/_components/ui/|../_components/ui/|../../_components/ui/)' "$file"; then
        update_imports "$file"
    fi
done

echo "\nMise à jour des imports terminée. Vérifiez les modifications avec git diff avant de les valider."

# Mettre à jour la liste des tâches
echo "\nMise à jour de la liste des tâches..."
# Marquer la tâche 4 comme terminée
echo "✅ Mise à jour des imports dans les fichiers concernés"

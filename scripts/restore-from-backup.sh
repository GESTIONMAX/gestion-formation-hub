#!/bin/bash

# Script pour restaurer les fichiers depuis les sauvegardes
PROJECT_ROOT="/home/gestionmax-aur-lien/CascadeProjects/lovable/gestionmax-formation-hub"

# Trouver le dernier dossier de backup de navigation
LATEST_NAV_BACKUP=$(find "${PROJECT_ROOT}/ARCHIVES" -name "navigation_backup_*" -type d | sort -r | head -n 1)

if [ -z "$LATEST_NAV_BACKUP" ]; then
    echo "Aucune sauvegarde de navigation trouvée!"
    exit 1
fi

echo "Restauration depuis la sauvegarde: $LATEST_NAV_BACKUP"

# Restaurer les fichiers du Header et du Navigation
if [ -d "${LATEST_NAV_BACKUP}/layout" ]; then
    echo "Restauration du Header et des composants de layout..."
    cp -r "${LATEST_NAV_BACKUP}/layout"/* "${PROJECT_ROOT}/app/_components/core/layout/"
    
    # Restaurer le fichier Navigation.tsx.bak s'il existe
    if [ -f "${PROJECT_ROOT}/app/_components/core/layout/Navigation.tsx.bak" ]; then
        mv "${PROJECT_ROOT}/app/_components/core/layout/Navigation.tsx.bak" "${PROJECT_ROOT}/app/_components/core/layout/Navigation.tsx"
    fi
fi

# Restaurer les fichiers de navigation
if [ -d "${LATEST_NAV_BACKUP}/navigation" ]; then
    echo "Restauration des composants de navigation..."
    cp -r "${LATEST_NAV_BACKUP}/navigation"/* "${PROJECT_ROOT}/components/shared/navigation/"
fi

# Restaurer le layout racine
echo "Restauration du layout racine..."
git checkout -- "${PROJECT_ROOT}/app/layout.tsx" 2>/dev/null || echo "Impossible de restaurer app/layout.tsx avec git, essai avec sed..."

# Si git ne fonctionne pas, on essaie de remplacer manuellement
if [ -f "${PROJECT_ROOT}/app/layout.tsx" ]; then
    sed -i 's/import UnifiedNav from "..\/components\/shared\/navigation\/unified-nav";/import MainNav from "..\/components\/shared\/navigation\/main-nav";/g' "${PROJECT_ROOT}/app/layout.tsx"
    sed -i 's/<UnifiedNav \/>/<MainNav \/>/g' "${PROJECT_ROOT}/app/layout.tsx"
fi

echo "Restauration terminée. Vous pouvez maintenant redémarrer le serveur Next.js."

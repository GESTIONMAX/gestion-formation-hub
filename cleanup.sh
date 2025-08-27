#!/bin/bash

# --- Création de la structure finale ---
mkdir -p components/ui
mkdir -p lib
mkdir -p hooks

# --- Déplacer les composants UI ---
if [ -d "app/components/ui" ]; then
  echo "➡️ Déplacement de app/components/ui/* vers components/ui/"
  mv app/components/ui/* components/ui/ 2>/dev/null
  rm -rf app/components/ui
fi

# --- Déplacer les utilitaires ---
if [ -d "app/_lib" ]; then
  echo "➡️ Déplacement de app/_lib/* vers lib/"
  mv app/_lib/* lib/ 2>/dev/null
  rm -rf app/_lib
fi

# --- (optionnel) Séparer front et back ---
mkdir -p components/public components/admin

echo "✅ Nettoyage terminé :
- Composants UI → components/ui
- Libs → lib
- Hooks → hooks
- Doublons supprimés"

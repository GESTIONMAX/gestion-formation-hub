# GestionMax Formation Hub

## Architecture du projet

Le projet suit une architecture domain-driven avec Next.js App Router :

```
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
```

## Développement

1. Installer les dépendances : `npm install`
2. Lancer le serveur de développement : `npm run dev`
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

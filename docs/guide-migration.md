# Guide de Migration vers la Nouvelle Architecture

## Introduction

Ce document détaille les étapes pratiques pour migrer le projet GestionMax Formation Hub vers la nouvelle architecture. Le processus est conçu pour être progressif, avec des points de validation à chaque étape afin de minimiser les risques.

## Prérequis

Avant de commencer la migration, assurez-vous d'avoir :

- Une sauvegarde complète de la base de données de production
- Une copie intégrale du code source actuel
- Les accès nécessaires aux environnements de développement et production
- Un environnement de développement local configuré

## Phase 1 : Préparation et sauvegarde

### Étape 1 : Sauvegarde des données

```bash
# Création d'un dump de la base de données PostgreSQL
pg_dump -U [username] -h [host] -p [port] -d [database_name] > backup_$(date +%Y%m%d).sql

# Sauvegarde du contenu statique
rsync -av --exclude 'node_modules' --exclude '.next' /chemin/vers/projet /chemin/vers/backup
```

### Étape 2 : Configuration des variables d'environnement

Créez un fichier `.env.migration` contenant :

```
# Base de données source (existante)
OLD_DATABASE_URL=postgresql://user:password@localhost:5432/db_actuelle

# Base de données cible (nouvelle)
NEW_DATABASE_URL=postgresql://user:password@localhost:5432/db_nouvelle

# Variables d'application standard
DATABASE_URL=${NEW_DATABASE_URL}
NEXTAUTH_SECRET=votre_secret_nextauth
NEXTAUTH_URL=http://localhost:3000
```

## Phase 2 : Initialisation de la nouvelle structure

### Étape 1 : Exécution du script d'initialisation

```bash
# Rendre le script exécutable si ce n'est pas déjà fait
chmod +x scripts/init-new-structure.sh

# Exécuter le script d'initialisation
./scripts/init-new-structure.sh
```

Ce script va :
- Archiver le code actuel
- Créer la nouvelle structure de dossiers
- Mettre en place le nouveau schéma Prisma
- Créer les fichiers barrels et utilitaires essentiels

### Étape 2 : Mise à jour des dépendances

Vérifiez et mettez à jour le fichier `package.json` pour vous assurer que toutes les dépendances nécessaires sont présentes :

```bash
# Installer les dépendances
npm install

# Vérifier les dépendances obsolètes et les mettre à jour si nécessaire
npm outdated
npm update
```

## Phase 3 : Migration du schéma et des données

### Étape 1 : Initialisation de la nouvelle base de données

```bash
# Création de la nouvelle base de données (si nécessaire)
createdb -U [username] -h [host] db_nouvelle

# Application du nouveau schéma Prisma
npx prisma generate
npx prisma migrate dev --name initial_reset
```

#### Résolution des problèmes de schéma

Si vous rencontrez des erreurs de validation de schéma, vérifiez particulièrement :

- Les relations one-to-one qui nécessitent une contrainte `@@unique` sur le champ de relation
- Exemple avec le modèle `PositionnementRequest` :

```prisma
model PositionnementRequest {
  id         String    @id @default(uuid())
  programmeId String?  @map("programme_id")
  programme  Programme? @relation(fields: [programmeId], references: [id])
  
  // Nécessaire pour une relation one-to-one valide
  @@unique([programmeId])
}
```

### Étape 2 : Migration des données

Assurez-vous que le fichier `.env.migration` est correctement configuré :

```env
# Base de données source (existante)
OLD_DATABASE_URL=postgresql://gestionmax:supersecurepassword@localhost:5432/gestionmax_local

# Base de données cible (nouvelle)
NEW_DATABASE_URL=postgresql://gestionmax:supersecurepassword@localhost:5432/gestionmax_local

# Variables d'application standard
DATABASE_URL=${NEW_DATABASE_URL}
NEXTAUTH_SECRET=votre_secret_nextauth
NEXTAUTH_URL=http://localhost:3000
```

Puis exécutez le script de migration :

```bash
# Exécuter le script de migration des données
node scripts/migrate-data.js
```

#### Adaptation du script de migration

Il peut être nécessaire d'adapter le script de migration pour tenir compte des changements de noms de tables et de champs. Utilisez des requêtes SQL brutes pour plus de flexibilité :

```javascript
// Au lieu de
const categories = await oldPrisma.categorieProgramme.findMany();

// Utilisez
const categories = await oldPrisma.$queryRaw`
  SELECT id, code, titre, description, ordre 
  FROM categories_programme
`;
```

Gérez les erreurs pour chaque étape de la migration afin que le script puisse continuer même si une partie échoue.

### Étape 3 : Validation des données migrées

```bash
# Lancer Prisma Studio pour vérifier visuellement les données
npx prisma studio
```

Vérifiez que :
- Toutes les données ont été correctement migrées
- Les relations entre les entités sont préservées
- Les contraintes d'intégrité sont respectées
- Les erreurs de doublon (contraintes d'unicité) sont normales si vous relancez la migration

#### Résolution des problèmes courants

- **Tables non trouvées** : Vérifiez les noms exacts dans la base de données avec une requête sur `information_schema.tables`
- **Erreurs de contrainte d'unicité** : Ajoutez des conditions pour éviter les doublons
- **Types de données incompatibles** : Utilisez des conversions explicites ou des valeurs par défaut

## Phase 4 : Portage des fonctionnalités

### Étape 1 : Portage des composants et pages

Pour chaque fonctionnalité principale :

1. Identifiez les composants et pages dans l'ancienne structure
2. Adaptez-les à la nouvelle structure domain-driven
3. Mettez à jour les imports pour utiliser les nouveaux services et hooks
4. Testez chaque fonctionnalité de manière isolée

Exemple pour migrer un composant de formation :

```bash
# Ancienne localisation
# app/components/formations/FormationCard.tsx

# Nouvelle localisation
# app/domains/formations/components/FormationCard.tsx
```

### Étape 2 : Adaptation des routes API

Pour chaque route API :

1. Identifiez les endpoints existants dans l'ancienne structure
2. Créez les équivalents dans la nouvelle structure avec Next.js App Router
3. Utilisez les nouveaux services pour accéder aux données
4. Assurez-vous que les contrats d'API sont respectés pour maintenir la compatibilité

Exemple de migration d'une route API :

```typescript
// Ancienne API (pages/api/formations/[id].ts)
export default async function handler(req, res) {
  const { id } = req.query;
  const formation = await prisma.formation.findUnique({ where: { id } });
  return res.status(200).json(formation);
}

// Nouvelle API (app/api/formations/[id]/route.ts)
import { NextResponse } from "next/server";
import { ProgrammeService } from "@/app/domains/formations/services/programme-service";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const programme = await ProgrammeService.getProgrammeById(params.id);
  
  if (!programme) {
    return NextResponse.json({ error: "Programme non trouvé" }, { status: 404 });
  }
  
  return NextResponse.json(programme);
}
```

### Étape 3 : Mise à jour des hooks et services

Pour chaque fonctionnalité :

1. Adaptez les hooks existants pour utiliser les nouveaux services
2. Assurez-vous que les signatures des fonctions et les contrats sont maintenus
3. Mettez à jour les références aux types et interfaces

## Phase 5 : Tests et validation

### Étape 1 : Tests fonctionnels

Pour chaque page et fonctionnalité :

1. Vérifiez que la navigation fonctionne correctement
2. Testez les formulaires et les interactions utilisateur
3. Vérifiez que les données sont correctement affichées et modifiées

### Étape 2 : Tests de performance

1. Mesurez les temps de chargement des pages principales
2. Vérifiez l'utilisation de la mémoire et les requêtes réseau
3. Optimisez si nécessaire

## Phase 6 : Déploiement

### Étape 1 : Déploiement en préproduction

```bash
# Build de l'application
npm run build

# Déploiement en préproduction (selon votre infrastructure)
# Exemple avec Vercel
vercel
```

### Étape 2 : Validation finale

1. Effectuez une dernière série de tests sur l'environnement de préproduction
2. Vérifiez que toutes les intégrations externes fonctionnent correctement
3. Validez avec les parties prenantes

### Étape 3 : Déploiement en production

```bash
# Déploiement en production
# Exemple avec Vercel
vercel --prod
```

## Phase 7 : Suivi post-déploiement

### Étape 1 : Surveillance

1. Surveillez les logs et les métriques de performance
2. Soyez attentif aux erreurs ou comportements anormaux
3. Préparez-vous à résoudre rapidement les problèmes éventuels

### Étape 2 : Documentation

1. Mettez à jour la documentation technique
2. Documentez les changements d'API
3. Créez des guides d'utilisation pour les développeurs

## Points d'attention

- **Compatibilité des URLs** : Assurez-vous que les URLs importantes sont préservées ou redirigées correctement
- **Gestion des sessions** : Vérifiez que les utilisateurs connectés ne sont pas déconnectés après la migration
- **SEO** : Maintenez les balises meta et la structure pour préserver le référencement
- **Tests de charge** : Si possible, effectuez des tests de charge avant le déploiement en production

## Plan de rollback

En cas de problème majeur lors du déploiement :

1. Utilisez la sauvegarde de la base de données pour restaurer les données
2. Redéployez la version précédente de l'application
3. Analysez les causes de l'échec avant une nouvelle tentative de migration

## Conclusion

Cette migration est un processus complexe mais nécessaire pour améliorer la structure et la maintenabilité du projet. En suivant ces étapes méthodiquement et en validant chaque phase, vous minimiserez les risques et assurerez une transition en douceur vers la nouvelle architecture.

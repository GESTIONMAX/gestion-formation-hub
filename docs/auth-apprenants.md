# Système d'authentification des apprenants

Ce document explique l'architecture et le fonctionnement du système d'authentification mis en place pour sécuriser l'accès des apprenants à leur espace de documents.

## Architecture globale

Le système d'authentification des apprenants est basé sur les technologies suivantes :

- **JWT** (JSON Web Tokens) pour les jetons d'authentification
- **bcrypt** pour le hachage sécurisé des mots de passe
- **Next.js Middleware** pour protéger les routes
- **Prisma ORM** pour la gestion des données utilisateurs
- **Nodemailer** pour l'envoi d'emails (réinitialisation de mot de passe, notifications)

## Modèle de données

Le modèle `Apprenant` a été étendu avec les champs suivants :

```prisma
model Apprenant {
  // Champs existants...
  motDePasse        String?             @map("mot_de_passe") // Stockage du mot de passe hashé
  tokenAcces        String?             @map("token_acces") // Token pour accès sécurisé
  dateExpirationToken DateTime?         @map("date_expiration_token")
  estActif          Boolean            @default(true) @map("est_actif") 
  premierAcces      Boolean            @default(true) @map("premier_acces")
  // ...
}
```

## Flux d'authentification

1. **Connexion** (`/api/auth/apprenants/login`)
   - Validation des identifiants (email + mot de passe)
   - Génération d'un token JWT signé avec une durée de validité (24h par défaut)
   - Mise à jour du token dans la base de données (permet révocation)
   - Retour du token et des infos de l'apprenant au client

2. **Protection des routes**
   - Middleware global qui intercepte les requêtes vers `/apprenants/espace`, `/apprenants/documents/*` et `/api/apprenants/*/documents`
   - Vérification du token JWT (présence, validité, expiration)
   - Vérification que l'apprenant est actif dans la base
   - Vérification que l'apprenant accède uniquement à ses propres ressources
   - Redirection vers la page de login si non authentifié

3. **Premier accès**
   - Flag `premierAcces` qui force le changement de mot de passe
   - Redirection vers `/apprenants/changer-mot-de-passe` lors du premier login
   - Mise à jour du flag une fois le mot de passe changé

4. **Réinitialisation de mot de passe** (`/api/auth/apprenants/reset-password`)
   - Génération d'un mot de passe temporaire sécurisé
   - Envoi par email à l'adresse de l'apprenant
   - Flag `premierAcces` remis à `true` pour forcer le changement

## Front-end

L'interface utilisateur comprend :

1. **Page de connexion** (`/apprenants/login`)
   - Formulaire d'authentification
   - Option de réinitialisation de mot de passe
   - Stockage du token dans localStorage
   - Gestion des redirections

2. **Changement de mot de passe** (`/apprenants/changer-mot-de-passe`)
   - Formulaire avec validation de la force du mot de passe
   - Confirmation du nouveau mot de passe
   - Mise à jour du token après changement

3. **Espace apprenant** (`/apprenants/espace`)
   - Dashboard personnel de l'apprenant
   - Affichage des documents par étape (avant, pendant, après la formation)
   - Interface de téléchargement des documents

## Sécurité

- Mots de passe hashés avec bcrypt (10 rounds)
- Jetons JWT signés avec une clé secrète configurable
- Stockage des tokens en base avec date d'expiration
- Vérification des droits d'accès aux ressources
- Protection contre le CSRF via tokens
- Validation des entrées utilisateurs

## Configuration

Variables d'environnement nécessaires :

```
JWT_SECRET=votre_clé_secrète_jwt
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre_utilisateur_smtp
SMTP_PASSWORD=votre_mot_de_passe_smtp
MAIL_FROM=noreply@votre-domaine.com
NEXT_PUBLIC_APP_URL=https://votre-domaine.com
```

## Initialisation des comptes

Un script utilitaire `scripts/test-auth-apprenants.js` permet d'initialiser les mots de passe des apprenants existants pour les tests. Pour l'utiliser :

```bash
node scripts/test-auth-apprenants.js
```

## Améliorations futures

- Ajout de la vérification en deux étapes
- Expiration automatique des sessions inactives
- Journalisation des tentatives de connexion échouées
- Blocage temporaire après X tentatives échouées
- Amélioration de l'interface utilisateur mobile

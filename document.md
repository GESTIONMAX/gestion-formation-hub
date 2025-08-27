# GestionMax Formation Hub - Documentation

## Introduction

Ce document regroupe les informations essentielles concernant la plateforme GestionMax Formation Hub, une solution de gestion de formations, d'apprenants et de documents pédagogiques.

## Fonctionnalités principales

### Gestion des formations
- Catalogue des programmes de formation
- Personnalisation des programmes
- Suivi des sessions

### Gestion des apprenants
- Inscription et gestion des profils
- Authentification sécurisée
- Accès personnalisé aux documents

### Système documentaire
- Organisation par étapes (avant, pendant, après formation)
- Téléchargement sécurisé
- Notification de nouveaux documents

## Accès à la plateforme

### Administrateurs et formateurs
- Connexion via `/auth`
- Accès au dashboard complet

### Apprenants
- Connexion via `/apprenants/login`
- Accès à l'espace personnel via `/apprenants/espace`
- Changement de mot de passe via `/apprenants/changer-mot-de-passe`

## Architecture technique

- Next.js pour le front-end et les API
- Prisma ORM pour la gestion de la base de données
- JWT pour l'authentification des apprenants
- NextAuth pour l'authentification administrative

## Contacts

Pour toute question technique, contactez l'équipe de développement.
Pour toute question relative aux formations, contactez l'équipe pédagogique.

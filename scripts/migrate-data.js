#!/usr/bin/env node

/**
 * Script de migration des données de l'ancien schéma vers le nouveau schéma
 * Usage: node scripts/migrate-data.js
 */

const { PrismaClient: OldPrismaClient } = require('@prisma/client');
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs-extra');

// Charger les variables d'environnement depuis .env.migration
dotenv.config({ path: '.env.migration' });
console.log('\x1b[33m⚠️ Utilisation du fichier .env.migration pour la configuration\x1b[0m');

// Vérifier que les variables d'environnement nécessaires sont définies
if (!process.env.OLD_DATABASE_URL) {
  console.error('\x1b[31m❌ Erreur: La variable OLD_DATABASE_URL n\'est pas définie dans .env.migration\x1b[0m');
  console.log('Assurez-vous que le fichier .env.migration contient:');
  console.log('OLD_DATABASE_URL="postgresql://user:password@localhost:5432/db_source"');
  console.log('NEW_DATABASE_URL="postgresql://user:password@localhost:5432/db_cible"');
  process.exit(1);
}

if (!process.env.NEW_DATABASE_URL) {
  console.error('\x1b[31m❌ Erreur: La variable NEW_DATABASE_URL n\'est pas définie dans .env.migration\x1b[0m');
  console.log('Assurez-vous que le fichier .env.migration contient:');
  console.log('OLD_DATABASE_URL="postgresql://user:password@localhost:5432/db_source"');
  console.log('NEW_DATABASE_URL="postgresql://user:password@localhost:5432/db_cible"');
  process.exit(1);
}

console.log('\x1b[32m✅ Variables d\'environnement chargées avec succès\x1b[0m');

// Connexion à l'ancienne base de données
const oldPrisma = new OldPrismaClient({
  datasources: {
    db: {
      url: process.env.OLD_DATABASE_URL || process.env.DATABASE_URL
    }
  }
});

// Connexion à la nouvelle base de données
// NOTE: Vous devez avoir déjà créé votre nouveau schéma et fait une migration
// Utiliser le même client Prisma pour la nouvelle base de données, mais avec une URL différente
const NewPrismaClient = OldPrismaClient;
const newPrisma = new NewPrismaClient({
  datasources: {
    db: {
      url: process.env.NEW_DATABASE_URL
    }
  }
});

console.log(`\x1b[34mℹ️ Connexion à la base source: ${process.env.OLD_DATABASE_URL.split('@')[1]}\x1b[0m`);
console.log(`\x1b[34mℹ️ Connexion à la base cible: ${process.env.NEW_DATABASE_URL.split('@')[1]}\x1b[0m`);

async function migrateCategories() {
  console.log('🔄 Migration des catégories...');
  
  try {
    // Vérifier si la table existe en utilisant le nom natif
    console.log('\x1b[33m⚠️ Vérification des tables source...\x1b[0m');
    const categoriesTable = await oldPrisma.$queryRaw`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = 'categories_programme'
      );
    `;
    
    if (!categoriesTable[0].exists) {
      console.log('\x1b[31m❌ Table categories_programme non trouvée\x1b[0m');
      return;
    }
    
    // Utiliser des requêtes SQL brutes si les modèles ne sont pas disponibles
    const categories = await oldPrisma.$queryRaw`
      SELECT id, code, titre, description, ordre 
      FROM categories_programme
    `;
    
    console.log(`\x1b[34mℹ️ Trouvé ${categories.length} catégories à migrer\x1b[0m`);
    
    for (const category of categories) {
      await newPrisma.categorie.create({
        data: {
          id: category.id,
          code: category.code,
          titre: category.titre,
          description: category.description,
          ordre: category.ordre || 0
        }
      });
    }
    
    console.log(`\x1b[32m✅ ${categories.length} catégories migrées\x1b[0m`);
  } catch (error) {
    console.error('\x1b[31m❌ Erreur lors de la migration des catégories:\x1b[0m', error);
    throw error;
  }
}

async function migrateProgrammes() {
  console.log('🔄 Migration des programmes de formation...');
  
  try {
    // Vérifier si la table existe
    const programmeTable = await oldPrisma.$queryRaw`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = 'programmes_formation'
      );
    `;
    
    if (!programmeTable[0].exists) {
      console.log('\x1b[31m❌ Table programmes_formation non trouvée\x1b[0m');
      return;
    }
    
    // Récupérer les programmes avec requête SQL
    const oldProgrammes = await oldPrisma.$queryRaw`
      SELECT * FROM programmes_formation
    `;
    
    console.log(`\x1b[34mℹ️ Trouvé ${oldProgrammes.length} programmes à migrer\x1b[0m`);
    
    for (const oldProgramme of oldProgrammes) {
      // Créer le programme de base
      await newPrisma.programme.create({
        data: {
          id: oldProgramme.id,
          type: 'formation',
          code: oldProgramme.code || 'DEFAULT',
          version: oldProgramme.version || 1,
          titre: oldProgramme.titre,
          description: oldProgramme.description || '',
          duree: oldProgramme.duree || 'N/A',
          prix: oldProgramme.prix || 'N/A',
          niveau: oldProgramme.niveau || 'Tous niveaux',
          prerequis: oldProgramme.prerequis || '',
          publicConcerne: oldProgramme.public_concerne || '',
          estActif: oldProgramme.est_actif !== false,
          estVisible: oldProgramme.est_visible !== false,
          categorieId: oldProgramme.categorie_id,
          dateCreation: oldProgramme.date_creation || new Date(),
          dateModification: oldProgramme.date_modification || new Date(),
          
          // Détails du programme
          formationDetails: {
            create: {
              participants: oldProgramme.participants || '1 à 6 participants',
              objectifs: oldProgramme.objectifs ? JSON.parse(oldProgramme.objectifs) : [],
              competencesVisees: oldProgramme.competences_visees ? JSON.parse(oldProgramme.competences_visees) : [],
              contenuDetailleJours: oldProgramme.contenu_detaille_jours || '',
              contenuDetailleHtml: oldProgramme.contenu_detaille_html || null,
              evaluationSur: oldProgramme.evaluation_sur || null,
              horaires: oldProgramme.horaires || '9h-12h30 et 14h-17h30',
              modalites: oldProgramme.modalites || '',
              modalitesAcces: oldProgramme.modalites_acces || '',
              modalitesTechniques: oldProgramme.modalites_techniques || '',
              delaiAcces: oldProgramme.delai_acces || null,
              modalitesReglement: oldProgramme.modalites_reglement || '',
              contactOrganisme: oldProgramme.contact_organisme || 'GestionMax - aurelien@gestionmax.fr - 06.46.02.24.68',
              referentPedagogique: oldProgramme.referent_pedagogique || 'Aurélien Lien - aurelien@gestionmax.fr',
              referentQualite: oldProgramme.referent_qualite || 'Aurélien Lien - aurelien@gestionmax.fr',
              formateur: oldProgramme.formateur || 'Aurélien Lien',
              ressourcesDisposition: oldProgramme.ressources_disposition || '',
              modalitesEvaluation: oldProgramme.modalites_evaluation || '',
              sanctionFormation: oldProgramme.sanction_formation || '',
              niveauCertification: oldProgramme.niveau_certification || '',
              delaiAcceptation: oldProgramme.delai_acceptation || '',
              accessibiliteHandicap: oldProgramme.accessibilite_handicap || '',
              programmeUrl: oldProgramme.programme_url || null,
              
              // Champs pour la veille légale
              verificationJuridique: oldProgramme.verification_juridique === true,
              dateVerificationJuridique: oldProgramme.date_verification_juridique || null,
              actionNonRespect: oldProgramme.action_non_respect || null,
              referenceTexte: oldProgramme.reference_texte || null,
              
              // Valeurs par défaut pour les nouveaux champs
              ressourcesAssociees: []
            }
          }
        }
      }).catch(error => {
        console.error(`\x1b[31m❌ Erreur lors de la création du programme ${oldProgramme.id} (${oldProgramme.titre}):\x1b[0m`, error.message);
      });
    }
    
    console.log(`\x1b[32m✅ Migration des programmes terminée\x1b[0m`);
  } catch (error) {
    console.error('\x1b[31m❌ Erreur lors de la migration des programmes:\x1b[0m', error);
    throw error;
  }
}

async function migrateUsers() {
  console.log('🔄 Migration des utilisateurs...');
  
  try {
    // Vérifier si la table existe
    const usersTable = await oldPrisma.$queryRaw`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = 'users'
      );
    `;
    
    if (!usersTable[0].exists) {
      console.log('\x1b[31m❌ Table users non trouvée\x1b[0m');
      return;
    }
    
    // Récupérer les utilisateurs avec requête SQL
    const users = await oldPrisma.$queryRaw`
      SELECT * FROM users
    `;
    
    console.log(`\x1b[34mℹ️ Trouvé ${users.length} utilisateurs à migrer\x1b[0m`);
    
    for (const user of users) {
      await newPrisma.user.create({
        data: {
          id: user.id,
          email: user.email,
          password: user.password,
          name: user.name,
          nom: user.nom || null,
          prenom: user.prenom || null,
          role: user.role || 'user',
          createdAt: user.created_at || new Date(),
          updatedAt: user.updated_at || new Date(),
          emailVerified: user.email_verified,
          image: user.image || null
        }
      }).catch(error => {
        console.error(`\x1b[31m❌ Erreur lors de la création de l'utilisateur ${user.id} (${user.email}):\x1b[0m`, error.message);
      });
    }
    
    console.log(`\x1b[32m✅ ${users.length} utilisateurs migrés\x1b[0m`);
  } catch (error) {
    console.error('\x1b[31m❌ Erreur lors de la migration des utilisateurs:\x1b[0m', error);
    throw error;
  }
}

async function migrateRendezvous() {
  console.log('🔄 Migration des rendez-vous...');
  
  try {
    // Vérifier si la table existe
    const rdvTable = await oldPrisma.$queryRaw`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = 'rendezvous'
      );
    `;
    
    if (!rdvTable[0].exists) {
      console.log('\x1b[31m❌ Table rendezvous non trouvée\x1b[0m');
      return;
    }
    
    // Récupérer les rendez-vous avec requête SQL
    const rendezvous = await oldPrisma.$queryRaw`
      SELECT * FROM rendezvous
    `;
    
    console.log(`\x1b[34mℹ️ Trouvé ${rendezvous.length} rendez-vous à migrer\x1b[0m`);
    
    for (const rdv of rendezvous) {
      await newPrisma.rendezvous.create({
        data: {
          id: rdv.id,
          nom: rdv.nom || '',
          prenom: rdv.prenom || '',
          email: rdv.email,
          telephone: rdv.telephone || '',
          entreprise: rdv.entreprise || null,
          date: rdv.date || new Date(),
          statut: rdv.statut || 'DEMANDE',
          commentaire: rdv.commentaire || '',
          createdAt: rdv.created_at || new Date(),
          updatedAt: rdv.updated_at || new Date(),
          userId: rdv.user_id || null,
          programmeId: rdv.programme_id || null,
        }
      }).catch(error => {
        console.error(`\x1b[31m❌ Erreur lors de la création du rendez-vous ${rdv.id}:\x1b[0m`, error.message);
      });
    }
    
    console.log(`\x1b[32m✅ ${rendezvous.length} rendez-vous migrés\x1b[0m`);
  } catch (error) {
    console.error('\x1b[31m❌ Erreur lors de la migration des rendez-vous:\x1b[0m', error);
    throw error;
  }
}

/**
 * Fonction principale de migration
 */
async function main() {
  console.log('🚀 Début de la migration des données...');
  console.log('⚠️  Cette opération peut prendre plusieurs minutes selon la taille de votre base de données');
  
  try {
    // Vérifier les tables dans la base source
    console.log('\n🔍 Vérification des tables dans la base source...');
    const tablesSource = await oldPrisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.log('\x1b[34mℹ️ Tables trouvées dans la base source:\x1b[0m');
    tablesSource.forEach(t => console.log(`  - ${t.table_name}`));
    
    // Vérifier les tables dans la base cible
    console.log('\n🔍 Vérification des tables dans la base cible...');
    const tablesCible = await newPrisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.log('\x1b[34mℹ️ Tables trouvées dans la base cible:\x1b[0m');
    tablesCible.forEach(t => console.log(`  - ${t.table_name}`));
    
    console.log('\n📋 Début de la migration séquentielle...');
    let success = true;
    let errors = [];
    
    try { 
      await migrateCategories(); 
    } catch (e) {
      success = false;
      errors.push({ étape: 'catégories', erreur: e.message });
      console.error('\x1b[33m⚠️ Continuation malgré l\'erreur\x1b[0m');
    }
    
    try { 
      await migrateProgrammes(); 
    } catch (e) {
      success = false;
      errors.push({ étape: 'programmes', erreur: e.message });
      console.error('\x1b[33m⚠️ Continuation malgré l\'erreur\x1b[0m');
    }
    
    try { 
      await migrateUsers(); 
    } catch (e) {
      success = false;
      errors.push({ étape: 'utilisateurs', erreur: e.message });
      console.error('\x1b[33m⚠️ Continuation malgré l\'erreur\x1b[0m');
    }
    
    try { 
      await migrateRendezvous(); 
    } catch (e) {
      success = false;
      errors.push({ étape: 'rendez-vous', erreur: e.message });
      console.error('\x1b[33m⚠️ Continuation malgré l\'erreur\x1b[0m');
    }
    
    if (success) {
      console.log('\n\x1b[32m✅ Migration terminée avec succès!\x1b[0m');
    } else {
      console.log('\n\x1b[33m⚠️ Migration terminée avec des erreurs:\x1b[0m');
      errors.forEach(err => {
        console.log(`  \x1b[31m❌ Étape: ${err.étape} - ${err.erreur}\x1b[0m`);
      });
    }
  } catch (error) {
    console.error('\x1b[31m❌ Erreur critique lors de la migration:\x1b[0m', error);
    process.exit(1);
  } finally {
    await oldPrisma.$disconnect();
    await newPrisma.$disconnect();
  }
}

// Exécuter la migration
main();

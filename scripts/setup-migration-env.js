#!/usr/bin/env node

/**
 * Script pour configurer les variables d'environnement de migration
 * Usage: node scripts/setup-migration-env.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Couleurs pour la console
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m'
};

// Déterminer la configuration de connexion actuelle
async function getConnectionInfo() {
  try {
    const envContent = fs.readFileSync('.env', 'utf8');
    const match = envContent.match(/DATABASE_URL=(.+)/);
    
    if (match && match[1]) {
      console.log(`${colors.blue}ℹ️ Base de données actuelle détectée: ${match[1].split('@')[1]}${colors.reset}`);
      return match[1];
    }
    
    console.log(`${colors.yellow}⚠️ Impossible de détecter la configuration de base de données actuelle${colors.reset}`);
    return null;
  } catch (error) {
    console.log(`${colors.yellow}⚠️ Fichier .env non trouvé ou illisible${colors.reset}`);
    return null;
  }
}

// Créer le fichier de configuration
async function createConfigFile(currentDbUrl) {
  try {
    let envContent = '';
    
    if (currentDbUrl) {
      // Utiliser la même connexion pour les deux bases de données
      envContent = `# Configuration des bases de données pour la migration
# La base de données source (actuelle)
OLD_DATABASE_URL=${currentDbUrl}

# La base de données cible (nouvelle structure)
# Par défaut, on utilise la même base mais vous pouvez utiliser une base différente
NEW_DATABASE_URL=${currentDbUrl}

# Variables d'application standard
DATABASE_URL=\${NEW_DATABASE_URL}
`;
    } else {
      // Demander à l'utilisateur de fournir les informations
      envContent = await promptForConnectionInfo();
    }
    
    // Écrire le fichier .env.local
    fs.writeFileSync('.env.local', envContent);
    console.log(`${colors.green}✅ Fichier .env.local créé avec succès${colors.reset}`);
    console.log(`${colors.green}✅ Vous pouvez maintenant exécuter: node scripts/migrate-data.js${colors.reset}`);
  } catch (error) {
    console.error(`${colors.red}❌ Erreur lors de la création du fichier de configuration:${colors.reset}`, error);
  }
}

// Demander à l'utilisateur les informations de connexion
function promptForConnectionInfo() {
  return new Promise((resolve) => {
    rl.question(`${colors.yellow}Entrez l'URL de connexion à la base de données source: ${colors.reset}`, (sourceUrl) => {
      rl.question(`${colors.yellow}Entrez l'URL de connexion à la base de données cible (laisser vide pour utiliser la même): ${colors.reset}`, (targetUrl) => {
        const actualTargetUrl = targetUrl.trim() || sourceUrl.trim();
        
        const envContent = `# Configuration des bases de données pour la migration
# La base de données source (actuelle)
OLD_DATABASE_URL=${sourceUrl.trim()}

# La base de données cible (nouvelle structure)
NEW_DATABASE_URL=${actualTargetUrl}

# Variables d'application standard
DATABASE_URL=\${NEW_DATABASE_URL}
`;

        rl.close();
        resolve(envContent);
      });
    });
  });
}

// Fonction principale
async function main() {
  console.log(`${colors.blue}╔════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.blue}║  Configuration de la migration de données  ║${colors.reset}`);
  console.log(`${colors.blue}╚════════════════════════════════════════════╝${colors.reset}`);
  
  const currentDbUrl = await getConnectionInfo();
  await createConfigFile(currentDbUrl);
}

// Exécuter le script
main().catch(error => {
  console.error(`${colors.red}❌ Erreur:${colors.reset}`, error);
  process.exit(1);
});

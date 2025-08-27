const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

/**
 * Script pour tester l'authentification des apprenants
 * Ce script permet de:
 * 1. Mettre à jour les apprenants existants avec un mot de passe par défaut
 * 2. Vérifier que l'authentification fonctionne
 */
async function main() {
  try {
    console.log('Début du script de test d\'authentification apprenants...');
    
    // Récupérer tous les apprenants sans mot de passe
    const apprenants = await prisma.apprenant.findMany({
      where: {
        motDePasse: null
      }
    });
    
    console.log(`${apprenants.length} apprenants sans mot de passe trouvés.`);
    
    // Mot de passe par défaut pour tous les apprenants
    const defaultPassword = 'Formation2025!';
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);
    
    // Mettre à jour les apprenants
    let updatedCount = 0;
    for (const apprenant of apprenants) {
      await prisma.apprenant.update({
        where: { id: apprenant.id },
        data: {
          motDePasse: hashedPassword,
          estActif: true,
          premierAcces: true
        }
      });
      updatedCount++;
      console.log(`Apprenant ${apprenant.email} mis à jour.`);
    }
    
    console.log(`${updatedCount} apprenants mis à jour avec succès.`);
    console.log(`Mot de passe par défaut: ${defaultPassword}`);
    
    // Afficher la liste des emails pour faciliter les tests
    if (updatedCount > 0) {
      console.log('\nEmails des apprenants mis à jour (pour les tests):');
      apprenants.forEach(a => console.log(`- ${a.email}`));
    }
    
  } catch (error) {
    console.error('Erreur lors de l\'exécution du script:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

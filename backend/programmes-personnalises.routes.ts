import express from 'express';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { authMiddleware } from './auth.middleware';

const router = express.Router();
const prisma = new PrismaClient();

// Get all programmes personnalisés
router.get('/', async (req: Request, res: Response) => {
  try {
    const programmes = await prisma.programmePersonnalise.findMany({
      include: {
        formation: true
      }
    });
    
    res.status(200).json(programmes);
  } catch (error) {
    console.error('Erreur lors de la récupération des programmes personnalisés:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la récupération des programmes personnalisés',
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

// Get a specific programme personnalisé by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const programme = await prisma.programmePersonnalise.findUnique({
      where: { id },
      include: {
        formation: true
      }
    });
    
    if (!programme) {
      return res.status(404).json({ message: 'Programme personnalisé non trouvé' });
    }
    
    res.status(200).json(programme);
  } catch (error) {
    console.error('Erreur lors de la récupération du programme personnalisé:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la récupération du programme personnalisé',
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

// Create a new programme personnalisé
router.post('/', async (req: Request, res: Response) => {
  try {
    const programmeData = req.body;
    console.log('Données reçues du frontend:', programmeData);
    
    // Validation des données
    if (!programmeData.formationId) {
      return res.status(400).json({ message: 'ID de formation requis' });
    }
    
    // Extraire les champs spécifiquement attendus par Prisma
    const createData: any = {
      formationId: programmeData.formationId,
      titre: programmeData.titre,
      description: programmeData.description,
      contenu: programmeData.contenu,
      duree: programmeData.duree,
      objectifsSpecifiques: programmeData.objectifsSpecifiques,
      evaluationSur: programmeData.evaluationSur,
      prerequis: programmeData.prerequis,
      publicConcerne: programmeData.publicConcerne,
      horaires: programmeData.horaires,
      modalitesAcces: programmeData.modalitesAcces,
      delaiAcces: programmeData.delaiAcces,
      tarif: programmeData.tarif,
      modalitesReglement: programmeData.modalitesReglement,
      referentPedagogique: programmeData.referentPedagogique,
      referentQualite: programmeData.referentQualite,
      modalitesTechniques: programmeData.modalitesTechniques,
      formateur: programmeData.formateur,
      ressourcesDisposition: programmeData.ressourcesDisposition,
      modalitesEvaluation: programmeData.modalitesEvaluation,
      sanctionFormation: programmeData.sanctionFormation,
      niveauCertification: programmeData.niveauCertification,
      delaiAcceptation: programmeData.delaiAcceptation,
      accessibiliteHandicap: programmeData.accessibiliteHandicap,
      cessationAnticipee: programmeData.cessationAnticipee
    };
    
    // Gérer la relation avec la demande de positionnement
    if (programmeData.positionnementRequestId) {
      createData.positionnementRequestId = programmeData.positionnementRequestId;
    }
    
    // Gérer les tableaux compétences et ressources - ces champs ne sont pas directement dans le modèle
    // Si nécessaire, les stocker dans une table séparée ou comme JSON
    
    // S'assurer explicitement que statut n'est pas présent dans les données
    if ('statut' in createData) {
      delete createData.statut;
    }
    
    // S'assurer que competencesVisees et ressourcesNecessaires ne sont pas envoyés à Prisma
    if ('competencesVisees' in createData) {
      delete createData.competencesVisees;
    }
    if ('ressourcesNecessaires' in createData) {
      delete createData.ressourcesNecessaires;
    }
    
    console.log('Données finales filtrées pour Prisma:', createData);
    
    const programme = await prisma.programmePersonnalise.create({
      data: createData
    });
    
    res.status(201).json(programme);
  } catch (error) {
    console.error('Erreur lors de la création du programme personnalisé:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la création du programme personnalisé',
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

// Update an existing programme personnalisé
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const programmeData = req.body;
    
    // Vérifier si le programme existe
    const programmeExists = await prisma.programmePersonnalise.findUnique({
      where: { id }
    });
    
    if (!programmeExists) {
      return res.status(404).json({ message: 'Programme personnalisé non trouvé' });
    }
    
    // Mettre à jour le programme
    const updatedProgramme = await prisma.programmePersonnalise.update({
      where: { id },
      data: programmeData
    });
    
    res.status(200).json(updatedProgramme);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du programme personnalisé:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la mise à jour du programme personnalisé',
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

// Delete a programme personnalisé
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Vérifier si le programme existe
    const programmeExists = await prisma.programmePersonnalise.findUnique({
      where: { id }
    });
    
    if (!programmeExists) {
      return res.status(404).json({ message: 'Programme personnalisé non trouvé' });
    }
    
    // Supprimer le programme
    await prisma.programmePersonnalise.delete({
      where: { id }
    });
    
    res.status(200).json({ message: 'Programme personnalisé supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du programme personnalisé:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la suppression du programme personnalisé',
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

export default router;

import express from 'express';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const router = express.Router();
const prisma = new PrismaClient();

// Liste des statuts valides pour les demandes de positionnement
const VALID_STATUSES = ['en_attente', 'traite', 'rdv_fixe', 'annule'];

// Route POST pour créer une nouvelle demande de positionnement
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      nomBeneficiaire,
      prenomBeneficiaire,
      email,
      telephone,
      formationSelectionnee,
      dateNaissance,
      sexe,
      situationHandicap,
      adresse,
      codePostal,
      ville,
      statut,
      experienceWordpress,
      objectifsPrincipaux,
      niveauMaitrise,
      programmeFormation
    } = req.body;

    // Créer une nouvelle demande de positionnement avec Prisma
    const newRequest = await prisma.positionnementRequest.create({
      data: {
        nomBeneficiaire,
        prenomBeneficiaire,
        email,
        telephone,
        formationSelectionnee,
        dateNaissance: dateNaissance ? new Date(dateNaissance) : null,
        sexe,
        situationHandicap,
        adresse,
        codePostal,
        ville,
        statut,
        experienceWordpress,
        objectifsPrincipaux,
        niveauMaitrise,
        programmeFormation,
        status: 'en_attente'
      }
    });

    res.status(201).json(newRequest);
  } catch (error) {
    console.error('Erreur lors de la création de la demande de positionnement:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la création de la demande de positionnement',
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

// Route GET pour récupérer toutes les demandes de positionnement
router.get('/', async (req: Request, res: Response) => {
  try {
    const requests = await prisma.positionnementRequest.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    res.status(200).json(requests);
  } catch (error) {
    console.error('Erreur lors de la récupération des demandes de positionnement:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la récupération des demandes de positionnement',
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

// Route GET pour récupérer une demande de positionnement spécifique
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const request = await prisma.positionnementRequest.findUnique({
      where: { id }
    });
    
    if (!request) {
      return res.status(404).json({ message: 'Demande de positionnement non trouvée' });
    }
    
    res.status(200).json(request);
  } catch (error) {
    console.error('Erreur lors de la récupération de la demande de positionnement:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la récupération de la demande de positionnement',
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

// Route PUT pour mettre à jour le statut d'une demande de positionnement
router.put('/:id/status', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // Vérifier que le statut est valide
    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ 
        message: `Statut invalide. Les statuts valides sont: ${VALID_STATUSES.join(', ')}` 
      });
    }
    
    // Vérifier que la demande existe
    const existingRequest = await prisma.positionnementRequest.findUnique({
      where: { id }
    });
    
    if (!existingRequest) {
      return res.status(404).json({ message: 'Demande de positionnement non trouvée' });
    }
    
    // Mettre à jour le statut
    const updatedRequest = await prisma.positionnementRequest.update({
      where: { id },
      data: { status }
    });
    
    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la mise à jour du statut',
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

export default router;

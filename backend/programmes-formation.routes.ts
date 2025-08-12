import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from './auth.middleware';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/programmes-formation - Récupérer tous les programmes de formation
router.get('/', async (req: Request, res: Response) => {
  try {
    const programmes = await prisma.programmeFormation.findMany({
      include: {
        categorie: true
      }
    });
    res.json(programmes);
  } catch (error) {
    console.error('Erreur lors de la récupération des programmes de formation:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des programmes de formation' });
  }
});

// GET /api/programmes-formation/:id - Récupérer un programme par ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const programme = await prisma.programmeFormation.findUnique({
      where: { id },
      include: {
        categorie: true
      }
    });
    
    if (!programme) {
      return res.status(404).json({ error: 'Programme non trouvé' });
    }
    
    res.json(programme);
  } catch (error) {
    console.error('Erreur lors de la récupération du programme:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du programme' });
  }
});

// GET /api/programmes-formation/type/:type - Récupérer les programmes par type (catalogue ou sur-mesure)
router.get('/type/:type', async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    
    if (type !== 'catalogue' && type !== 'sur-mesure') {
      return res.status(400).json({ error: 'Type invalide. Utilisez "catalogue" ou "sur-mesure"' });
    }
    
    const programmes = await prisma.programmeFormation.findMany({
      where: { type },
      include: {
        categorie: true
      }
    });
    
    res.json(programmes);
  } catch (error) {
    console.error('Erreur lors de la récupération des programmes par type:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des programmes par type' });
  }
});

// GET /api/programmes-formation/categorie/:categorieId - Récupérer les programmes par catégorie
router.get('/categorie/:categorieId', async (req: Request, res: Response) => {
  try {
    const { categorieId } = req.params;
    
    const programmes = await prisma.programmeFormation.findMany({
      where: { categorieId },
      include: {
        categorie: true
      }
    });
    
    res.json(programmes);
  } catch (error) {
    console.error('Erreur lors de la récupération des programmes par catégorie:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des programmes par catégorie' });
  }
});

// POST /api/programmes-formation - Créer un nouveau programme de formation
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const programmeData = {
      ...req.body
    };
    
    const newProgramme = await prisma.programmeFormation.create({
      data: programmeData,
      include: {
        categorie: true
      }
    });
    
    res.status(201).json(newProgramme);
  } catch (error) {
    console.error('Erreur lors de la création du programme:', error);
    res.status(500).json({ error: 'Erreur lors de la création du programme', details: error });
  }
});

// PUT /api/programmes-formation/:id - Mettre à jour un programme
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const programmeData = req.body;
    
    // Récupérer le programme existant
    const existingProgramme = await prisma.programmeFormation.findUnique({
      where: { id }
    });
    
    if (!existingProgramme) {
      return res.status(404).json({ error: 'Programme non trouvé' });
    }
    
    // Mettre à jour le programme avec les nouvelles données
    const updatedProgramme = await prisma.programmeFormation.update({
      where: { id },
      data: programmeData,
      include: {
        categorie: true
      }
    });
    
    res.json(updatedProgramme);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du programme:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du programme' });
  }
});

// DELETE /api/programmes-formation/:id - Supprimer un programme
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Vérifier si le programme existe
    const programme = await prisma.programmeFormation.findUnique({
      where: { id }
    });
    
    if (!programme) {
      return res.status(404).json({ error: 'Programme non trouvé' });
    }
    
    // Supprimer le programme
    await prisma.programmeFormation.delete({
      where: { id }
    });
    
    res.status(200).json({ message: 'Programme supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du programme:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression du programme' });
  }
});

export default router;

import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from './auth.middleware';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/formations - Récupérer toutes les formations
router.get('/', async (req: Request, res: Response) => {
  try {
    const formations = await prisma.formation.findMany();
    res.json(formations);
  } catch (error) {
    console.error('Erreur lors de la récupération des formations:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des formations' });
  }
});

// GET /api/formations/:id - Récupérer une formation par ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const formation = await prisma.formation.findUnique({
      where: { id }
    });
    
    if (!formation) {
      return res.status(404).json({ error: 'Formation non trouvée' });
    }
    
    res.json(formation);
  } catch (error) {
    console.error('Erreur lors de la récupération de la formation:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de la formation' });
  }
});

// POST /api/formations - Créer une nouvelle formation
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const formationData = {
      ...req.body
    };
    
    const newFormation = await prisma.formation.create({
      data: formationData
    });
    
    res.status(201).json(newFormation);
  } catch (error) {
    console.error('Erreur lors de la création de la formation:', error);
    res.status(500).json({ error: 'Erreur lors de la création de la formation' });
  }
});

// PUT /api/formations/:id - Mettre à jour une formation
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const formationData = req.body;
    
    // Récupérer la formation existante
    const existingFormation = await prisma.formation.findUnique({
      where: { id }
    });
    
    if (!existingFormation) {
      return res.status(404).json({ error: 'Formation non trouvée' });
    }
    
    // Mettre à jour la formation avec les nouvelles données
    const updatedFormation = await prisma.formation.update({
      where: { id },
      data: formationData
    });
    
    res.json(updatedFormation);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la formation:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la formation' });
  }
});

// DELETE /api/formations/:id - Supprimer une formation
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Vérifier si la formation existe
    const formation = await prisma.formation.findUnique({
      where: { id }
    });
    
    if (!formation) {
      return res.status(404).json({ error: 'Formation non trouvée' });
    }
    
    // Supprimer la formation
    await prisma.formation.delete({
      where: { id }
    });
    
    res.status(200).json({ message: 'Formation supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la formation:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression de la formation' });
  }
});

export default router;

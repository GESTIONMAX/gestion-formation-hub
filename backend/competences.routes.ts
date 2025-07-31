import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from './auth.middleware';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/competences - Récupérer toutes les compétences
router.get('/', async (req: Request, res: Response) => {
  try {
    const competences = await prisma.competence.findMany({
      orderBy: { dateCreation: 'desc' }
    });
    res.json(competences);
  } catch (error) {
    console.error('Erreur lors de la récupération des compétences:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des compétences' });
  }
});

// GET /api/competences/:id - Récupérer une compétence par ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const competence = await prisma.competence.findUnique({
      where: { id }
    });
    
    if (!competence) {
      return res.status(404).json({ error: 'Compétence non trouvée' });
    }
    
    res.json(competence);
  } catch (error) {
    console.error('Erreur lors de la récupération de la compétence:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de la compétence' });
  }
});

// POST /api/competences - Créer une nouvelle compétence
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const competenceData = {
      ...req.body,
      dateCreation: new Date(),
      dateModification: new Date()
    };
    
    const newCompetence = await prisma.competence.create({
      data: competenceData
    });
    
    res.status(201).json(newCompetence);
  } catch (error) {
    console.error('Erreur lors de la création de la compétence:', error);
    res.status(500).json({ error: 'Erreur lors de la création de la compétence' });
  }
});

// PUT /api/competences/:id - Mettre à jour une compétence
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const competenceData = req.body;
    
    // Vérifier si la compétence existe
    const existingCompetence = await prisma.competence.findUnique({
      where: { id }
    });
    
    if (!existingCompetence) {
      return res.status(404).json({ error: 'Compétence non trouvée' });
    }
    
    // Mettre à jour la compétence
    const updatedCompetence = await prisma.competence.update({
      where: { id },
      data: {
        ...competenceData,
        dateModification: new Date()
      }
    });
    
    res.json(updatedCompetence);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la compétence:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la compétence' });
  }
});

// DELETE /api/competences/:id - Supprimer une compétence
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Vérifier si la compétence existe
    const competence = await prisma.competence.findUnique({
      where: { id }
    });
    
    if (!competence) {
      return res.status(404).json({ error: 'Compétence non trouvée' });
    }
    
    // Supprimer la compétence
    await prisma.competence.delete({
      where: { id }
    });
    
    res.status(200).json({ message: 'Compétence supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la compétence:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression de la compétence' });
  }
});

export default router;

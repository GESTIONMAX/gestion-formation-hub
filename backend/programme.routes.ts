import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Route pour récupérer tous les programmes
router.get('/', async (_req: Request, res: Response) => {
  try {
    const programmes = await prisma.programmeFormation.findMany({
      where: {
        estActif: true,
      },
      orderBy: {
        titre: 'asc',
      },
    });
    res.json(programmes);
  } catch (error) {
    console.error('Erreur lors de la récupération des programmes:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la récupération des programmes', 
      error: error instanceof Error ? error.message : String(error) 
    });
  }
});

// Route pour récupérer uniquement les programmes du catalogue
router.get('/catalogue', async (_req: Request, res: Response) => {
  try {
    const programmesFormation = await prisma.programmeFormation.findMany({
      where: {
        estActif: true,
        type: 'catalogue',
        estVisible: true,
      },
      orderBy: {
        titre: 'asc',
      },
      select: {
        id: true,
        titre: true,
        code: true,
        description: true,
        duree: true,
        niveau: true,
        prix: true
      }
    });
    
    res.json(programmesFormation);
  } catch (error) {
    console.error('Erreur lors de la récupération des programmes du catalogue:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la récupération des programmes du catalogue', 
      error: error instanceof Error ? error.message : String(error) 
    });
  }
});

// Route pour récupérer un programme par son ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const programme = await prisma.programmeFormation.findUnique({
      where: { id }
    });
    
    if (!programme) {
      return res.status(404).json({ message: 'Programme non trouvé' });
    }
    
    res.json(programme);
  } catch (error) {
    console.error('Erreur lors de la récupération du programme:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la récupération du programme', 
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

export default router;

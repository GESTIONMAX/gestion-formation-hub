import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from './auth.middleware';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/apprenants - Récupérer tous les apprenants
router.get('/', async (req: Request, res: Response) => {
  try {
    const apprenants = await prisma.apprenant.findMany({
      orderBy: { nom: 'asc' },
      include: {
        dossiers: {
          include: {
            formation: true
          }
        }
      }
    });
    res.json(apprenants);
  } catch (error) {
    console.error('Erreur lors de la récupération des apprenants:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des apprenants' });
  }
});

// GET /api/apprenants/:id - Récupérer un apprenant par ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const apprenant = await prisma.apprenant.findUnique({
      where: { id },
      include: {
        dossiers: {
          include: {
            formation: true
          }
        }
      }
    });
    
    if (!apprenant) {
      return res.status(404).json({ error: 'Apprenant non trouvé' });
    }
    
    res.json(apprenant);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'apprenant:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'apprenant' });
  }
});

// POST /api/apprenants - Créer un nouvel apprenant
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { formationIds, ...apprenantData } = req.body;
    
    // Créer l'apprenant
    const newApprenant = await prisma.apprenant.create({
      data: {
        ...apprenantData
        // Note: La connexion aux formations se fera via des dossiers de formation
      },
      include: {
        dossiers: true
      }
    });
    
    // Si des formations sont spécifiées, créer des dossiers de formation
    if (formationIds && formationIds.length > 0) {
      for (const formationId of formationIds) {
        await prisma.dossierFormation.create({
          data: {
            formationId,
            apprenantId: newApprenant.id
          }
        });
      }
    }
    
    res.status(201).json(newApprenant);
  } catch (error) {
    console.error('Erreur lors de la création de l\'apprenant:', error);
    res.status(500).json({ error: 'Erreur lors de la création de l\'apprenant' });
  }
});

// PUT /api/apprenants/:id - Mettre à jour un apprenant
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { formationIds, ...apprenantData } = req.body;
    
    // Vérifier si l'apprenant existe
    const existingApprenant = await prisma.apprenant.findUnique({
      where: { id }
    });
    
    if (!existingApprenant) {
      return res.status(404).json({ error: 'Apprenant non trouvé' });
    }
    
    // Mettre à jour l'apprenant
    const updatedApprenant = await prisma.apprenant.update({
      where: { id },
      data: {
        ...apprenantData
      },
      include: {
        dossiers: true
      }
    });
    
    // Si des formations sont spécifiées, mettre à jour les dossiers de formation
    if (formationIds) {
      // Supprimer les dossiers existants
      await prisma.dossierFormation.deleteMany({
        where: {
          apprenantId: id
        }
      });
      
      // Créer de nouveaux dossiers pour chaque formation
      for (const formationId of formationIds) {
        await prisma.dossierFormation.create({
          data: {
            formationId,
            apprenantId: id
          }
        });
      }
    }
    
    res.json(updatedApprenant);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'apprenant:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'apprenant' });
  }
});

// DELETE /api/apprenants/:id - Supprimer un apprenant
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Vérifier si l'apprenant existe
    const apprenant = await prisma.apprenant.findUnique({
      where: { id }
    });
    
    if (!apprenant) {
      return res.status(404).json({ error: 'Apprenant non trouvé' });
    }
    
    // Supprimer l'apprenant
    await prisma.apprenant.delete({
      where: { id }
    });
    
    res.status(200).json({ message: 'Apprenant supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'apprenant:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'apprenant' });
  }
});

export default router;

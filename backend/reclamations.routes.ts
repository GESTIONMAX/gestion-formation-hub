import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from './middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Récupérer toutes les réclamations
router.get('/', async (req, res) => {
  try {
    const reclamations = await prisma.reclamation.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        assignee: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            email: true
          }
        }
      }
    });
    
    res.json(reclamations);
  } catch (error) {
    console.error('Erreur lors de la récupération des réclamations:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des réclamations' });
  }
});

// Récupérer une réclamation par ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const reclamation = await prisma.reclamation.findUnique({
      where: { id },
      include: {
        assignee: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            email: true
          }
        },
        actionsCorrectives: true
      }
    });
    
    if (!reclamation) {
      return res.status(404).json({ message: 'Réclamation non trouvée' });
    }
    
    res.json(reclamation);
  } catch (error) {
    console.error('Erreur lors de la récupération de la réclamation:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération de la réclamation' });
  }
});

// Créer une nouvelle réclamation
router.post('/', async (req, res) => {
  try {
    const { nom, email, telephone, sujet, message, priorite = 'normale' } = req.body;
    
    // Valider les données requises
    if (!nom || !email || !sujet || !message) {
      return res.status(400).json({ message: 'Veuillez fournir toutes les informations requises' });
    }
    
    const reclamation = await prisma.reclamation.create({
      data: {
        nom,
        email,
        telephone,
        sujet,
        message,
        priorite,
        statut: 'nouvelle'
      }
    });
    
    res.status(201).json(reclamation);
  } catch (error) {
    console.error('Erreur lors de la création de la réclamation:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la création de la réclamation' });
  }
});

// Mettre à jour une réclamation
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { statut, priorite, assigneeId, notesInternes, dateResolution } = req.body;
    
    const updatedReclamation = await prisma.reclamation.update({
      where: { id },
      data: {
        statut: statut,
        priorite: priorite,
        assigneeId: assigneeId,
        notesInternes: notesInternes,
        dateResolution: dateResolution ? new Date(dateResolution) : undefined,
        updatedAt: new Date()
      }
    });
    
    res.json(updatedReclamation);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la réclamation:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour de la réclamation' });
  }
});

// Supprimer une réclamation
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Vérifier d'abord si des actions correctives sont liées à cette réclamation
    const actionsCorrectives = await prisma.actionCorrective.findMany({
      where: { reclamationId: id }
    });
    
    if (actionsCorrectives.length > 0) {
      // Supprimer les liens avec les actions correctives plutôt que de supprimer les actions
      await prisma.actionCorrective.updateMany({
        where: { reclamationId: id },
        data: { reclamationId: null }
      });
    }
    
    await prisma.reclamation.delete({
      where: { id }
    });
    
    res.status(204).send();
  } catch (error) {
    console.error('Erreur lors de la suppression de la réclamation:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la suppression de la réclamation' });
  }
});

export default router;

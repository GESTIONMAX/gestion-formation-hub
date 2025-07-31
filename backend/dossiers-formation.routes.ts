import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from './auth.middleware';

const prisma = new PrismaClient();
const router = Router();

// GET /dossiers-formation - Récupérer tous les dossiers de formation
router.get('/', async (req, res) => {
  try {
    const dossiers = await prisma.dossierFormation.findMany({
      include: {
        formation: true,
        apprenant: true,
        positionnement: true,
        documents: true
      }
    });
    
    return res.json(dossiers);
  } catch (error: any) {
    console.error('Erreur lors de la récupération des dossiers de formation:', error);
    return res.status(500).json({ 
      message: 'Erreur lors de la récupération des dossiers de formation', 
      error: error.toString() 
    });
  }
});

// GET /dossiers-formation/:id - Récupérer un dossier de formation par ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const dossier = await prisma.dossierFormation.findUnique({
      where: { id },
      include: {
        formation: true,
        apprenant: true,
        positionnement: true,
        documents: true
      }
    });
    
    if (!dossier) {
      return res.status(404).json({ message: 'Dossier de formation non trouvé' });
    }
    
    return res.json(dossier);
  } catch (error: any) {
    console.error('Erreur lors de la récupération du dossier de formation:', error);
    return res.status(500).json({ 
      message: 'Erreur lors de la récupération du dossier de formation', 
      error: error.toString() 
    });
  }
});

// POST /dossiers-formation - Créer un nouveau dossier de formation
router.post('/', async (req, res) => {
  try {
    const { 
      formationId, 
      apprenantId, 
      positionnementId, 
      statutDossier, 
      dateDebut, 
      dateFin,
      numeroReference
    } = req.body;
    
    console.log('Données reçues pour création du dossier:', req.body);
    
    // Validation des champs obligatoires
    if (!formationId) {
      return res.status(400).json({ message: 'L\'ID de formation est requis' });
    }
    
    if (!apprenantId) {
      return res.status(400).json({ message: 'L\'ID d\'apprenant est requis' });
    }

    // Conversion des dates si présentes
    const parsedDateDebut = dateDebut ? new Date(dateDebut) : undefined;
    const parsedDateFin = dateFin ? new Date(dateFin) : undefined;
    
    // Création du dossier
    const dossier = await prisma.dossierFormation.create({
      data: {
        formationId,
        apprenantId,
        positionnementId: positionnementId || undefined,
        statutDossier: statutDossier || 'en_attente',
        dateDebut: parsedDateDebut,
        dateFin: parsedDateFin,
        // Si un champ personnalisé est envoyé
        ...(numeroReference && { numeroReference })
      }
    });
    
    return res.status(201).json(dossier);
  } catch (error: any) {
    console.error('Erreur lors de la création du dossier de formation:', error);
    return res.status(500).json({ 
      message: 'Erreur lors de la création du dossier de formation', 
      error: error.toString() 
    });
  }
});

// PUT /dossiers-formation/:id - Mettre à jour un dossier de formation
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      statutDossier, 
      dateDebut, 
      dateFin,
      numeroReference
    } = req.body;
    
    // Vérifier si le dossier existe
    const dossierExistant = await prisma.dossierFormation.findUnique({
      where: { id }
    });
    
    if (!dossierExistant) {
      return res.status(404).json({ message: 'Dossier de formation non trouvé' });
    }

    // Conversion des dates si présentes
    const parsedDateDebut = dateDebut ? new Date(dateDebut) : undefined;
    const parsedDateFin = dateFin ? new Date(dateFin) : undefined;
    
    // Mise à jour du dossier
    const dossier = await prisma.dossierFormation.update({
      where: { id },
      data: {
        statutDossier: statutDossier || undefined,
        dateDebut: parsedDateDebut,
        dateFin: parsedDateFin,
        // Si un champ personnalisé est envoyé
        ...(numeroReference && { numeroReference })
      }
    });
    
    return res.json(dossier);
  } catch (error: any) {
    console.error('Erreur lors de la mise à jour du dossier de formation:', error);
    return res.status(500).json({ 
      message: 'Erreur lors de la mise à jour du dossier de formation', 
      error: error.toString() 
    });
  }
});

// DELETE /dossiers-formation/:id - Supprimer un dossier de formation
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Vérifier si le dossier existe
    const dossierExistant = await prisma.dossierFormation.findUnique({
      where: { id }
    });
    
    if (!dossierExistant) {
      return res.status(404).json({ message: 'Dossier de formation non trouvé' });
    }
    
    // Supprimer le dossier
    await prisma.dossierFormation.delete({
      where: { id }
    });
    
    return res.json({ message: 'Dossier de formation supprimé avec succès' });
  } catch (error: any) {
    console.error('Erreur lors de la suppression du dossier de formation:', error);
    return res.status(500).json({ 
      message: 'Erreur lors de la suppression du dossier de formation', 
      error: error.toString() 
    });
  }
});

export default router;

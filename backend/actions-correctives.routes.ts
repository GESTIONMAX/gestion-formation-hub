import express from 'express';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const router = express.Router();
const prisma = new PrismaClient();

// Fonction utilitaire pour convertir les clés camelCase en snake_case pour la compatibilité frontend
const toCamelCase = (str: string) => {
  return str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace('-', '').replace('_', '')
  );
};

const toSnakeCase = (str: string) => {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};

// Convertir un objet avec des clés camelCase vers des clés snake_case
const convertToSnakeCase = (obj: any): any => {
  if (obj === null || obj === undefined || typeof obj !== 'object') return obj;
  
  if (Array.isArray(obj)) {
    return obj.map(item => convertToSnakeCase(item));
  }
  
  return Object.keys(obj).reduce((result: any, key) => {
    const value = obj[key];
    const snakeKey = toSnakeCase(key);
    
    // Récursion pour les objets imbriqués
    result[snakeKey] = typeof value === 'object' && value !== null
      ? convertToSnakeCase(value)
      : value;
    
    return result;
  }, {});
};

// Convertir un objet avec des clés snake_case vers des clés camelCase
const convertToCamelCase = (obj: any): any => {
  if (obj === null || obj === undefined || typeof obj !== 'object') return obj;
  
  if (Array.isArray(obj)) {
    return obj.map(item => convertToCamelCase(item));
  }
  
  return Object.keys(obj).reduce((result: any, key) => {
    const value = obj[key];
    const camelKey = toCamelCase(key);
    
    // Récursion pour les objets imbriqués
    result[camelKey] = typeof value === 'object' && value !== null
      ? convertToCamelCase(value)
      : value;
    
    return result;
  }, {});
};

// Route GET pour récupérer toutes les actions correctives
router.get('/', async (req: Request, res: Response) => {
  try {
    const actionsCorrectives = await prisma.actionCorrective.findMany({
      include: {
        reclamation: true,
        historiqueActions: true
      },
      orderBy: { createdAt: 'desc' }
    });
    
    // Conversion des clés camelCase en snake_case pour la compatibilité frontend
    const snakeCaseActions = convertToSnakeCase(actionsCorrectives);
    
    res.status(200).json(snakeCaseActions);
  } catch (error) {
    console.error('Erreur lors de la récupération des actions correctives:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la récupération des actions correctives',
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

// Route GET pour récupérer une action corrective par ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const actionCorrective = await prisma.actionCorrective.findUnique({
      where: { id },
      include: {
        reclamation: true,
        historiqueActions: true
      }
    });
    
    if (!actionCorrective) {
      return res.status(404).json({ message: 'Action corrective non trouvée' });
    }
    
    // Conversion des clés camelCase en snake_case pour la compatibilité frontend
    const snakeCaseAction = convertToSnakeCase(actionCorrective);
    
    res.status(200).json(snakeCaseAction);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'action corrective:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la récupération de l\'action corrective',
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

// Route POST pour créer une nouvelle action corrective
router.post('/', async (req: Request, res: Response) => {
  try {
    // Conversion des clés snake_case en camelCase pour Prisma
    const camelCaseData = convertToCamelCase(req.body);
    
    // Traiter les dates
    if (camelCaseData.origineDate && typeof camelCaseData.origineDate === 'string') {
      camelCaseData.origineDate = new Date(camelCaseData.origineDate);
    }
    if (camelCaseData.dateEcheance && typeof camelCaseData.dateEcheance === 'string') {
      camelCaseData.dateEcheance = new Date(camelCaseData.dateEcheance);
    }
    
    const newActionCorrective = await prisma.actionCorrective.create({
      data: camelCaseData
    });
    
    // Conversion des clés camelCase en snake_case pour la réponse
    const snakeCaseAction = convertToSnakeCase(newActionCorrective);
    
    res.status(201).json(snakeCaseAction);
  } catch (error) {
    console.error('Erreur lors de la création de l\'action corrective:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la création de l\'action corrective',
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

// Route PUT pour mettre à jour une action corrective
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Conversion des clés snake_case en camelCase pour Prisma
    const camelCaseData = convertToCamelCase(req.body);
    
    // Traiter les dates
    if (camelCaseData.origineDate && typeof camelCaseData.origineDate === 'string') {
      camelCaseData.origineDate = new Date(camelCaseData.origineDate);
    }
    if (camelCaseData.dateEcheance && typeof camelCaseData.dateEcheance === 'string') {
      camelCaseData.dateEcheance = new Date(camelCaseData.dateEcheance);
    }
    
    // Supprimer l'id s'il est présent dans les données pour éviter une erreur
    delete camelCaseData.id;
    
    const updatedActionCorrective = await prisma.actionCorrective.update({
      where: { id },
      data: camelCaseData
    });
    
    // Conversion des clés camelCase en snake_case pour la réponse
    const snakeCaseAction = convertToSnakeCase(updatedActionCorrective);
    
    res.status(200).json(snakeCaseAction);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'action corrective:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la mise à jour de l\'action corrective',
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

// Route DELETE pour supprimer une action corrective
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // D'abord supprimer tous les historiques associés
    await prisma.historiqueActionCorrective.deleteMany({
      where: { actionCorrectiveId: id }
    });
    
    // Ensuite supprimer l'action corrective
    await prisma.actionCorrective.delete({
      where: { id }
    });
    
    res.status(200).json({ message: 'Action corrective supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'action corrective:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la suppression de l\'action corrective',
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

export default router;

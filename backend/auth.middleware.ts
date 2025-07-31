import { Request as ExpressRequest, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

// Interface personnalisée étendant Request pour éviter les conflits de types
interface AuthenticatedRequest extends ExpressRequest {
  authenticatedUser?: {
    id: string;
    role: string;
    email?: string | null;
    name?: string | null;
  };
}

export const authMiddleware = async (req: ExpressRequest, res: Response, next: NextFunction) => {
  try {
    // Vérifier la présence du header Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Accès refusé. Token manquant.' });
    }

    // Extraire le token
    const token = authHeader.split(' ')[1];
    
    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_key') as { userId: string };
    
    // Vérifier que l'utilisateur existe toujours dans la base de données
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé' });
    }

    // Ajouter l'utilisateur à la requête en utilisant une propriété non typée
    (req as any).authenticatedUser = {
      id: user.id,
      role: user.role,
      name: user.name,
      email: user.email
    };
    
    next();
  } catch (error) {
    console.error('Erreur d\'authentification:', error);
    return res.status(401).json({ error: 'Token invalide ou expiré' });
  }
};

// Middleware pour vérifier que l'utilisateur est administrateur
export const adminMiddleware = (req: ExpressRequest, res: Response, next: NextFunction) => {
  try {
    const authenticatedUser = (req as any).authenticatedUser;
    
    if (!authenticatedUser || authenticatedUser.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Accès refusé. Droits administrateur requis.' });
    }
    
    next();
  } catch (error) {
    console.error('Erreur d\'autorisation:', error);
    return res.status(403).json({ error: 'Erreur lors de la vérification des permissions' });
  }
};

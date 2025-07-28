import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Extension de l'interface Request pour inclure l'utilisateur
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
      };
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'votre_clé_secrète_par_défaut';

/**
 * Middleware d'authentification qui vérifie le JWT
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Récupérer le token du header Authorization
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentification requise' });
  }

  // Extraire le token
  const token = authHeader.split(' ')[1];
  
  try {
    // Vérifier et décoder le token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    
    // Ajouter l'utilisateur à la requête
    req.user = { userId: decoded.userId };
    
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token invalide ou expiré' });
  }
};

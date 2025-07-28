import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Interface pour étendre la requête avec un utilisateur
interface RequestWithUser extends Request {
  user?: any;
}

export const authenticateToken = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Accès refusé. Token manquant.' });
  }
  
  try {
    const secret = process.env.JWT_SECRET || 'default_secret';
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Erreur d\'authentification:', error);
    return res.status(403).json({ message: 'Token invalide ou expiré.' });
  }
};

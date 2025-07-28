import { Router } from 'express';
import { register, login, getMe } from './auth.controller';
import { authMiddleware } from './middlewares/auth';

const router = Router();

// Route d'inscription
router.post('/register', register);

// Route de connexion
router.post('/login', login);

// Route pour récupérer les informations de l'utilisateur connecté (protégée)
router.get('/me', authMiddleware, getMe);

export default router;

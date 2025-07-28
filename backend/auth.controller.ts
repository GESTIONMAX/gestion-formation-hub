import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from './prisma';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'votre_clé_secrète_par_défaut';
const SALT_ROUNDS = 10;

/**
 * Génère un token JWT pour l'utilisateur
 */
const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};

/**
 * Filtre les informations sensibles de l'utilisateur
 */
const filterUserData = (user: any) => {
  const { password, ...userData } = user;
  return userData;
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, nom, prenom } = req.body;

    // Vérification des champs requis
    if (!email || !password || !nom || !prenom) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé' });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Créer l'utilisateur
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        nom,
        prenom,
        role: 'USER' // Rôle par défaut
      }
    });

    // Générer le token
    const accessToken = generateToken(newUser.id);

    // Retourner le token et les infos utilisateur
    res.status(201).json({
      accessToken,
      user: filterUserData(newUser)
    });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ error: 'Erreur lors de l\'inscription' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Vérification des champs requis
    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis' });
    }

    // Rechercher l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    // Vérifier le mot de passe
    if (!user.password) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    // Générer le token
    const accessToken = generateToken(user.id);

    // Retourner le token et les infos utilisateur
    res.json({
      accessToken,
      user: filterUserData(user)
    });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ error: 'Erreur lors de la connexion' });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    // L'ID utilisateur est extrait du token JWT par le middleware d'authentification
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Non autorisé' });
    }

    // Récupérer les informations de l'utilisateur
    if (!userId) {
      return res.status(401).json({ error: 'ID utilisateur non fourni' });
    }
    
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    // Retourner les infos utilisateur sans le mot de passe
    res.json(filterUserData(user));
  } catch (error) {
    console.error('Erreur lors de la récupération des données utilisateur:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

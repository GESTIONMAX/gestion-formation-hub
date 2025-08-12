import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './auth.routes';
import reclamationsRoutes from './reclamations.routes';
import positionnementRoutes from './positionnement.routes';
import formationsRoutes from './formations.routes';
import apprenantsRoutes from './apprenants.routes';
import competencesRoutes from './competences.routes';
import actionsCorrectivesRoutes from './actions-correctives.routes';
import documentsRoutes from './documents.routes';
import programmesPersonnalisesRoutes from './programmes-personnalises.routes';
import dossiersFormationRoutes from './dossiers-formation.routes';
import programmesFormationRoutes from './programmes-formation.routes';
import programmeRoutes from './programme.routes';

// Charger les variables d'environnement
dotenv.config();

// Créer l'application Express
const app = express();
const PORT = process.env.PORT || 5001; // Changement du port par défaut pour éviter les conflits

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/reclamations', reclamationsRoutes);
// Maintenir deux routes pour assurer la compatibilité avec tous les composants frontend
app.use('/api/positionnement-requests', positionnementRoutes); // Pour le formulaire frontend
app.use('/positionnement-requests', positionnementRoutes);      // Pour le back office
app.use('/formations', formationsRoutes);
app.use('/apprenants', apprenantsRoutes);
app.use('/competences', competencesRoutes);
app.use('/actions-correctives', actionsCorrectivesRoutes);
app.use('/dossiers', documentsRoutes);
app.use('/programmes-personnalises', programmesPersonnalisesRoutes);
app.use('/dossiers-formation', dossiersFormationRoutes);
app.use('/programmes-formation', programmesFormationRoutes);
app.use('/api/programmes', programmeRoutes); // Nouvelle API pour les programmes du catalogue

// Route de santé
app.get('/', (req, res) => {
  res.json({ message: 'API d\'authentification et de gestion opérationnelle' });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

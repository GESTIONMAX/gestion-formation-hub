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

// Charger les variables d'environnement
dotenv.config();

// Créer l'application Express
const app = express();
const PORT = process.env.PORT || 5000;

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

// Route de santé
app.get('/', (req, res) => {
  res.json({ message: 'API d\'authentification et de gestion opérationnelle' });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

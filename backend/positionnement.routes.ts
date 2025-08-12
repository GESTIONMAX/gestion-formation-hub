import express from 'express';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const router = express.Router();
const prisma = new PrismaClient();

// Liste des statuts valides pour les demandes de positionnement
const VALID_STATUSES = ['en_attente', 'traite', 'rdv_fixe', 'annule'];

// Route POST pour créer une nouvelle demande de positionnement
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      nomBeneficiaire,
      prenomBeneficiaire,
      email: emailBeneficiaire,
      telephone: telephoneBeneficiaire,
      formationSelectionnee,
      dateNaissance,
      sexe,
      situationHandicap,
      adresse,
      codePostal,
      ville,
      statut,
      experienceWordpress,
      objectifsPrincipaux,
      niveauMaitrise,
      programmeFormation
    } = req.body;

    // Créer une nouvelle demande de positionnement avec Prisma
    const newRequest = await prisma.positionnementRequest.create({
      data: {
        nomBeneficiaire,
        prenomBeneficiaire,
        emailBeneficiaire,
        telephoneBeneficiaire,
        formationSelectionnee,
        dateDebutSouhaitee: dateNaissance ? new Date(dateNaissance) : null, // Utilisation du champ correct dans le modèle
        // Le champ sexe n'existe pas, l'inclure dans les commentaires
        hasHandicap: situationHandicap === 'oui', // Conversion en booléen
        // Ces champs ne sont pas présents dans le modèle, nous les stockons dans niveauBeneficiaire et commentaires
        niveauBeneficiaire: `${adresse || ''}, ${codePostal || ''}, ${ville || ''}`,
        commentaires: `Sexe: ${sexe || 'Non spécifié'}, Adresse: ${adresse || 'Non spécifiée'}, Code postal: ${codePostal || 'Non spécifié'}, Ville: ${ville || 'Non spécifiée'}`,
        statut: statut || 'nouveau',
        // Conversion des autres champs en objectifs et pratiqueActuelle
        objectifs: objectifsPrincipaux ? [objectifsPrincipaux] : ['Formation requise'],
        pratiqueActuelle: `Expérience WordPress: ${experienceWordpress || 'Non spécifié'}, Niveau de maîtrise: ${niveauMaitrise || 'Débutant'},`,
        // Ajout du programmeFormation s'il existe
        situationActuelle: programmeFormation || 'à déterminer',
        // Champs obligatoires manquants
        attentes: 'En attente d\'une précision lors du rendez-vous',
        dateDispo: 'A déterminer lors du premier contact',
        // Le statut par défaut est 'nouveau'
        // Enlever le champ status qui n'existe pas
      }
    });

    res.status(201).json(newRequest);
  } catch (error) {
    console.error('Erreur lors de la création de la demande de positionnement:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la création de la demande de positionnement',
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

// Route GET pour récupérer toutes les demandes de positionnement
router.get('/', async (req: Request, res: Response) => {
  try {
    const requests = await prisma.positionnementRequest.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    res.status(200).json(requests);
  } catch (error) {
    console.error('Erreur lors de la récupération des demandes de positionnement:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la récupération des demandes de positionnement',
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

// Route GET pour récupérer une demande de positionnement spécifique
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const request = await prisma.positionnementRequest.findUnique({
      where: { id }
    });
    
    if (!request) {
      return res.status(404).json({ message: 'Demande de positionnement non trouvée' });
    }
    
    res.status(200).json(request);
  } catch (error) {
    console.error('Erreur lors de la récupération de la demande de positionnement:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la récupération de la demande de positionnement',
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

// Route PUT pour mettre à jour le statut d'une demande de positionnement
router.put('/:id/status', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // Vérifier que le statut est valide
    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ 
        message: `Statut invalide. Les statuts valides sont: ${VALID_STATUSES.join(', ')}` 
      });
    }
    
    // Vérifier que la demande existe
    const existingRequest = await prisma.positionnementRequest.findUnique({
      where: { id }
    });
    
    if (!existingRequest) {
      return res.status(404).json({ message: 'Demande de positionnement non trouvée' });
    }
    
    // Mettre à jour le statut
    const updatedRequest = await prisma.positionnementRequest.update({
      where: { id },
      data: { statut: status }
    });
    
    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la mise à jour du statut',
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

// Route POST pour créer un programme de formation à partir d'une demande de positionnement
router.post('/:id/programme', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { 
      titre, 
      code,
      type = 'sur-mesure', // Par défaut, c'est une formation sur-mesure
      duree, 
      modalites, 
      contenuDetailleJours,
      objectifs,
      prerequis,
      publicConcerne,
      prix
    } = req.body;
    
    // Vérifier que la demande de positionnement existe
    const positionnement = await prisma.positionnementRequest.findUnique({
      where: { id }
    });
    
    if (!positionnement) {
      return res.status(404).json({ message: 'Demande de positionnement non trouvée' });
    }
    
    // Créer un nouveau programme de formation basé sur la demande de positionnement
    const nouveauProgramme = await prisma.programmeFormation.create({
      data: {
        titre: titre || `Programme personnalisé pour ${positionnement.nomBeneficiaire} ${positionnement.prenomBeneficiaire}`,
        code: code || `SUR-MESURE-${Date.now().toString().slice(-6)}`, // Générer un code unique si non fourni
        type,
        // Champs obligatoires du modèle ProgrammeFormation
        description: `Programme personnalisé créé suite à une demande de positionnement de ${positionnement.nomBeneficiaire} ${positionnement.prenomBeneficiaire}`,
        duree: duree || '21h (3 jours)',
        modalites: modalites || 'Présentiel ou distanciel selon disponibilités',
        contenuDetailleJours: contenuDetailleJours || 'Programme à définir en fonction des besoins spécifiques',
        objectifs: objectifs || positionnement.objectifs,
        objectifsSpecifiques: positionnement.commentaires,
        prerequis: prerequis || 'Aucun prérequis spécifique',
        publicConcerne: publicConcerne || 'Professionnels souhaitant développer leurs compétences',
        niveau: positionnement.niveauBeneficiaire || 'Débutant',
        prix: prix || 'Sur devis',
        participants: '1 à 3 personnes',
        modalitesAcces: 'Inscription sur demande, délai d\'accès à définir en fonction des disponibilités',
        modalitesTechniques: 'Formation en présentiel ou distanciel selon besoins',
        
        // Champs réglementaires obligatoires
        modalitesReglement: 'Paiement par virement ou chèque à réception de facture',
        formateur: 'Aurélien Lien, formateur certifié',
        ressourcesDisposition: 'Support de cours numérique, environnement de test, accès à la plateforme pédagogique',
        modalitesEvaluation: 'QCM, travaux pratiques, projet final',
        sanctionFormation: 'Attestation de fin de formation',
        niveauCertification: 'Non certifiant',
        delaiAcceptation: 'Inscription jusqu\'à 48h avant le début de la formation sous réserve de places disponibles',
        accessibiliteHandicap: 'Formation accessible aux personnes en situation de handicap. Contactez notre référent handicap.',
        cessationAbandon: 'En cas d\'abandon, facturation des heures suivies au prorata temporis',
        
        estActif: true,
        estVisible: false // Par défaut, un programme sur-mesure n'est pas visible dans le catalogue
      }
    });
    
    // Mettre à jour la demande de positionnement pour indiquer qu'un programme a été créé
    await prisma.positionnementRequest.update({
      where: { id },
      data: {
        statut: 'programme_cree',
        commentaires: `${positionnement.commentaires} | Programme de formation créé le ${new Date().toLocaleDateString('fr-FR')}, ID: ${nouveauProgramme.id}`
      }
    });
    
    res.status(201).json({
      message: 'Programme de formation créé avec succès',
      programme: nouveauProgramme,
      positionnement: {
        id: positionnement.id,
        nomBeneficiaire: positionnement.nomBeneficiaire,
        emailBeneficiaire: positionnement.emailBeneficiaire
      }
    });
  } catch (error) {
    console.error('Erreur lors de la création du programme de formation:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la création du programme de formation',
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

export default router;

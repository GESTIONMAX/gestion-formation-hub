import express from 'express';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import puppeteer from 'puppeteer';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as handlebars from 'handlebars';

// Définir un type pour stocker les données des templates
interface TemplateData {
  nom_apprenant: string;
  ref_dossier: string;
  formation_titre: string;
  date_debut: string;
  date_fin: string;
  duree_formation: string;
  objectifs: string;
  modalites: string;
  date_generation: string;
  
  // Champs supplémentaires pour les templates avancés
  objectifsSpecifiques?: string;
  contenu?: string;
  prerequis?: string;
  publicConcerne?: string;
  horaires?: string;
  modalitesAcces?: string;
  delaiAcces?: string;
  tarif?: string;
  modalitesReglement?: string;
  referentPedagogique?: string;
  referentQualite?: string;
  modalitesTechniques?: string;
  formateur?: string;
  ressourcesDisposition?: string;
  modalitesEvaluation?: string;
  sanctionFormation?: string;
  niveauCertification?: string;
  delaiAcceptation?: string;
  accessibiliteHandicap?: string;
  cessationAnticipee?: string;
}

const router = express.Router();
const prisma = new PrismaClient();

// Fonction utilitaire pour compiler un template et générer un HTML
const compileTemplate = (templatePath: string, data: TemplateData | Record<string, any>): string => {
  const templateSource = fs.readFileSync(templatePath, 'utf8');
  const template = handlebars.compile(templateSource);
  return template(data);
};

// Fonction pour générer un PDF à partir de HTML
const generatePdf = async (html: string, outputPath: string): Promise<void> => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    // Ajouter des styles supplémentaires pour les impressions PDF
    await page.addStyleTag({
      content: `
        @page {
          margin: 1cm;
        }
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
        }
      `
    });
    
    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '1cm',
        right: '1cm',
        bottom: '1cm',
        left: '1cm'
      }
    });
  } finally {
    await browser.close();
  }
};

// Route pour générer des documents pour un dossier spécifique
router.post('/:id/generate-documents', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Récupérer les données du dossier avec toutes les relations nécessaires
    const dossier = await prisma.dossierFormation.findUnique({
      where: { id },
      include: {
        apprenant: true,
        formation: {
          include: {
            programmesPersonnalises: true
          }
        },
        positionnement: true
      }
    });
    
    if (!dossier) {
      return res.status(404).json({ message: 'Dossier non trouvé' });
    }
    
    // Créer le dossier de documents si nécessaire
    const dossierRef = `DEV-${new Date().getFullYear()}-${id.substring(0, 4)}`;
    const documentsDir = path.join(__dirname, '..', 'documents', `dossier-${dossierRef}`);
    await fs.ensureDir(documentsDir);
    
    // Récupérer les informations de l'apprenant et de la formation
    const apprenant = dossier.apprenant;
    const formation = dossier.formation as any;
    
    // Récupération des données du programme personnalisé si disponible
    const programmePersonnalise = formation.programmesPersonnalises && formation.programmesPersonnalises.length > 0 
      ? formation.programmesPersonnalises[0] as any 
      : null;
    
    // Préparer les données pour les templates
    const templateData: TemplateData & Record<string, any> = {
      nom_apprenant: apprenant.nom,
      ref_dossier: dossierRef,
      formation_titre: formation.code,
      date_debut: dossier.dateDebut ? new Date(dossier.dateDebut).toLocaleDateString('fr-FR') : 'À définir',
      date_fin: dossier.dateFin ? new Date(dossier.dateFin).toLocaleDateString('fr-FR') : 'À définir',
      duree_formation: formation.duree || '8',
      objectifs: formation.objectifsPedagogiques || 'Non définis',
      modalites: 'Formation individuelle à distance avec accompagnement personnalisé',
      date_generation: new Date().toLocaleDateString('fr-FR'),
      
      // Champs supplémentaires pour les nouveaux templates - mapping depuis le modèle existant
      objectifsSpecifiques: programmePersonnalise?.objectifsSpecifiques || 'Initiation et maîtrise des compétences fondamentales',
      contenu: programmePersonnalise?.contenu || 'Mise en application et évaluation des connaissances',
      prerequis: formation.prerequis || 'Aucun prérequis spécifique',
      publicConcerne: formation.publicConcerne || 'Tout public',
      horaires: formation.horaires || '09:00-13:00',
      modalitesAcces: formation.modalitesAcces || 'Formation à distance',
      delaiAcces: programmePersonnalise?.delaiAcces || 'Immédiat après validation',
      tarif: formation.tarif || 'Formation dispensée à titre gracieux',
      modalitesReglement: formation.modalitesReglement || 'Sans objet',
      referentPedagogique: programmePersonnalise?.referentPedagogique || 'Monsieur L.',
      referentQualite: programmePersonnalise?.referentQualite || 'Monsieur L.',
      modalitesTechniques: programmePersonnalise?.modalitesTechniques || 'Visioconférence et supports numériques',
      formateur: programmePersonnalise?.formateur || 'Formateur expert certifié',
      ressourcesDisposition: programmePersonnalise?.ressourcesDisposition || 'Supports pédagogiques numériques',
      modalitesEvaluation: formation.modalitesEvaluation || 'Quiz et mise en situation professionnelle',
      sanctionFormation: formation.sanctionFormation || programmePersonnalise?.sanctionFormation || 'Attestation de formation',
      niveauCertification: programmePersonnalise?.niveauCertification || 'Non applicable',
      delaiAcceptation: programmePersonnalise?.delaiAcceptation || '7 jours',
      accessibiliteHandicap: formation.accessibiliteHandicapee || programmePersonnalise?.accessibiliteHandicap || 'Formation adaptée pour tous types de handicap',
      cessationAnticipee: formation.cessationAbandon || programmePersonnalise?.cessationAnticipee || 'Remboursement au prorata temporis'
    };
    
    // Liste des documents à générer avec leurs templates
    const documents = [
      {
        name: 'convention',
        template: path.join(__dirname, 'templates', 'convention.html'),
        output: path.join(documentsDir, 'convention.pdf'),
      },
      {
        name: 'emargement',
        template: path.join(__dirname, 'templates', 'emargement.html'),
        output: path.join(documentsDir, 'emargement.pdf'),
      },
      {
        name: 'convocation',
        template: path.join(__dirname, 'templates', 'convocation.html'),
        output: path.join(documentsDir, 'convocation.pdf'),
      }
    ];
    
    // Générer chaque document
    for (const doc of documents) {
      const html = compileTemplate(doc.template, templateData);
      await generatePdf(html, doc.output);
    }
    
    // Enregistrer les documents générés dans la base de données
    for (const doc of documents) {
      await prisma.documentFormation.create({
        data: {
          dossierFormationId: dossier.id,
          nom: doc.name,
          type: 'pdf',
          url: `/documents/dossier-${dossierRef}/${doc.name}.pdf`
        }
      });
    }
    
    // Retourner les chemins des documents générés
    const documentUrls = documents.map(doc => ({
      name: doc.name,
      url: `/documents/dossier-${dossierRef}/${doc.name}.pdf`
    }));
    
    res.status(200).json({
      message: 'Documents générés avec succès',
      documents: documentUrls
    });
    
  } catch (error) {
    console.error('Erreur lors de la génération des documents:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la génération des documents',
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

export default router;

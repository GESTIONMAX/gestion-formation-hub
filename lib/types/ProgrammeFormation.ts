/**
 * Type représentant un programme de formation
 * Conforme aux exigences Qualiopi pour les programmes de formation
 */
export interface ProgrammeFormation {
  /** Identifiant unique du programme */
  id: string;
  
  /** Titre du programme de formation */
  titre: string;
  
  /** Description détaillée du programme */
  description: string;
  
  /** Code du programme */
  code: string;
  
  /** Catégorie du programme */
  categorie: string;
  
  /** ID de la catégorie */
  categorieId: string;
  
  /** Objectifs pédagogiques */
  objectifsPedagogiques: string;
  
  /** Objectifs spécifiques */
  objectifsSpecifiques: string[];
  
  /** Programme détaillé */
  programmeDetaille: string;
  
  /** Public visé */
  publicVise: string;
  
  /** Prérequis pour suivre la formation */
  prerequis: string[];
  
  /** Durée de la formation en jours */
  duree: number;
  
  /** Type de programme (catalogue ou sur-mesure) */
  type: 'catalogue' | 'sur-mesure';
  
  /** Statut du programme (actif, inactif, brouillon) */
  statut: 'actif' | 'inactif' | 'brouillon';
  
  /** Référence du programme */
  reference: string;
  
  /** Code CPF si éligible */
  codeCPF?: string;
  
  /** Domaine de formation */
  domaine?: string;
  
  /** Mots-clés pour la recherche */
  tags?: string[];
  
  /** URL de l'image de couverture */
  imageUrl?: string;
  
  /** Coût de la formation */
  cout?: number;
  
  /** Modalités de la formation */
  modalites: string;
  
  /** Tarif en intra-entreprise */
  tarifIntraEntreprise?: number;
  
  /** Tarif en inter-entreprise */
  tarifInterEntreprise?: number;
  
  /** Informations d'accessibilité */
  accessibilite?: string;
  
  /** ID de la demande de positionnement associée */
  positionnementRequestId?: string;
  
  /** ID du bénéficiaire */
  beneficiaireId?: string;
  
  /** Indique si la formation est éligible au CPF */
  eligibleCPF: boolean;
  
  /** Indique si la formation est accessible aux personnes en situation de handicap */
  accessibleHandicap: boolean;
  
  /** Date de création */
  createdAt: Date;
  
  /** Date de dernière mise à jour */
  updatedAt: Date;
}

/**
 * Type pour la création d'un nouveau programme (sans les champs générés)
 */
export type NouveauProgrammeFormation = Omit<ProgrammeFormation, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Type pour la mise à jour partielle d'un programme
 */
export type MiseAJourProgramme = Partial<Omit<ProgrammeFormation, 'id' | 'createdAt' | 'updatedAt'>>;

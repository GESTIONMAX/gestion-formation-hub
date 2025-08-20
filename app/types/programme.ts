/**
 * Type représentant une catégorie de programme de formation
 */
export interface CategorieFormation {
  id: string;
  nom?: string;
  titre: string;
  code?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Type représentant un programme de formation
 * Conforme aux exigences Qualiopi pour les informations obligatoires
 */
export interface ProgrammeFormation {
  id: string;
  code: string;
  titre: string;
  description: string;
  type: 'catalogue' | 'sur-mesure';
  
  // Champs descriptifs
  niveau?: string;
  participants?: string;
  duree: number | string;
  prix?: string;
  objectifs?: string[];
  prerequis?: string;
  modalites: 'Présentiel' | 'Distanciel' | 'Mixte' | string;
  
  // Champs Qualiopi obligatoires
  objectifsPedagogiques?: string;
  programmeDetaille?: string;
  publicVise?: string;
  publicConcerne?: string;
  contenuDetailleJours?: string;
  contenuDetailleHtml?: string;
  programme?: string;
  modalitesAcces?: string;
  modalitesTechniques?: string;
  modalitesReglement?: string;
  formateur?: string;
  ressourcesDisposition?: string;
  modalitesEvaluation?: string;
  sanctionFormation?: string;
  niveauCertification?: string;
  delaiAcceptation?: string;
  accessibiliteHandicap?: string;
  cessationAbandon?: string;
  
  // Informations tarifaires
  tarifIntraEntreprise?: number;
  tarifInterEntreprise?: number;
  
  // Catégorie
  categorieId: string;
  categorie?: CategorieFormation | {
    id: string;
    code: string;
    titre: string;
    description: string;
  };
  
  // Style et affichage
  pictogramme?: string;
  programmeUrl?: string | null;
  
  // Statut
  estActif: boolean;
  version?: string;
  typeProgramme?: string;
  
  // Champs spécifiques sur-mesure
  accessibilite?: string;
  beneficiaireId?: string;
  objectifsSpecifiques?: string;
  positionnementRequestId?: string | null;
  
  // Dates
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

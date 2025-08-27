export interface ProgrammeFormation {
  id?: string;
  code?: string;
  titre: string;
  description: string;
  type?: 'catalogue' | 'sur-mesure';
  typeProgramme?: string;
  version?: number;
  estActif?: boolean;
  objectifsPedagogiques?: string;
  objectifs?: string[];
  objectifsSpecifiques?: string;
  prerequis?: string;
  publicCible?: string;
  publicConcerne?: string;
  modalitesPedagogiques?: string;
  modalites?: string;
  modalitesAcces?: string;
  modalitesReglement?: string;
  modalitesEvaluation?: string;
  duree: string | number;
  prix: number;
  niveau?: string;
  participants?: string;
  programme?: string;
  contenuDetailleJours?: any;
  ressourcesDisposition?: string;
  accessibiliteHandicap?: string;
  sanctionFormation?: string;
  delaiAcceptation?: string;
  pictogramme?: string;
  niveauCertification?: string;
  formateur?: string;
  categorieId?: string;
  statut?: string;
  horaires?: string;
  tarif?: number;
  created?: Date;
  updated?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  categorie?: CategorieFormation; // Relation avec catégorie
  modules?: Module[];
}

export interface CategorieFormation {
  id: string;
  nom?: string;
  titre?: string;  // Ajout du champ titre pour compatibilité avec le code existant
  description?: string;
  slug?: string;
  programmes?: ProgrammeFormation[];
}

export interface Module {
  id: string;
  titre: string;
  description: string;
  duree: number;
  ordre: number;
  programmeId: string;
  programme?: ProgrammeFormation;
  sousModules?: SousModule[];
}

export interface SousModule {
  id: string;
  titre: string;
  description: string;
  duree: number;
  ordre: number;
  moduleId: string;
  module?: Module;
}

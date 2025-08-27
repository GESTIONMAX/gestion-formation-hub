// Types pour les formations
export interface Chapitre {
  id: string;
  titre: string;
  duree: number; // en heures
  objectifs: string[];
  contenu: string;
  ressources?: string[];
}

export interface Module {
  id: string;
  titre: string;
  description: string;
  dureeTotale: number; // en heures
  chapitres: Chapitre[];
  prerequis?: string[];
}

export interface Programme {
  id: string;
  titre: string;
  description: string;
  dureeTotale: number; // en heures
  modules: Module[];
  publicCible: string;
  prerequis: string[];
  objectifs: string[];
  modalites: {
    presentiel: boolean;
    distanciel: boolean;
    mixte: boolean;
  };
  tarif?: number;
  certification?: string;
  createdAt: Date;
  updatedAt: Date;
}

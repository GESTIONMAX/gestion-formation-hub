export interface ProgrammeFormation {
  id: string;
  titre: string;
  description: string;
  duree: string;
  prix: string;
  niveau: string;
  participants: string;
  objectifs: string[];
  prerequis: string;
  modalites: string;
  tauxParticipation?: string;
  tauxReussite?: string;
  programmeUrl?: string;
}

export interface CategorieFormation {
  id: string;
  titre: string;
  description: string;
  code: string;
  formations: Formation[];
}

export interface Formation extends ProgrammeFormation {
  categorieId: string;
  // Ajoutez d'autres propriétés spécifiques si nécessaire
}

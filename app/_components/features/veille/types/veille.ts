export type TypeVeille = 'reglementaire' | 'metier' | 'innovation';

export type StatutVeille = 'nouvelle' | 'en-cours' | 'terminee';

export interface Document {
  id: string;
  nom: string;
  type: string;
  url: string;
  dateAjout: Date;
}

export interface HistoriqueEntry {
  id: string;
  date: Date;
  description: string;
  utilisateur?: string;
}

export interface Veille {
  id: string;
  titre: string;
  description: string;
  type: TypeVeille;
  statut: StatutVeille;
  avancement: number;
  dateCreation: Date;
  dateEcheance?: Date;
  commentaires: string[];
  documents: Document[];
  historique: HistoriqueEntry[];
}

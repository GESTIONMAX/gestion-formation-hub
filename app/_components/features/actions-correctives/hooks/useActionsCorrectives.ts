export interface ActionCorrective {
  id: string;
  titre: string;
  description: string;
  statut: 'planifiee' | 'en_cours' | 'terminee' | 'annulee';
  priorite: 'faible' | 'moyenne' | 'haute' | 'critique';
  origine_type: 'reclamation' | 'incident' | 'audit' | 'veille';
  origine_ref?: string;
  origine_date?: string;
  origine_resume?: string;
  responsable_nom?: string;
  responsable_email?: string;
  date_echeance?: string;
  date_realisation?: string;
  indicateur_efficacite?: string;
  evaluation_efficacite?: string;
  avancement: number;
  created_at: string;
  updated_at: string;
}

export type CreateActionCorrectiveData = Omit<
  ActionCorrective,
  'id' | 'statut' | 'avancement' | 'created_at' | 'updated_at' | 'date_realisation' | 'evaluation_efficacite'
>;

export const useActionsCorrectives = () => {
  // Données factices pour les actions correctives
  const mockActionsCorrectives: ActionCorrective[] = [
    {
      id: "1",
      titre: "Amélioration du processus d'accueil des apprenants",
      description: "Suite à plusieurs réclamations concernant le manque d'information au début de la formation, mettre en place une procédure d'accueil plus structurée.",
      statut: "en_cours",
      priorite: "haute",
      origine_type: "reclamation",
      origine_ref: "REC-2025-004",
      origine_date: "2025-06-10T00:00:00Z",
      origine_resume: "Plusieurs stagiaires ont signalé ne pas avoir reçu les informations nécessaires au début de leur formation.",
      responsable_nom: "Marie Lambert",
      responsable_email: "m.lambert@gestionmax.fr",
      date_echeance: "2025-09-15T00:00:00Z",
      indicateur_efficacite: "Diminution de 80% des réclamations liées à l'accueil des nouveaux apprenants",
      avancement: 65,
      created_at: "2025-06-12T10:30:00Z",
      updated_at: "2025-07-18T14:15:00Z"
    },
    {
      id: "2",
      titre: "Mise à jour du matériel pédagogique sur React",
      description: "Le support de cours sur React n'est plus à jour avec les dernières évolutions du framework (hooks, etc.).",
      statut: "terminee",
      priorite: "moyenne",
      origine_type: "veille",
      origine_resume: "Mise à jour majeure de React et nouvelles bonnes pratiques",
      responsable_nom: "Thomas Dubois",
      responsable_email: "t.dubois@gestionmax.fr",
      date_echeance: "2025-07-01T00:00:00Z",
      date_realisation: "2025-06-28T00:00:00Z",
      indicateur_efficacite: "Support de cours à jour et validé par revue technique externe",
      evaluation_efficacite: "Support mis à jour et testé avec succès lors de deux sessions de formation",
      avancement: 100,
      created_at: "2025-05-20T09:15:00Z",
      updated_at: "2025-06-28T16:45:00Z"
    },
    {
      id: "3",
      titre: "Amélioration de l'accessibilité des supports numériques",
      description: "Rendre tous les supports pédagogiques numériques conformes aux normes d'accessibilité RGAA.",
      statut: "planifiee",
      priorite: "moyenne",
      origine_type: "audit",
      origine_ref: "AUD-2025-002",
      origine_date: "2025-07-05T00:00:00Z",
      origine_resume: "L'audit d'accessibilité a révélé que nos supports numériques ne sont pas conformes aux standards RGAA.",
      responsable_nom: "Sophie Martin",
      date_echeance: "2025-10-30T00:00:00Z",
      indicateur_efficacite: "100% des nouveaux supports conformes au RGAA",
      avancement: 10,
      created_at: "2025-07-10T11:20:00Z",
      updated_at: "2025-07-10T11:20:00Z"
    },
    {
      id: "4",
      titre: "Révision des procédures d'urgence",
      description: "Suite à un incident lors d'une session de formation, réviser et améliorer les procédures d'urgence et de premiers secours.",
      statut: "en_cours",
      priorite: "critique",
      origine_type: "incident",
      origine_date: "2025-07-02T00:00:00Z",
      origine_resume: "Un apprenant a fait un malaise pendant une formation et la procédure n'a pas été correctement suivie.",
      responsable_nom: "Jean Lefèvre",
      responsable_email: "j.lefevre@gestionmax.fr",
      date_echeance: "2025-08-15T00:00:00Z",
      indicateur_efficacite: "Formation de tout le personnel aux nouvelles procédures et réussite à 100% aux tests pratiques",
      avancement: 45,
      created_at: "2025-07-03T08:30:00Z",
      updated_at: "2025-07-15T11:20:00Z"
    },
    {
      id: "5",
      titre: "Optimisation du processus de certification Qualiopi",
      description: "Améliorer la préparation des audits de certification Qualiopi et optimiser la gestion documentaire associée.",
      statut: "planifiee",
      priorite: "haute",
      origine_type: "audit",
      origine_ref: "AUD-2025-003",
      origine_date: "2025-06-30T00:00:00Z",
      responsable_nom: "Isabelle Moreau",
      responsable_email: "i.moreau@gestionmax.fr",
      date_echeance: "2025-09-30T00:00:00Z",
      indicateur_efficacite: "Réussite de l'audit Qualiopi sans non-conformité",
      avancement: 25,
      created_at: "2025-07-05T14:00:00Z",
      updated_at: "2025-07-14T09:30:00Z"
    },
    {
      id: "6",
      titre: "Révision de la politique de protection des données",
      description: "Mettre à jour la politique de protection des données pour se conformer aux dernières évolutions du RGPD.",
      statut: "annulee",
      priorite: "faible",
      origine_type: "veille",
      origine_resume: "Nouvelles recommandations de la CNIL publiées en mai 2025",
      responsable_nom: "Marc Durand",
      date_echeance: "2025-08-30T00:00:00Z",
      indicateur_efficacite: "Politique validée par un avocat spécialisé RGPD",
      avancement: 0,
      created_at: "2025-06-15T10:45:00Z",
      updated_at: "2025-07-01T16:20:00Z"
    }
  ];

  return {
    actionsCorrectives: mockActionsCorrectives,
    loading: false,
    error: null,
    
    fetchActionsCorrectives: async () => {
      console.log("Récupération des actions correctives...");
      return mockActionsCorrectives;
    },
    
    getActionCorrective: async (id: string) => {
      console.log(`Récupération de l'action corrective ${id}...`);
      const action = mockActionsCorrectives.find(a => a.id === id);
      if (!action) throw new Error("Action corrective non trouvée");
      return action;
    },
    
    createActionCorrective: async (data: CreateActionCorrectiveData) => {
      console.log("Création d'une action corrective:", data);
      const now = new Date().toISOString();
      const newAction: ActionCorrective = {
        id: Date.now().toString(),
        ...data,
        statut: "planifiee",
        avancement: 0,
        created_at: now,
        updated_at: now
      };
      return newAction;
    },
    
    updateActionCorrective: async (id: string, updates: Partial<ActionCorrective>) => {
      console.log(`Mise à jour de l'action corrective ${id}:`, updates);
      const action = mockActionsCorrectives.find(a => a.id === id);
      if (!action) throw new Error("Action corrective non trouvée");
      
      const updatedAction = {
        ...action,
        ...updates,
        updated_at: new Date().toISOString()
      };
      
      return updatedAction;
    },
    
    deleteActionCorrective: async (id: string) => {
      console.log(`Suppression de l'action corrective ${id}`);
      const actionIndex = mockActionsCorrectives.findIndex(a => a.id === id);
      if (actionIndex === -1) throw new Error("Action corrective non trouvée");
      return { id };
    },
    
    getStats: async () => {
      console.log("Récupération des statistiques...");
      return {
        total: mockActionsCorrectives.length,
        planifiees: mockActionsCorrectives.filter(a => a.statut === 'planifiee').length,
        enCours: mockActionsCorrectives.filter(a => a.statut === 'en_cours').length,
        terminees: mockActionsCorrectives.filter(a => a.statut === 'terminee').length,
        annulees: mockActionsCorrectives.filter(a => a.statut === 'annulee').length,
        prioriteHaute: mockActionsCorrectives.filter(a => a.priorite === 'haute' || a.priorite === 'critique').length,
        tauxRealisation: (mockActionsCorrectives.filter(a => a.statut === 'terminee').length / mockActionsCorrectives.length) * 100
      };
    }
  };
};

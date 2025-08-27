// Types pour les réclamations
export interface Reclamation {
  id: string;
  nom: string;
  email: string;
  telephone?: string;
  sujet: string;
  message: string;
  statut: 'nouvelle' | 'en_cours' | 'resolue' | 'fermee';
  priorite: 'basse' | 'normale' | 'haute' | 'urgente';
  notes_internes?: string;
  date_resolution?: string;
  created_at: string;
  updated_at: string;
}

// Hook temporaire pour la gestion des réclamations
export const useReclamations = () => {
  // Données factices pour les exemples
  const mockReclamations: Reclamation[] = [
    {
      id: "1",
      nom: "Jean Dupont",
      email: "jean.dupont@exemple.com",
      telephone: "06 12 34 56 78",
      sujet: "Problème d'accès à la formation en ligne",
      message: "Je n'arrive pas à accéder au module 3 de la formation React. Le lien semble être cassé.",
      statut: "en_cours",
      priorite: "haute",
      notes_internes: "Problème identifié, en attente de correctif technique.",
      created_at: "2025-07-15T10:22:30Z",
      updated_at: "2025-07-16T08:15:40Z"
    },
    {
      id: "2",
      nom: "Marie Martin",
      email: "marie.martin@exemple.com",
      sujet: "Demande de report de formation",
      message: "Pour des raisons personnelles, je souhaiterais reporter ma formation prévue le 25 juillet au mois de septembre.",
      statut: "resolue",
      priorite: "normale",
      notes_internes: "Report accepté pour le 15 septembre. Mail de confirmation envoyé.",
      date_resolution: "2025-07-14T16:30:00Z",
      created_at: "2025-07-12T09:05:22Z",
      updated_at: "2025-07-14T16:30:00Z"
    },
    {
      id: "3",
      nom: "Thomas Lefebvre",
      email: "thomas.lefebvre@exemple.com",
      telephone: "07 98 76 54 32",
      sujet: "Erreur dans le certificat de formation",
      message: "Mon nom est mal orthographié sur le certificat que j'ai reçu. Il est écrit 'Lefevre' au lieu de 'Lefebvre'.",
      statut: "nouvelle",
      priorite: "urgente",
      created_at: "2025-07-20T11:42:18Z",
      updated_at: "2025-07-20T11:42:18Z"
    },
    {
      id: "4",
      nom: "Sophie Dubois",
      email: "sophie.dubois@exemple.com",
      sujet: "Question sur le contenu du cours Node.js",
      message: "Je voudrais savoir si le cours Node.js avancé couvre également les concepts de microservices et de serverless ?",
      statut: "fermee",
      priorite: "basse",
      notes_internes: "Ce n'est pas une réclamation mais une demande d'information. Réponse envoyée par mail.",
      date_resolution: "2025-07-10T14:22:00Z",
      created_at: "2025-07-09T16:30:45Z",
      updated_at: "2025-07-10T14:22:00Z"
    },
    {
      id: "5",
      nom: "Pierre Legrand",
      email: "pierre.legrand@exemple.com",
      telephone: "06 11 22 33 44",
      sujet: "Formateur absent à la session du 18 juillet",
      message: "Je me suis présenté à la formation Docker du 18 juillet mais le formateur n'était pas présent. Personne ne nous a prévenus.",
      statut: "en_cours",
      priorite: "urgente",
      notes_internes: "Incident grave. Le formateur a eu un problème de santé. Proposition de report + geste commercial à faire.",
      created_at: "2025-07-18T10:15:30Z",
      updated_at: "2025-07-18T14:20:10Z"
    }
  ];

  // Statistiques factices
  const stats = {
    total: mockReclamations.length,
    nouvelles: mockReclamations.filter(r => r.statut === 'nouvelle').length,
    en_cours: mockReclamations.filter(r => r.statut === 'en_cours').length,
    resolues: mockReclamations.filter(r => r.statut === 'resolue').length,
    fermees: mockReclamations.filter(r => r.statut === 'fermee').length,
    prioriteHaute: mockReclamations.filter(r => r.priorite === 'haute' || r.priorite === 'urgente').length,
    tempsResolutionMoyen: '3.5 jours',
    tauxResolution: '85%',
    evolution: '+12%'
  };

  return {
    reclamations: mockReclamations,
    stats,
    loading: false,
    error: null,
    
    fetchReclamations: async () => {
      console.log('Fetching reclamations...');
      return mockReclamations;
    },
    
    getReclamation: async (id: string) => {
      console.log(`Getting reclamation with ID: ${id}`);
      const reclamation = mockReclamations.find(r => r.id === id);
      if (!reclamation) throw new Error('Reclamation not found');
      return reclamation;
    },
    
    createReclamation: async (data: Omit<Reclamation, 'id' | 'created_at' | 'updated_at' | 'statut'>) => {
      console.log('Creating reclamation:', data);
      const now = new Date().toISOString();
      const newReclamation: Reclamation = {
        id: Date.now().toString(),
        ...data,
        statut: 'nouvelle',
        created_at: now,
        updated_at: now
      };
      return newReclamation;
    },
    
    updateReclamation: async (id: string, updates: Partial<Reclamation>) => {
      console.log('Updating reclamation:', id, updates);
      const reclamation = mockReclamations.find(r => r.id === id);
      if (!reclamation) throw new Error('Reclamation not found');
      
      const updatedReclamation = {
        ...reclamation,
        ...updates,
        updated_at: new Date().toISOString()
      };
      
      return updatedReclamation;
    },
    
    deleteReclamation: async (id: string) => {
      console.log('Deleting reclamation:', id);
      return { id };
    },
    
    getStats: async () => {
      console.log('Fetching reclamation statistics...');
      return stats;
    }
  };
};

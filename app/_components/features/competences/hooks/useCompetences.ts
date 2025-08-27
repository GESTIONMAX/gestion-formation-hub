// Types temporaires pour les compétences
interface Competence {
  id: string;
  nom: string;
  description: string;
  categorie: "technique" | "transversale" | "metier";
  niveau: "débutant" | "intermédiaire" | "avancé" | "expert";
  createdAt: string;
  updatedAt: string;
}

// Hook temporaire pour la gestion des compétences
export const useCompetences = () => {
  // Données factices pour les exemples
  const mockCompetences: Competence[] = [
    {
      id: "1",
      nom: "React.js",
      description: "Développement d'interfaces utilisateur interactives avec React",
      categorie: "technique",
      niveau: "avancé",
      createdAt: "2025-07-15T10:00:00Z",
      updatedAt: "2025-07-15T10:00:00Z"
    },
    {
      id: "2",
      nom: "Communication interpersonnelle",
      description: "Capacité à communiquer efficacement avec différents types d'interlocuteurs",
      categorie: "transversale",
      niveau: "expert",
      createdAt: "2025-07-16T14:30:00Z",
      updatedAt: "2025-07-16T14:30:00Z"
    },
    {
      id: "3",
      nom: "Gestion de projet agile",
      description: "Application des méthodologies agiles pour la gestion de projets informatiques",
      categorie: "metier",
      niveau: "intermédiaire",
      createdAt: "2025-07-17T09:15:00Z",
      updatedAt: "2025-07-17T09:15:00Z"
    },
    {
      id: "4",
      nom: "Next.js",
      description: "Framework React pour le développement d'applications web",
      categorie: "technique",
      niveau: "intermédiaire",
      createdAt: "2025-07-18T16:45:00Z",
      updatedAt: "2025-07-18T16:45:00Z"
    },
    {
      id: "5",
      nom: "Management d'équipe",
      description: "Compétences en leadership et gestion d'équipe",
      categorie: "transversale",
      niveau: "débutant",
      createdAt: "2025-07-19T11:20:00Z",
      updatedAt: "2025-07-19T11:20:00Z"
    }
  ];

  return {
    competences: mockCompetences,
    loading: false,
    error: null,
    fetchCompetences: async () => {
      console.log('Fetching competences...');
      return mockCompetences;
    },
    addCompetence: async (data: Partial<Competence>) => {
      console.log('Adding competence:', data);
      const newCompetence = {
        id: Date.now().toString(),
        nom: data.nom || '',
        description: data.description || '',
        categorie: data.categorie || 'technique',
        niveau: data.niveau || 'débutant',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      return newCompetence;
    },
    updateCompetence: async (id: string, data: Partial<Competence>) => {
      console.log('Updating competence:', id, data);
      const competence = mockCompetences.find(c => c.id === id);
      if (!competence) throw new Error('Competence not found');
      return {
        ...competence,
        ...data,
        updatedAt: new Date().toISOString()
      };
    },
    deleteCompetence: async (id: string) => {
      console.log('Deleting competence:', id);
      return { id };
    }
  };
};

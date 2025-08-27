// Types temporaires pour les rendez-vous
export interface Rendezvous {
  id: string;
  nomBeneficiaire: string;
  prenomBeneficiaire: string;
  emailBeneficiaire: string;
  telephoneBeneficiaire?: string;
  dateRdv?: string;
  canal?: string;
  statut: string;
  objectifs?: string[] | string;
  dateDispo?: string;
  modaliteFormation?: string;
  formationSelectionnee?: string;
  type?: string;
  dateImpact?: string;
  impactEvalue?: boolean;
  resultatImpact?: ImpactEvaluationData;
}

export interface RendezvousFormData {
  nomBeneficiaire?: string;
  prenomBeneficiaire?: string;
  emailBeneficiaire?: string;
  telephoneBeneficiaire?: string;
  dateRdv?: string;
  canal?: string;
  statut?: string;
  objectifs?: string[] | string;
  dateDispo?: string;
  modaliteFormation?: string;
  formationSelectionnee?: string;
}

export interface ImpactEvaluationData {
  satisfactionGlobale?: number;
  utilite?: number;
  evolutionCompetences?: number;
  impactProfessionnel?: number;
  commentaires?: string;
}

// Hook temporaire pour la gestion des rendez-vous
export const useRendezvous = () => {
  // Données factices pour les exemples
  const mockRendezvous: Rendezvous[] = [
    {
      id: '1',
      nomBeneficiaire: 'Dupont',
      prenomBeneficiaire: 'Jean',
      emailBeneficiaire: 'jean.dupont@exemple.com',
      telephoneBeneficiaire: '06 12 34 56 78',
      dateRdv: '2025-09-15T14:00:00',
      canal: 'visio',
      statut: 'rdv_planifie',
      objectifs: ['Reconversion', 'Développement compétences'],
      formationSelectionnee: 'Formation React Avancée'
    },
    {
      id: '2',
      nomBeneficiaire: 'Martin',
      prenomBeneficiaire: 'Sophie',
      emailBeneficiaire: 'sophie.martin@exemple.com',
      telephoneBeneficiaire: '07 98 76 54 32',
      statut: 'nouveau',
      objectifs: ['Certification']
    },
    {
      id: '3',
      nomBeneficiaire: 'Leclerc',
      prenomBeneficiaire: 'Pierre',
      emailBeneficiaire: 'pierre.leclerc@exemple.com',
      statut: 'termine',
      objectifs: ['Montée en compétences'],
      formationSelectionnee: 'Formation UI/UX Design'
    },
    {
      id: '4',
      nomBeneficiaire: 'Dubois',
      prenomBeneficiaire: 'Marie',
      emailBeneficiaire: 'marie.dubois@exemple.com',
      statut: 'termine',
      type: 'impact',
      dateImpact: '2025-10-20T10:00:00',
      impactEvalue: true,
      resultatImpact: {
        satisfactionGlobale: 4,
        utilite: 5,
        evolutionCompetences: 4,
        impactProfessionnel: 5,
        commentaires: 'Formation très utile qui m\'a permis de progresser dans ma carrière'
      },
      formationSelectionnee: 'Formation NodeJS Avancée'
    }
  ];

  return {
    rendezvous: mockRendezvous,
    loading: false,
    error: null,
    fetchRendezvous: async (status?: string, type?: string) => {
      console.log(`Fetching rendezvous with status: ${status}, type: ${type}`);
      return mockRendezvous;
    },
    createRendezvous: async (data: RendezvousFormData) => {
      console.log('Creating rendezvous:', data);
      return { id: '123', ...data };
    },
    updateRendezvous: async (id: string, data: Partial<RendezvousFormData>) => {
      console.log('Updating rendezvous:', id, data);
      return { id, ...data };
    },
    updateRendezvousStatut: async (id: string, statut: string) => {
      console.log('Updating rendezvous status:', id, statut);
      return { id, statut };
    },
    validerRendezvous: async (id: string, canal: string) => {
      console.log('Validating rendezvous:', id, canal);
      return { id, canal, statut: 'rdv_planifie' };
    },
    planifierImpact: async (id: string, dateImpact: string) => {
      console.log('Scheduling impact evaluation:', id, dateImpact);
      return { id, dateImpact };
    },
    completerEvaluationImpact: async (id: string, data: ImpactEvaluationData) => {
      console.log('Completing impact evaluation:', id, data);
      return { id, resultatImpact: data };
    },
    terminerImpact: async (id: string) => {
      console.log('Finishing impact evaluation:', id);
      return { id, statut: 'termine' };
    },
    genererRapportImpact: async (id: string) => {
      console.log('Generating impact report:', id);
      return { id, rapportUrl: 'https://example.com/rapport-impact.pdf' };
    }
  };
};

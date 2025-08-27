// Hook temporaire pour la gestion des apprenants
// À remplacer par l'implémentation complète lors de la migration

export const useApprenants = () => {
  return {
    apprenants: [
      {
        id: '1',
        nom: 'Jean Dupont',
        prenom: 'Jean',
        email: 'jean.dupont@exemple.com',
        telephone: '06 12 34 56 78'
      },
      {
        id: '2',
        nom: 'Marie Martin',
        prenom: 'Marie',
        email: 'marie.martin@exemple.com',
        telephone: '07 98 76 54 32'
      }
    ],
    loading: false,
    createApprenant: async (data: any) => console.log('Création apprenant:', data),
    updateApprenant: async (id: string, data: any) => console.log('Mise à jour apprenant:', id, data)
  };
};

// Hook temporaire pour l'authentification
// À remplacer par l'implémentation complète lors de la migration

export const useAuth = () => {
  return {
    user: { email: 'utilisateur@exemple.com' },
    logout: () => console.log('Déconnexion')
  };
};

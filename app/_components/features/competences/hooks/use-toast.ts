// Hook temporaire pour les notifications toast
// À remplacer par l'implémentation complète lors de la migration

export const useToast = () => {
  return {
    toast: (props: any) => console.log('Toast:', props)
  };
};

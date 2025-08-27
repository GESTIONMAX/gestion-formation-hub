type ToastProps = {
  title: string;
  description: string;
  variant?: 'default' | 'destructive';
};

export const useToast = () => {
  const toast = (props: ToastProps) => {
    // Version temporaire du hook useToast pour la migration
    console.log('Toast:', props.title, '-', props.description);
    
    // Afficher une alerte simple en attendant l'implémentation complète
    // Dans une vraie implémentation, cela utiliserait un système de toast UI
    const variant = props.variant || 'default';
    alert(`${props.title}\n${props.description}\n\nType: ${variant}`);
  };

  return {
    toast
  };
};

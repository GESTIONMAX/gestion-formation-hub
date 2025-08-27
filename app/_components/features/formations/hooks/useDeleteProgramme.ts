import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteProgramme = () => {
  const queryClient = useQueryClient();
  
  return useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/programmes/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression du programme');
      }
    },
    onSuccess: (_, id) => {
      // Invalidate and refresh the program list and specific program queries
      queryClient.invalidateQueries({ queryKey: ['programmes'] });
      queryClient.removeQueries({ queryKey: ['programme', id] });
    },
  });
};

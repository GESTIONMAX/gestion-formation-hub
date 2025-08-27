import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Programme } from '../types';

export const useUpdateProgramme = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Programme, Error, { id: string; data: Partial<Programme> }>({
    mutationFn: async ({ id, data }) => {
      const response = await fetch(`/api/programmes/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du programme');
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      // Invalidate and refresh the program list and specific program queries
      queryClient.invalidateQueries({ queryKey: ['programmes'] });
      queryClient.invalidateQueries({ queryKey: ['programme', data.id] });
    },
  });
};

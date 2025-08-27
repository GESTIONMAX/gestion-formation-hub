import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Programme } from '../types';

const API_URL = '/api/programmes';

export const useCreateProgramme = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Programme, Error, Omit<Programme, 'id' | 'createdAt' | 'updatedAt'>>({
    mutationFn: async (newProgramme) => {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProgramme),
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la création du programme');
      }
      
      return response.json();
    },
    onSuccess: () => {
      // Invalider et rafraîchir les requêtes des programmes
      queryClient.invalidateQueries({ queryKey: ['programmes'] });
    },
  });
};

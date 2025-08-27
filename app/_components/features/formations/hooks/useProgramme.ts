import { useQuery } from '@tanstack/react-query';
import { Programme } from '../types';

const API_URL = '/api/programmes';

export const useProgramme = (id: string) => {
  return useQuery<Programme>({
    queryKey: ['programme', id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération du programme');
      }
      return response.json();
    },
    enabled: !!id,
  });
};

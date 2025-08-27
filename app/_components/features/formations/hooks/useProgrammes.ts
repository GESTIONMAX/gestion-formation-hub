import { useQuery } from '@tanstack/react-query';
import { Programme } from '../types';

const API_URL = '/api/programmes';

export const useProgrammes = () => {
  return useQuery<Programme[]>({
    queryKey: ['programmes'],
    queryFn: async () => {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des programmes');
      }
      return response.json();
    },
  });
};

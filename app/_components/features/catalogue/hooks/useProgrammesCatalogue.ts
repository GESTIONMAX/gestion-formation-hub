import { useState, useEffect } from 'react';
import axios from 'axios';
import { Formation, CategorieFormation } from '@/_components/features/catalogue/types';

export const useProgrammesCatalogue = () => {
  const [programmes, setProgrammes] = useState<Formation[]>([]);
  const [categories, setCategories] = useState<CategorieFormation[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProgrammes = async () => {
    try {
      setLoading(true);
      // Utilise le nouvel endpoint pour les programmes HTML groupés par catégorie
      const response = await axios.get('/api/programmes-formation/par-categorie');
      
      // Stockage des catégories avec leurs programmes
      setCategories(response.data);
      
      // Extraction de tous les programmes pour la compatibilité avec le code existant
      const allProgrammes = response.data.flatMap((categorie: CategorieFormation) => categorie.formations);
      setProgrammes(allProgrammes);
      
      setError(null);
    } catch (err) {
      console.error("Erreur lors de la récupération des programmes:", err);
      setError("Impossible de charger les programmes de formation");
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour publier/dépublier un programme
  const toggleProgrammeStatus = async (programmeId: string, estActif: boolean) => {
    try {
      // Appel à l'API pour mettre à jour le statut de publication
      await axios.patch(`/api/programmes-formation/${programmeId}/status`, { estActif });
      
      // Mise à jour locale de l'état
      setProgrammes(programmes.map(prog => 
        prog.id === programmeId ? { ...prog, estActif: estActif } : prog
      ));
      
      return true;
    } catch (err) {
      console.error("Erreur lors de la modification du statut du programme:", err);
      return false;
    }
  };

  useEffect(() => {
    fetchProgrammes();
  }, []);

  return { 
    programmes, 
    categories,
    loading, 
    error, 
    refreshProgrammes: fetchProgrammes,
    toggleProgrammeStatus
  };
};

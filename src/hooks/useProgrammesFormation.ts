import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";

// Interface pour les programmes de formation unifiés
export interface ProgrammeFormation {
  id: string;
  code: string;
  type: "catalogue" | "sur-mesure"; // Type du programme (catalogue ou sur-mesure)
  titre: string;
  description: string;
  
  // Champs descriptifs
  niveau: string;
  participants: string;
  duree: string;
  prix: string;
  objectifs: string[];
  prerequis: string;
  modalites: string;
  
  // Champs réglementaires
  publicConcerne: string;
  contenuDetailleJours: string;
  modalitesAcces: string;
  modalitesTechniques: string;
  modalitesReglement: string;
  formateur: string;
  ressourcesDisposition: string;
  modalitesEvaluation: string;
  sanctionFormation: string;
  niveauCertification: string;
  delaiAcceptation: string;
  accessibiliteHandicap: string;
  cessationAbandon: string;
  
  // Champs spécifiques aux programmes sur-mesure
  beneficiaireId: string | null;
  objectifsSpecifiques: string | null;
  positionnementRequestId: string | null;
  
  // URL vers le programme HTML
  programmeUrl: string | null;
  
  // Catégorie
  categorieId: string | null;
  categorie?: {
    id: string;
    code: string;
    titre: string;
    description: string;
  };
  
  // Style
  pictogramme: string;
  
  // Dates
  createdAt: Date;
  updatedAt: Date;
}

export const useProgrammesFormation = () => {
  const [programmes, setProgrammes] = useState<ProgrammeFormation[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProgrammes = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/programmes-formation');
      setProgrammes(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des programmes de formation:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les programmes de formation',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgrammes();
  }, []);

  const createProgramme = async (
    programmeData: Omit<ProgrammeFormation, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    try {
      const response = await api.post('/api/programmes-formation', programmeData);
      const newProgramme = response.data;
      setProgrammes(prev => [newProgramme, ...prev]);
      toast({
        title: 'Programme créé',
        description: `Programme "${newProgramme.titre}" créé avec succès`,
      });
      return newProgramme;
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de créer le programme',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateProgramme = async (id: string, programmeData: Partial<ProgrammeFormation>) => {
    try {
      const response = await api.put(`/api/programmes-formation/${id}`, programmeData);
      const updated = response.data;
      setProgrammes(prev => prev.map(p => (p.id === id ? updated : p)));
      toast({
        title: 'Programme mis à jour',
        description: `Programme "${updated.titre}" mis à jour`,
      });
    } catch (error) {
      console.error('Erreur lors de la modification:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour le programme',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const deleteProgramme = async (id: string) => {
    try {
      const programme = programmes.find(p => p.id === id);
      await api.delete(`/api/programmes-formation/${id}`);
      setProgrammes(prev => prev.filter(p => p.id !== id));
      toast({
        title: 'Programme supprimé',
        description: `Programme "${programme?.titre}" supprimé avec succès`,
      });
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer le programme',
        variant: 'destructive',
      });
      throw error;
    }
  };

  // Récupérer les catégories de programmes
  const [categories, setCategories] = useState<ProgrammeFormation["categorie"][]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const response = await api.get('/api/categories-programme');
      setCategories(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des catégories:', error);
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Filtrer les programmes par catégorie
  const getProgrammesByCategorie = (categorieId: string) => {
    return programmes.filter(prog => prog.categorieId === categorieId);
  };

  // Filtrer les programmes par type
  const getProgrammesByType = (type: "catalogue" | "sur-mesure") => {
    return programmes.filter(prog => prog.type === type);
  };

  return {
    programmes,
    loading,
    createProgramme,
    updateProgramme,
    deleteProgramme,
    categories,
    loadingCategories,
    getProgrammesByCategorie,
    getProgrammesByType,
    refreshProgrammes: fetchProgrammes
  };
};

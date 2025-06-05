
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Interface pour les formations
interface Formation {
  id: string;
  titre: string;
  description: string;
  objectifs: string;
  programme: string;
  duree: string;
  public: string;
  pdfUrl?: string;
  version: number;
  dateCreation: string;
  dateModification: string;
  createdAt: string;
  // Informations légales
  prerequis: string;
  publicConcerne: string;
  dureeHoraires: string;
  modalitesAcces: string;
  tarif: string;
  modalitesReglement: string;
  accessibiliteHandicapee: string;
  modalitesEvaluation: string;
  sanctionFormation: string;
  cessationAbandon: string;
}

export const useFormations = () => {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();


  const fetchFormations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('formations')
        .select('*')
        .order('dateCreation', { ascending: false });

      if (error) throw error;
      setFormations((data || []) as Formation[]);
    } catch (error) {
      console.error('Erreur lors du chargement des formations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFormations();
  }, []);

  const createFormation = async (
    formationData: Omit<Formation, 'id' | 'createdAt' | 'version' | 'dateCreation' | 'dateModification'>
  ) => {
    try {
      const { data, error } = await supabase
        .from('formations')
        .insert([formationData])
        .select()
        .single();

      if (error) throw error;

      const newFormation = data as Formation;
      setFormations(prev => [newFormation, ...prev]);
      toast({
        title: 'Formation créée',
        description: `Formation "${newFormation.titre}" créée avec succès`,
      });
      return newFormation;
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      throw error;
    }
  };

  const updateFormation = async (id: string, formationData: Partial<Formation>) => {
    try {
      const { data, error } = await supabase
        .from('formations')
        .update(formationData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      const updated = data as Formation;
      setFormations(prev => prev.map(f => (f.id === id ? updated : f)));
      toast({
        title: 'Formation mise à jour',
        description: `Formation "${updated.titre}" mise à jour`,
      });
    } catch (error) {
      console.error('Erreur lors de la modification:', error);
      throw error;
    }
  };

  const deleteFormation = async (id: string) => {
    try {
      const { error } = await supabase.from('formations').delete().eq('id', id);
      if (error) throw error;

      const formation = formations.find(f => f.id === id);
      setFormations(prev => prev.filter(f => f.id !== id));

      toast({
        title: 'Formation supprimée',
        description: `Formation "${formation?.titre}" supprimée avec succès`,
      });
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      throw error;
    }
  };

  return {
    formations,
    loading,
    createFormation,
    updateFormation,
    deleteFormation,
  };
};

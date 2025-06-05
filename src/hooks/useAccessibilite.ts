
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface PlanAccessibilite {
  id: string;
  titre: string;
  description: string;
  typeHandicap: string;
  adaptationsPedagogiques: string;
  adaptationsMaterielles: string;
  adaptationsEvaluation: string;
  responsable: string;
  statut: "En cours" | "Validé" | "À réviser";
  dateCreation: string;
  dateMiseAJour: string;
}

interface DemandeAccessibilite {
  id: string;
  apprenantNom: string;
  apprenantEmail: string;
  typeHandicap: string;
  besoinsSpecifiques: string;
  documentsMedicaux: boolean;
  statut: "En attente" | "En cours d'analyse" | "Validée" | "Refusée";
  dateCreation: string;
  commentaires?: string;
}

export const useAccessibilite = () => {
  const [plansAccessibilite, setPlansAccessibilite] = useState<PlanAccessibilite[]>([]);
  const [demandesAccessibilite, setDemandesAccessibilite] = useState<DemandeAccessibilite[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: plans, error: plansError } = await supabase
        .from('plans_accessibilite')
        .select('*')
        .order('dateCreation', { ascending: false });

      if (plansError) throw plansError;

      const { data: demandes, error: demandesError } = await supabase
        .from('demandes_accessibilite')
        .select('*')
        .order('dateCreation', { ascending: false });

      if (demandesError) throw demandesError;

      setPlansAccessibilite((plans || []) as PlanAccessibilite[]);
      setDemandesAccessibilite((demandes || []) as DemandeAccessibilite[]);
    } catch (error) {
      console.error("Erreur lors du chargement des données d'accessibilité:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const creerPlanAccessibilite = async (
    planData: Omit<PlanAccessibilite, 'id' | 'dateCreation' | 'dateMiseAJour'>
  ) => {
    try {
      const { data, error } = await supabase
        .from('plans_accessibilite')
        .insert([planData])
        .select()
        .single();

      if (error) throw error;

      const nouveauPlan = data as PlanAccessibilite;
      setPlansAccessibilite(prev => [nouveauPlan, ...prev]);
      return nouveauPlan;
    } catch (error) {
      console.error('Erreur lors de la création du plan:', error);
      throw error;
    }
  };

  const traiterDemande = async (
    id: string,
    statut: DemandeAccessibilite['statut'],
    commentaires?: string
  ) => {
    try {
      const { data, error } = await supabase
        .from('demandes_accessibilite')
        .update({ statut, commentaires })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      const updated = data as DemandeAccessibilite;
      setDemandesAccessibilite(prev =>
        prev.map(d => (d.id === id ? updated : d))
      );
    } catch (error) {
      console.error("Erreur lors du traitement de la demande:", error);
      throw error;
    }
  };

  return {
    plansAccessibilite,
    demandesAccessibilite,
    loading,
    creerPlanAccessibilite,
    traiterDemande,
  };
};

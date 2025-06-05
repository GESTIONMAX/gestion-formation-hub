
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ActionCorrective {
  id: string;
  titre: string;
  description: string;
  statut: 'planifiee' | 'en_cours' | 'terminee' | 'annulee';
  origine_type: 'reclamation' | 'incident' | 'audit' | 'veille';
  origine_ref?: string;
  origine_date?: string;
  origine_resume?: string;
  priorite: 'faible' | 'moyenne' | 'haute' | 'critique';
  avancement: number;
  responsable_nom?: string;
  responsable_email?: string;
  date_echeance?: string;
  indicateur_efficacite?: string;
  created_at: string;
  updated_at: string;
}

export interface DocumentActionCorrective {
  id: string;
  action_corrective_id: string;
  nom: string;
  type: string;
  date_document: string;
  auteur: string;
  url?: string;
  created_at: string;
}

export interface HistoriqueActionCorrective {
  id: string;
  action_corrective_id: string;
  date_action: string;
  action: string;
  utilisateur: string;
  commentaire?: string;
  created_at: string;
}

export interface CreateActionCorrectiveData {
  titre: string;
  description: string;
  origine_type: 'reclamation' | 'incident' | 'audit' | 'veille';
  origine_ref?: string;
  origine_date?: string;
  origine_resume?: string;
  priorite?: 'faible' | 'moyenne' | 'haute' | 'critique';
  responsable_nom?: string;
  responsable_email?: string;
  date_echeance?: string;
  indicateur_efficacite?: string;
}

export const useActionsCorrectives = () => {
  const [actionsCorrectives, setActionsCorrectives] = useState<ActionCorrective[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchActionsCorrectives = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('actions_correctives')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }
      setActionsCorrectives(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des actions correctives:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les actions correctives",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createActionCorrective = async (data: CreateActionCorrectiveData) => {
    try {
      const { error } = await supabase
        .from('actions_correctives')
        .insert([{
          ...data,
          priorite: data.priorite || 'moyenne'
        }]);

      if (error) {
        throw error;
      }

      // Ajouter à l'historique
      await supabase
        .from('historique_actions_correctives')
        .insert([{
          action_corrective_id: data.titre, // Sera remplacé par l'ID réel
          action: 'Création',
          utilisateur: 'Système',
          commentaire: 'Action corrective créée'
        }]);

      toast({
        title: "Action corrective créée",
        description: "L'action corrective a été enregistrée avec succès",
      });

      await fetchActionsCorrectives();
      return true;
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer l'action corrective",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateActionCorrective = async (id: string, updates: Partial<ActionCorrective>) => {
    try {
      const { error } = await supabase
        .from('actions_correctives')
        .update(updates)
        .eq('id', id);

      if (error) {
        throw error;
      }

      // Ajouter à l'historique
      await supabase
        .from('historique_actions_correctives')
        .insert([{
          action_corrective_id: id,
          action: 'Modification',
          utilisateur: 'Système',
          commentaire: `Mise à jour: ${Object.keys(updates).join(', ')}`
        }]);

      toast({
        title: "Action corrective mise à jour",
        description: "Les modifications ont été sauvegardées",
      });

      await fetchActionsCorrectives();
      return true;
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour l'action corrective",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteActionCorrective = async (id: string) => {
    try {
      const { error } = await supabase
        .from('actions_correctives')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast({
        title: "Action corrective supprimée",
        description: "L'action corrective a été supprimée avec succès",
      });

      await fetchActionsCorrectives();
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'action corrective",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    fetchActionsCorrectives();
  }, []);

  return {
    actionsCorrectives,
    loading,
    createActionCorrective,
    updateActionCorrective,
    deleteActionCorrective,
    fetchActionsCorrectives,
  };
};

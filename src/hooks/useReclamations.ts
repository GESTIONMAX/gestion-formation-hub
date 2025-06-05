
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Reclamation {
  id: string;
  nom: string;
  email: string;
  telephone?: string;
  sujet: string;
  message: string;
  statut: 'nouvelle' | 'en_cours' | 'resolue' | 'fermee';
  priorite: 'basse' | 'normale' | 'haute' | 'urgente';
  assignee_id?: string;
  notes_internes?: string;
  date_resolution?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateReclamationData {
  nom: string;
  email: string;
  telephone?: string;
  sujet: string;
  message: string;
  priorite?: 'basse' | 'normale' | 'haute' | 'urgente';
}

export const useReclamations = () => {
  const [reclamations, setReclamations] = useState<Reclamation[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchReclamations = async () => {
    try {
      setLoading(true);
      // Temporarily use 'any' to bypass TypeScript errors until table is created
      const { data, error } = await (supabase as any)
        .from('reclamations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        // Check if table doesn't exist
        if (error.code === '42P01') {
          console.log('Table reclamations not created yet');
          setReclamations([]);
          return;
        }
        throw error;
      }
      setReclamations(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des réclamations:', error);
      toast({
        title: "Erreur",
        description: "La table réclamations n'existe pas encore. Veuillez d'abord exécuter le script SQL.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createReclamation = async (data: CreateReclamationData) => {
    try {
      // Temporarily use 'any' to bypass TypeScript errors until table is created
      const { error } = await (supabase as any)
        .from('reclamations')
        .insert([{
          ...data,
          priorite: data.priorite || 'normale'
        }]);

      if (error) {
        if (error.code === '42P01') {
          toast({
            title: "Erreur",
            description: "La table réclamations n'existe pas encore. Veuillez d'abord exécuter le script SQL.",
            variant: "destructive",
          });
          return false;
        }
        throw error;
      }

      toast({
        title: "Réclamation envoyée",
        description: "Votre réclamation a été enregistrée avec succès. Nous vous contacterons rapidement.",
      });

      await fetchReclamations();
      return true;
    } catch (error) {
      console.error('Erreur lors de la création de la réclamation:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer la réclamation",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateReclamation = async (id: string, updates: Partial<Reclamation>) => {
    try {
      // Temporarily use 'any' to bypass TypeScript errors until table is created
      const { error } = await (supabase as any)
        .from('reclamations')
        .update(updates)
        .eq('id', id);

      if (error) {
        if (error.code === '42P01') {
          toast({
            title: "Erreur",
            description: "La table réclamations n'existe pas encore. Veuillez d'abord exécuter le script SQL.",
            variant: "destructive",
          });
          return false;
        }
        throw error;
      }

      toast({
        title: "Réclamation mise à jour",
        description: "Les modifications ont été sauvegardées",
      });

      await fetchReclamations();
      return true;
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la réclamation",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    fetchReclamations();
  }, []);

  return {
    reclamations,
    loading,
    createReclamation,
    updateReclamation,
    fetchReclamations,
  };
};


import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Apprenant {
  id: string;
  nom: string;
  email: string;
  telephone?: string;
  createdAt: string;
}

export const useApprenants = () => {
  const [apprenants, setApprenants] = useState<Apprenant[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApprenants = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('apprenants')
        .select('*')
        .order('createdAt', { ascending: false });

      if (error) throw error;
      setApprenants((data || []) as Apprenant[]);
    } catch (error) {
      console.error('Erreur lors du chargement des apprenants:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprenants();
  }, []);

  const createApprenant = async (
    apprenantData: Omit<Apprenant, 'id' | 'createdAt'>
  ) => {
    try {
      const { data, error } = await supabase
        .from('apprenants')
        .insert([apprenantData])
        .select()
        .single();

      if (error) throw error;

      const newApprenant = data as Apprenant;
      setApprenants(prev => [newApprenant, ...prev]);
      return newApprenant;
    } catch (error) {
      console.error('Erreur lors de la création de l\'apprenant:', error);
      throw error;
    }
  };

  const updateApprenant = async (id: string, apprenantData: Partial<Apprenant>) => {
    try {
      const { data, error } = await supabase
        .from('apprenants')
        .update(apprenantData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      const updated = data as Apprenant;
      setApprenants(prev => prev.map(a => (a.id === id ? updated : a)));
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'apprenant:', error);
      throw error;
    }
  };

  return {
    apprenants,
    loading,
    createApprenant,
    updateApprenant,
  };
};

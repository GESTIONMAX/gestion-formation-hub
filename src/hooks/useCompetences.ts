
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Competence } from "@/types/competence";
import { useToast } from "@/hooks/use-toast";

export const useCompetences = () => {
  const [competences, setCompetences] = useState<Competence[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Charger toutes les compétences de l'utilisateur connecté
  const fetchCompetences = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('competences')
        .select('*')
        .order('date_creation', { ascending: false });

      if (error) {
        console.error('Erreur lors du chargement des compétences:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les compétences",
          variant: "destructive",
        });
        return;
      }

      // Convertir les données de la DB vers le format TypeScript
      const competencesFormatted: Competence[] = data.map(comp => ({
        id: comp.id,
        nom: comp.nom,
        description: comp.description,
        categorie: comp.categorie,
        domaineDeveloppement: comp.domaine_developpement,
        niveauActuel: comp.niveau_actuel,
        objectifNiveau: comp.objectif_niveau,
        statut: comp.statut,
        actionPrevue: comp.action_prevue,
        plateformeFomation: comp.plateforme_formation,
        lienFormation: comp.lien_formation,
        typePreuve: comp.type_preuve,
        contenuPreuve: comp.contenu_preuve,
        dateCreation: new Date(comp.date_creation),
        dateModification: new Date(comp.date_modification),
        formateurId: comp.formateur_id
      }));

      setCompetences(competencesFormatted);
    } catch (error) {
      console.error('Erreur lors du chargement des compétences:', error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Créer une nouvelle compétence
  const createCompetence = async (competenceData: Omit<Competence, "id" | "dateCreation" | "dateModification">) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Erreur",
          description: "Vous devez être connecté pour créer une compétence",
          variant: "destructive",
        });
        return false;
      }

      const { data, error } = await supabase
        .from('competences')
        .insert([{
          nom: competenceData.nom,
          description: competenceData.description,
          categorie: competenceData.categorie,
          domaine_developpement: competenceData.domaineDeveloppement,
          niveau_actuel: competenceData.niveauActuel,
          objectif_niveau: competenceData.objectifNiveau,
          statut: competenceData.statut,
          action_prevue: competenceData.actionPrevue,
          plateforme_formation: competenceData.plateformeFomation,
          lien_formation: competenceData.lienFormation,
          type_preuve: competenceData.typePreuve,
          contenu_preuve: competenceData.contenuPreuve,
          formateur_id: user.id
        }])
        .select()
        .single();

      if (error) {
        console.error('Erreur lors de la création de la compétence:', error);
        toast({
          title: "Erreur",
          description: "Impossible de créer la compétence",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Succès",
        description: "Compétence créée avec succès",
      });

      await fetchCompetences(); // Recharger la liste
      return true;
    } catch (error) {
      console.error('Erreur lors de la création de la compétence:', error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite",
        variant: "destructive",
      });
      return false;
    }
  };

  // Mettre à jour une compétence
  const updateCompetence = async (id: string, competenceData: Omit<Competence, "id" | "dateCreation" | "dateModification">) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Erreur",
          description: "Vous devez être connecté pour modifier une compétence",
          variant: "destructive",
        });
        return false;
      }

      const { error } = await supabase
        .from('competences')
        .update({
          nom: competenceData.nom,
          description: competenceData.description,
          categorie: competenceData.categorie,
          domaine_developpement: competenceData.domaineDeveloppement,
          niveau_actuel: competenceData.niveauActuel,
          objectif_niveau: competenceData.objectifNiveau,
          statut: competenceData.statut,
          action_prevue: competenceData.actionPrevue,
          plateforme_formation: competenceData.plateformeFomation,
          lien_formation: competenceData.lienFormation,
          type_preuve: competenceData.typePreuve,
          contenu_preuve: competenceData.contenuPreuve
        })
        .eq('id', id);

      if (error) {
        console.error('Erreur lors de la mise à jour de la compétence:', error);
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour la compétence",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Succès",
        description: "Compétence mise à jour avec succès",
      });

      await fetchCompetences(); // Recharger la liste
      return true;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la compétence:', error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite",
        variant: "destructive",
      });
      return false;
    }
  };

  // Supprimer une compétence
  const deleteCompetence = async (id: string) => {
    try {
      const { error } = await supabase
        .from('competences')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Erreur lors de la suppression de la compétence:', error);
        toast({
          title: "Erreur",
          description: "Impossible de supprimer la compétence",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Succès",
        description: "Compétence supprimée avec succès",
      });

      await fetchCompetences(); // Recharger la liste
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression de la compétence:', error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    fetchCompetences();
  }, []);

  return {
    competences,
    loading,
    createCompetence,
    updateCompetence,
    deleteCompetence,
    refetch: fetchCompetences
  };
};

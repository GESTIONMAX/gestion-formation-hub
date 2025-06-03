
import { useState, useEffect } from "react";

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

  const mockPlans: PlanAccessibilite[] = [
    {
      id: "1",
      titre: "Plan d'accessibilité - Déficience visuelle",
      description: "Adaptations pour les apprenants avec déficience visuelle",
      typeHandicap: "Déficience visuelle",
      adaptationsPedagogiques: "Support de cours en braille, descriptions audio des supports visuels",
      adaptationsMaterielles: "Logiciel de lecture d'écran, clavier en braille",
      adaptationsEvaluation: "Temps majoré de 30%, épreuve orale possible",
      responsable: "Sophie Martin",
      statut: "Validé",
      dateCreation: new Date().toISOString(),
      dateMiseAJour: new Date().toISOString(),
    },
    {
      id: "2",
      titre: "Plan d'accessibilité - Troubles DYS",
      description: "Adaptations pour les troubles de l'apprentissage",
      typeHandicap: "Troubles DYS",
      adaptationsPedagogiques: "Police adaptée, supports simplifiés, explications répétées",
      adaptationsMaterielles: "Logiciel d'aide à la lecture, correcteur orthographique",
      adaptationsEvaluation: "Temps majoré de 50%, reformulation autorisée",
      responsable: "Marie Dubois",
      statut: "En cours",
      dateCreation: new Date().toISOString(),
      dateMiseAJour: new Date().toISOString(),
    }
  ];

  const mockDemandes: DemandeAccessibilite[] = [
    {
      id: "1",
      apprenantNom: "Jean Dupont",
      apprenantEmail: "jean.dupont@email.com",
      typeHandicap: "Mobilité réduite",
      besoinsSpecifiques: "Accès en fauteuil roulant, pause supplémentaire",
      documentsMedicaux: true,
      statut: "En cours d'analyse",
      dateCreation: new Date().toISOString(),
      commentaires: "Demande urgente pour formation début janvier"
    },
    {
      id: "2",
      apprenantNom: "Alice Martin",
      apprenantEmail: "alice.martin@email.com",
      typeHandicap: "Déficience auditive",
      besoinsSpecifiques: "Interprète LSF, support écrit des consignes",
      documentsMedicaux: true,
      statut: "Validée",
      dateCreation: new Date().toISOString(),
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setTimeout(() => {
        setPlansAccessibilite(mockPlans);
        setDemandesAccessibilite(mockDemandes);
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  const creerPlanAccessibilite = async (planData: Omit<PlanAccessibilite, "id" | "dateCreation" | "dateMiseAJour">) => {
    const nouveauPlan: PlanAccessibilite = {
      ...planData,
      id: Date.now().toString(),
      dateCreation: new Date().toISOString(),
      dateMiseAJour: new Date().toISOString(),
    };
    
    setPlansAccessibilite(prev => [nouveauPlan, ...prev]);
    return nouveauPlan;
  };

  const traiterDemande = async (id: string, statut: DemandeAccessibilite["statut"], commentaires?: string) => {
    setDemandesAccessibilite(prev => 
      prev.map(demande => 
        demande.id === id 
          ? { ...demande, statut, commentaires }
          : demande
      )
    );
  };

  return {
    plansAccessibilite,
    demandesAccessibilite,
    loading,
    creerPlanAccessibilite,
    traiterDemande,
  };
};

import { useState, useEffect } from "react";

export type PlanAccessibilite = {
  id: string;
  titre: string;
  description: string;
  typeHandicap: string;
  responsable: string;
  adaptationsPedagogiques: string;
  statut: string;
  dateCreation: Date;
};

export type DemandeAccessibilite = {
  id: string;
  apprenantNom: string;
  apprenantEmail: string;
  typeHandicap: string;
  besoinsSpecifiques: string;
  documentsMedicaux: boolean;
  statut: string;
  dateCreation: Date;
  dateTraitement?: Date;
  commentaires?: string;
};

// Hook temporaire pour la migration
export function useAccessibilite() {
  const [loading, setLoading] = useState(true);
  const [plansAccessibilite, setPlansAccessibilite] = useState<PlanAccessibilite[]>([]);
  const [demandesAccessibilite, setDemandesAccessibilite] = useState<DemandeAccessibilite[]>([]);

  // Simuler chargement des données
  useEffect(() => {
    const timer = setTimeout(() => {
      // Données factices pour la migration
      setPlansAccessibilite([
        {
          id: "plan1",
          titre: "Plan d'accessibilité - Handicap visuel",
          description: "Adaptations pour personnes malvoyantes et non-voyantes",
          typeHandicap: "Handicap visuel",
          responsable: "Marie Dupont",
          adaptationsPedagogiques: "Documents en gros caractères, supports audio, description des éléments visuels",
          statut: "Validé",
          dateCreation: new Date(2025, 4, 15)
        },
        {
          id: "plan2",
          titre: "Plan d'accessibilité - Handicap auditif",
          description: "Adaptations pour personnes malentendantes",
          typeHandicap: "Handicap auditif",
          responsable: "Thomas Martin",
          adaptationsPedagogiques: "Sous-titres, interprétation LSF, supports visuels renforcés",
          statut: "En cours",
          dateCreation: new Date(2025, 5, 22)
        },
        {
          id: "plan3",
          titre: "Plan d'accessibilité - Troubles DYS",
          description: "Adaptations pour troubles de l'apprentissage",
          typeHandicap: "Troubles DYS",
          responsable: "Sophie Bernard",
          adaptationsPedagogiques: "Police adaptée, documents structurés, temps supplémentaire",
          statut: "À réviser",
          dateCreation: new Date(2025, 6, 10)
        }
      ]);

      setDemandesAccessibilite([
        {
          id: "demande1",
          apprenantNom: "Lucas Petit",
          apprenantEmail: "lucas.petit@example.com",
          typeHandicap: "Handicap moteur",
          besoinsSpecifiques: "Accessibilité des locaux, aménagement du poste de travail",
          documentsMedicaux: true,
          statut: "En cours d'analyse",
          dateCreation: new Date(2025, 7, 5)
        },
        {
          id: "demande2",
          apprenantNom: "Emma Richard",
          apprenantEmail: "emma.richard@example.com",
          typeHandicap: "Troubles DYS (dyslexie)",
          besoinsSpecifiques: "Supports adaptés, temps supplémentaire pour les exercices",
          documentsMedicaux: true,
          statut: "Validée",
          dateCreation: new Date(2025, 7, 12),
          dateTraitement: new Date(2025, 7, 18)
        },
        {
          id: "demande3",
          apprenantNom: "Alexandre Dubois",
          apprenantEmail: "alex.dubois@example.com",
          typeHandicap: "Handicap visuel",
          besoinsSpecifiques: "Documents agrandis, lecteur d'écran",
          documentsMedicaux: false,
          statut: "En attente",
          dateCreation: new Date(2025, 7, 20)
        }
      ]);

      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const traiterDemande = (id: string, nouveauStatut: string) => {
    setDemandesAccessibilite(prev => 
      prev.map(demande => 
        demande.id === id 
          ? { 
              ...demande, 
              statut: nouveauStatut,
              dateTraitement: new Date()
            } 
          : demande
      )
    );
    return Promise.resolve();
  };

  const creerPlanAccessibilite = (plan: Omit<PlanAccessibilite, "id" | "dateCreation" | "statut">) => {
    const nouveauPlan: PlanAccessibilite = {
      ...plan,
      id: `plan${plansAccessibilite.length + 1}`,
      dateCreation: new Date(),
      statut: "En cours"
    };

    setPlansAccessibilite(prev => [...prev, nouveauPlan]);
    return Promise.resolve();
  };

  return {
    loading,
    plansAccessibilite,
    demandesAccessibilite,
    traiterDemande,
    creerPlanAccessibilite
  };
};

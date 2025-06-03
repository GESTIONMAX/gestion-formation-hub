
import { useState, useEffect } from "react";
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
  createdAt: string;
}

export const useFormations = () => {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Données de démonstration (à remplacer par l'API Supabase)
  const mockFormations: Formation[] = [
    {
      id: "1",
      titre: "WordPress pour débutants",
      description: "Découvrez les bases de WordPress : installation, configuration, création de contenu et personnalisation de votre site web.",
      objectifs: "• Installer et configurer WordPress\n• Créer et gérer du contenu\n• Personnaliser l'apparence\n• Sécuriser son site",
      programme: "Module 1: Installation et configuration\n- Choix de l'hébergement\n- Installation WordPress\n- Configuration initiale\n\nModule 2: Création de contenu\n- Articles et pages\n- Médiathèque\n- Menus et widgets",
      duree: "21 heures",
      public: "Toute personne souhaitant créer un site web avec WordPress. Aucun prérequis technique nécessaire.",
      pdfUrl: "",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      titre: "WordPress avancé",
      description: "Maîtrisez les fonctionnalités avancées de WordPress : thèmes personnalisés, extensions, optimisation et sécurité.",
      objectifs: "• Développer des thèmes personnalisés\n• Créer des extensions\n• Optimiser les performances\n• Sécuriser efficacement",
      programme: "Module 1: Développement de thèmes\n- Structure des thèmes\n- Template hierarchy\n- Custom post types\n\nModule 2: Développement d'extensions\n- Hooks et filtres\n- API WordPress\n- Bonnes pratiques",
      duree: "35 heures",
      public: "Développeurs web ou utilisateurs confirmés de WordPress. Prérequis: bases HTML/CSS/PHP.",
      pdfUrl: "",
      createdAt: new Date().toISOString(),
    }
  ];

  useEffect(() => {
    // Simulation d'un appel API
    const fetchFormations = async () => {
      setLoading(true);
      try {
        // Ici, vous remplacerez par l'appel à l'API Supabase
        setTimeout(() => {
          setFormations(mockFormations);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Erreur lors du chargement des formations:", error);
        setLoading(false);
      }
    };

    fetchFormations();
  }, []);

  const createFormation = async (formationData: Omit<Formation, "id" | "createdAt">) => {
    try {
      // Ici, vous remplacerez par l'appel à l'API Supabase
      const newFormation: Formation = {
        ...formationData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      
      setFormations(prev => [newFormation, ...prev]);
      return newFormation;
    } catch (error) {
      console.error("Erreur lors de la création:", error);
      throw error;
    }
  };

  const updateFormation = async (id: string, formationData: Partial<Formation>) => {
    try {
      // Ici, vous remplacerez par l'appel à l'API Supabase
      setFormations(prev => 
        prev.map(formation => 
          formation.id === id ? { ...formation, ...formationData } : formation
        )
      );
    } catch (error) {
      console.error("Erreur lors de la modification:", error);
      throw error;
    }
  };

  const deleteFormation = async (id: string) => {
    try {
      // Ici, vous remplacerez par l'appel à l'API Supabase
      setFormations(prev => prev.filter(formation => formation.id !== id));
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


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
      version: 2,
      dateCreation: "2024-01-15T09:00:00.000Z",
      dateModification: "2024-03-10T14:30:00.000Z",
      createdAt: "2024-01-15T09:00:00.000Z",
      // Informations légales
      prerequis: "Maîtriser son environnement et les fonctions de base pour utiliser un ordinateur.",
      publicConcerne: "Artisans, commerçants ou professions libérales.",
      dureeHoraires: "14 heures ou 2 jours (9h à 13h et de 14h à 17h)",
      modalitesAcces: "À réception de votre accord de prise en charge pour les professionnels.",
      tarif: "980€ Nets de taxes Art-293 du CGI",
      modalitesReglement: "Chèque ou virement à réception de facture",
      accessibiliteHandicapee: "Démarche complète : entretien téléphonique, évaluation des besoins, mise en œuvre d'adaptations",
      modalitesEvaluation: "Quiz via EVALBOX, grille d'analyse des compétences, travaux pratiques",
      sanctionFormation: "Un certificat de réalisation de formation + feuille d'émargement",
      cessationAbandon: "Clause claire : non-facturation si abandon avant le début, facturation au prorata en cours de formation",
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
      version: 1,
      dateCreation: "2024-02-01T10:00:00.000Z",
      dateModification: "2024-02-01T10:00:00.000Z",
      createdAt: "2024-02-01T10:00:00.000Z",
      // Informations légales
      prerequis: "Maîtriser son environnement et les fonctions de base pour utiliser un ordinateur. Connaissances HTML/CSS/PHP requises.",
      publicConcerne: "Artisans, commerçants ou professions libérales avec expérience web.",
      dureeHoraires: "35 heures ou 5 jours (9h à 13h et de 14h à 17h)",
      modalitesAcces: "À réception de votre accord de prise en charge pour les professionnels.",
      tarif: "1 680€ Nets de taxes Art-293 du CGI",
      modalitesReglement: "Chèque ou virement à réception de facture",
      accessibiliteHandicapee: "Démarche complète : entretien téléphonique, évaluation des besoins, mise en œuvre d'adaptations",
      modalitesEvaluation: "Quiz via EVALBOX, grille d'analyse des compétences, travaux pratiques",
      sanctionFormation: "Un certificat de réalisation de formation + feuille d'émargement",
      cessationAbandon: "Clause claire : non-facturation si abandon avant le début, facturation au prorata en cours de formation",
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

  const createFormation = async (formationData: Omit<Formation, "id" | "createdAt" | "version" | "dateCreation" | "dateModification">) => {
    try {
      // Ici, vous remplacerez par l'appel à l'API Supabase
      const now = new Date().toISOString();
      const newFormation: Formation = {
        ...formationData,
        id: Date.now().toString(),
        version: 1,
        dateCreation: now,
        dateModification: now,
        createdAt: now,
      };
      
      setFormations(prev => [newFormation, ...prev]);
      
      toast({
        title: "Formation créée",
        description: `Formation "${newFormation.titre}" créée avec succès (Version ${newFormation.version})`,
      });
      
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
        prev.map(formation => {
          if (formation.id === id) {
            const updatedFormation = {
              ...formation,
              ...formationData,
              version: formation.version + 1,
              dateModification: new Date().toISOString()
            };
            
            toast({
              title: "Formation mise à jour",
              description: `Formation "${updatedFormation.titre}" mise à jour (Version ${updatedFormation.version})`,
            });
            
            return updatedFormation;
          }
          return formation;
        })
      );
    } catch (error) {
      console.error("Erreur lors de la modification:", error);
      throw error;
    }
  };

  const deleteFormation = async (id: string) => {
    try {
      const formation = formations.find(f => f.id === id);
      // Ici, vous remplacerez par l'appel à l'API Supabase
      setFormations(prev => prev.filter(formation => formation.id !== id));
      
      toast({
        title: "Formation supprimée",
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

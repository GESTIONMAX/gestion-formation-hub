
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ProcessusPedagogique from "@/components/ProcessusPedagogique";
import PositionnementForm from "@/components/rendez-vous/PositionnementForm";
import CatalogueHeader from "@/components/catalogue/CatalogueHeader";
import CatalogueHero from "@/components/catalogue/CatalogueHero";
import FormationsList from "@/components/catalogue/FormationsList";
import CustomFormationCTA from "@/components/catalogue/CustomFormationCTA";
import Footer from "@/components/Footer";

const Catalogue = () => {
  const [showPositionnementForm, setShowPositionnementForm] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState<string>("");

  // Structure des données organisées par catégories
  const categoriesFormations = [
    {
      id: "digital",
      titre: "Maîtrisez les Bases du Digital",
      description: "Des formations essentielles pour débuter dans l'univers du digital et acquérir des compétences fondamentales.",
      formations: [
        {
          id: "d1",
          titre: "CRÉATION SITE WEB DÉBUTANT",
          description: "Apprenez à créer un site web professionnel avec WordPress sans connaissances techniques préalables.",
          duree: "21 heures",
          prix: "1 790€",
          niveau: "Débutant",
          participants: "Formation individuelle",
          objectifs: [
            "Installer et configurer WordPress",
            "Créer et structurer des pages",
            "Personnaliser l'apparence",
            "Gérer le contenu efficacement"
          ],
          prerequis: "Aucun prérequis technique",
          modalites: "Présentiel ou distanciel",
          tauxParticipation: "98%",
          tauxReussite: "95%"
        },
        {
          id: "d2",
          titre: "MARKETING DIGITAL",
          description: "Découvrez les fondamentaux du marketing en ligne pour promouvoir votre activité et atteindre vos clients.",
          duree: "28 heures",
          prix: "2 290€",
          niveau: "Débutant à intermédiaire",
          participants: "Formation individuelle",
          objectifs: [
            "Créer une stratégie digitale",
            "Maîtriser les réseaux sociaux",
            "Analyser les performances",
            "Générer du trafic qualifié"
          ],
          prerequis: "Connaissances informatiques de base",
          modalites: "Présentiel ou distanciel",
          tauxParticipation: "96%",
          tauxReussite: "93%"
        },
        {
          id: "d3",
          titre: "GESTION DE LA E-RÉPUTATION",
          description: "Apprenez à surveiller, gérer et améliorer votre image en ligne pour protéger votre marque et votre réputation.",
          duree: "14 heures",
          prix: "1 490€",
          niveau: "Intermédiaire",
          participants: "Formation individuelle",
          objectifs: [
            "Surveiller son image en ligne",
            "Répondre aux avis négatifs",
            "Créer du contenu positif",
            "Mettre en place une stratégie"
          ],
          prerequis: "Connaissances en marketing digital",
          modalites: "Présentiel ou distanciel",
          tauxParticipation: "95%",
          tauxReussite: "91%"
        }
      ]
    },
    {
      id: "visibilite",
      titre: "Réussir votre visibilité",
      description: "Des formations pour augmenter votre présence en ligne et attirer de nouveaux clients grâce au référencement.",
      formations: [
        {
          id: "v1",
          titre: "STRATÉGIE DIGITALE COMPLÈTE",
          description: "Créez une stratégie digitale cohérente pour développer votre présence en ligne et atteindre vos objectifs commerciaux.",
          duree: "35 heures",
          prix: "2 890€",
          niveau: "Intermédiaire à avancé",
          participants: "Formation individuelle",
          objectifs: [
            "Analyser votre marché",
            "Définir vos personas",
            "Planifier vos actions",
            "Mesurer vos résultats"
          ],
          prerequis: "Connaissances marketing de base",
          modalites: "Présentiel uniquement",
          tauxParticipation: "94%",
          tauxReussite: "89%"
        },
        {
          id: "v2",
          titre: "SEO WORDPRESS",
          description: "Optimisez le référencement de votre site WordPress pour améliorer sa visibilité sur les moteurs de recherche.",
          duree: "21 heures",
          prix: "1 890€",
          niveau: "Intermédiaire",
          participants: "Formation individuelle",
          objectifs: [
            "Optimiser le contenu",
            "Améliorer la structure technique",
            "Analyser les performances",
            "Créer une stratégie de mots-clés"
          ],
          prerequis: "Site WordPress existant",
          modalites: "Présentiel ou distanciel",
          tauxParticipation: "97%",
          tauxReussite: "94%"
        },
        {
          id: "v3",
          titre: "COMMUNITY MANAGEMENT",
          description: "Apprenez à gérer efficacement vos réseaux sociaux pour créer une communauté engagée autour de votre marque.",
          duree: "28 heures",
          prix: "2 290€",
          niveau: "Débutant à intermédiaire",
          participants: "Formation individuelle",
          objectifs: [
            "Créer une ligne éditoriale",
            "Produire du contenu engageant",
            "Animer une communauté",
            "Analyser les performances"
          ],
          prerequis: "Connaissances informatiques de base",
          modalites: "Présentiel ou distanciel",
          tauxParticipation: "96%",
          tauxReussite: "92%"
        }
      ]
    },
    {
      id: "entreprises",
      titre: "Stratégies des Entreprises",
      description: "Des formations dédiées aux entreprises pour optimiser leur présence en ligne et leurs stratégies numériques.",
      formations: [
        {
          id: "e1",
          titre: "WORDPRESS POUR ENTREPRISE",
          description: "Solutions WordPress professionnelles adaptées aux besoins spécifiques des entreprises et organisations.",
          duree: "35 heures",
          prix: "2 890€",
          niveau: "Intermédiaire à avancé",
          participants: "Formation individuelle ou groupe",
          objectifs: [
            "Créer un site corporate",
            "Gérer les droits utilisateurs",
            "Optimiser les performances",
            "Sécuriser votre site"
          ],
          prerequis: "Connaissances WordPress de base",
          modalites: "Présentiel uniquement",
          tauxParticipation: "92%",
          tauxReussite: "90%"
        },
        {
          id: "e2",
          titre: "STRATÉGIE DIGITALE B2B",
          description: "Développez une stratégie digitale efficace pour toucher des clients professionnels et générer des leads qualifiés.",
          duree: "28 heures",
          prix: "2 690€",
          niveau: "Intermédiaire à avancé",
          participants: "Formation individuelle ou groupe",
          objectifs: [
            "Définir une stratégie B2B",
            "Créer du contenu à valeur ajoutée",
            "Optimiser le tunnel de conversion",
            "Mesurer le ROI"
          ],
          prerequis: "Connaissances marketing",
          modalites: "Présentiel ou distanciel",
          tauxParticipation: "94%",
          tauxReussite: "91%"
        }
      ]
    },
    {
      id: "fondateurs",
      titre: "Devenez Co-Fondateur",
      description: "Des formations avancées pour les entrepreneurs souhaitant maîtriser tous les aspects du digital et de la création d'entreprise.",
      formations: [
        {
          id: "f1",
          titre: "CRÉATION D'UNE PLATEFORME WEB",
          description: "Développez une plateforme web complète avec WordPress, du concept à la mise en production.",
          duree: "56 heures",
          prix: "4 890€",
          niveau: "Avancé",
          participants: "Formation individuelle",
          objectifs: [
            "Concevoir l'architecture technique",
            "Développer des fonctionnalités sur mesure",
            "Mettre en place une stratégie de croissance",
            "Optimiser pour la scalabilité"
          ],
          prerequis: "Expérience WordPress et notions de développement",
          modalites: "Présentiel uniquement",
          tauxParticipation: "91%",
          tauxReussite: "88%"
        },
        {
          id: "f2",
          titre: "FORMATION E-COMMERCE AVANCÉE",
          description: "Maîtrisez tous les aspects d'une boutique en ligne performante avec WooCommerce et WordPress.",
          duree: "42 heures",
          prix: "3 890€",
          niveau: "Avancé",
          participants: "Formation individuelle",
          objectifs: [
            "Configurer WooCommerce de A à Z",
            "Optimiser le tunnel d'achat",
            "Mettre en place des stratégies marketing",
            "Analyser et améliorer les performances"
          ],
          prerequis: "Expérience WordPress",
          modalites: "Présentiel ou distanciel",
          tauxParticipation: "93%",
          tauxReussite: "89%"
        },
        {
          id: "f3",
          titre: "ENTREPRENEUR DIGITAL",
          description: "Formation complète pour entrepreneurs qui souhaitent maîtriser tous les aspects du business en ligne.",
          duree: "70 heures",
          prix: "5 890€",
          niveau: "Avancé",
          participants: "Formation individuelle",
          objectifs: [
            "Créer un business model viable",
            "Développer une présence en ligne",
            "Mettre en œuvre des stratégies d'acquisition",
            "Analyser et optimiser la croissance"
          ],
          prerequis: "Projet entrepreneurial défini",
          modalites: "Présentiel uniquement",
          tauxParticipation: "90%",
          tauxReussite: "87%"
        }
      ]
    }
  ];

  const handlePositionnement = (formationTitre: string) => {
    console.log(`Ouverture du formulaire de positionnement pour: ${formationTitre}`);
    setSelectedFormation(formationTitre);
    setShowPositionnementForm(true);
  };

  const handlePositionnementSubmit = (data: any) => {
    console.log("Données du positionnement:", data);
    setShowPositionnementForm(false);
    setSelectedFormation("");
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <CatalogueHeader />
        <CatalogueHero />
        <ProcessusPedagogique />
        <FormationsList 
          categoriesFormations={categoriesFormations} 
          onPositionnement={handlePositionnement} 
        />
        <CustomFormationCTA />
        <Footer />
      </div>

      <Dialog open={showPositionnementForm} onOpenChange={setShowPositionnementForm}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Rendez-vous de positionnement - {selectedFormation}</DialogTitle>
          </DialogHeader>
          <PositionnementForm
            formationTitre={selectedFormation}
            onSubmit={handlePositionnementSubmit}
            onCancel={() => {
              setShowPositionnementForm(false);
              setSelectedFormation("");
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Catalogue;

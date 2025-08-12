
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ProcessusPedagogique from "@/components/ProcessusPedagogique";
import PositionnementForm from "@/components/rendez-vous/PositionnementForm";
import CatalogueHeader from "@/components/catalogue/CatalogueHeader";
import CatalogueHero from "@/components/catalogue/CatalogueHero";
import FormationsList from "@/components/catalogue/FormationsList";
import FormationsAdaptabilite from "@/components/catalogue/FormationsAdaptabilite";
import CustomFormationCTA from "@/components/catalogue/CustomFormationCTA";
import Footer from "@/components/Footer";
import WordPressFAQ from "@/components/wordpress/WordPressFAQ";

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
          id: "A001-WP-DD",
          titre: "CRÉATION DE SON SITE INTERNET (WORDPRESS) + STRATÉGIE DE DÉVELOPPEMENT DIGITAL",
          description: "Formation complète pour créer et gérer un site WordPress et développer une stratégie digitale efficace pour votre activité.",
          duree: "14 heures (2 jours)",
          prix: "980€",
          niveau: "Débutant",
          participants: "Artisans, commerçants ou professions libérales",
          objectifs: [
            "Créer et personnaliser un site internet avec WordPress",
            "Gérer le contenu et la structure du site",
            "Définir une stratégie de développement digital",
            "Mettre en œuvre des actions SEO et réseaux sociaux"
          ],
          prerequis: "Maîtriser son environnement et les fonctions de base pour utiliser un ordinateur",
          modalites: "Présentiel",
          tauxParticipation: "98%",
          tauxReussite: "94%",
          programmeUrl: "/programmes/A001-WP-DD-programme.html"
        },
        {
          id: "A010-WP-IM",
          titre: "CRÉER ET GÉRER UN SITE WORDPRESS & STRATÉGIE DE CONTENU INBOUND MARKETING",
          description: "Apprenez à créer et gérer un site WordPress tout en développant une stratégie de contenu efficace basée sur l'Inbound Marketing.",
          duree: "14 heures (2 jours)",
          prix: "980€",
          niveau: "Débutant",
          participants: "Artisans, commerçants ou professions libérales",
          objectifs: [
            "Créer et gérer un site WordPress",
            "Développer une stratégie de contenu Inbound Marketing",
            "Attirer et convertir des prospects",
            "Mesurer les performances de votre stratégie"
          ],
          prerequis: "Maîtriser son environnement et les fonctions de base pour utiliser un ordinateur",
          modalites: "Présentiel",
          tauxParticipation: "97%",
          tauxReussite: "93%",
          programmeUrl: "/programmes/A010-WP-IM-programme.html"
        },
        {
          id: "A015-IA-CGPT",
          titre: "GÉNÉRATION DE CONTENU AVEC CHATGPT + AUTOMATISATION MARKETING",
          description: "Maîtrisez les techniques de génération de contenu avec ChatGPT et mettez en place des stratégies d'automatisation marketing efficaces.",
          duree: "14 heures (2 jours)",
          prix: "980€",
          niveau: "Débutant à intermédiaire",
          participants: "Artisans, commerçants ou professions libérales",
          objectifs: [
            "Comprendre les fondamentaux de ChatGPT",
            "Créer des contenus optimisés pour le web et les réseaux sociaux",
            "Mettre en place des stratégies d'automatisation marketing",
            "Utiliser des outils comme ChatGPT, Brevo et Make"
          ],
          prerequis: "Maîtriser son environnement et les fonctions de base pour utiliser un ordinateur",
          modalites: "Présentiel",
          tauxParticipation: "95%",
          tauxReussite: "92%",
          programmeUrl: "/programmes/A015-IA-CGPT-programme.html"
        },
        {
          id: "A012-CV-WEB-WC",
          titre: "MAÎTRISER CANVA POUR LE WEB, LES RÉSEAUX SOCIAUX ET LA VENTE EN LIGNE",
          description: "Découvrez comment utiliser Canva pour créer des visuels professionnels pour le web, les réseaux sociaux et votre boutique en ligne.",
          duree: "14 heures (2 jours)",
          prix: "980€",
          niveau: "Débutant",
          participants: "Artisans, commerçants ou professions libérales",
          objectifs: [
            "Maîtriser l'interface et les fonctionnalités de Canva",
            "Créer des visuels professionnels pour le web et les réseaux sociaux",
            "Concevoir des supports pour votre boutique en ligne",
            "Optimiser votre workflow avec Canva Pro"
          ],
          prerequis: "Maîtriser son environnement et les fonctions de base pour utiliser un ordinateur",
          modalites: "Présentiel",
          tauxParticipation: "98%",
          tauxReussite: "95%",
          programmeUrl: "/programmes/A012-CV-WEB-WC-programme.html"
        }
      ]
    },
    {
      id: "reussir",
      titre: "Réussir votre Stratégie Publicitaire",
      description: "Des formations pour réussir votre présence en ligne et développer votre activité grâce aux compétences digitales avancées.",
      formations: [
        {
          id: "A014-FB-LI",
          titre: "MAÎTRISER FACEBOOK ADS ET LINKEDIN ADS POUR UNE STRATÉGIE PUBLICITAIRE EFFICACE",
          description: "Apprenez à utiliser efficacement les plateformes publicitaires Facebook Ads et LinkedIn Ads pour atteindre vos objectifs marketing.",
          duree: "28 heures (4 jours)",
          prix: "1960€",
          niveau: "Débutant à intermédiaire",
          participants: "Artisans, commerçants ou professions libérales",
          objectifs: [
            "Comprendre les fondamentaux de la publicité sur Facebook et LinkedIn",
            "Créer et gérer des campagnes publicitaires performantes",
            "Utiliser les outils avancés de Meta Business Suite et de LinkedIn Ads",
            "Optimiser les performances des campagnes"
          ],
          prerequis: "Maîtriser son environnement et les fonctions de base pour utiliser un ordinateur",
          modalites: "Présentiel",
          tauxParticipation: "95%",
          tauxReussite: "90%",
          programmeUrl: "/programmes/A014-FB-LI-programme.html"
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
        }
      ]
    },
    {
      id: "visibilite",
      titre: "Optimiser votre Visibilité en Ligne",
      description: "Des formations pour augmenter votre présence en ligne et attirer de nouveaux clients grâce au référencement et à une stratégie digitale efficace.",
      formations: [
        {
          id: "A011-SW-SEOPRESS",
          titre: "SEO LES FONDAMENTAUX (SEOPRESS)",
          description: "Maîtrisez les techniques de référencement naturel avec SEOPress pour WordPress et améliorez votre visibilité sur les moteurs de recherche.",
          duree: "14 heures (2 jours)",
          prix: "980€",
          niveau: "Débutant à intermédiaire",
          participants: "Artisans, commerçants ou professions libérales",
          objectifs: [
            "Comprendre les fondamentaux du référencement naturel",
            "Maîtriser l'outil SEOPress pour WordPress",
            "Optimiser votre site web pour les moteurs de recherche",
            "Analyser et améliorer vos performances SEO"
          ],
          prerequis: "Maîtriser son environnement et les fonctions de base pour utiliser un ordinateur",
          modalites: "Présentiel",
          tauxParticipation: "96%",
          tauxReussite: "93%",
          programmeUrl: "/programmes/A011-SW-SEOPRESS-programme.html"
        },
        {
          id: "A011-SW-WC",
          titre: "SEO + WOOCOMMERCE (SEOPRESS & WOOCOMMERCE)",
          description: "Optimisez votre boutique en ligne WooCommerce avec des techniques SEO avancées grâce à SEOPress.",
          duree: "14 heures (2 jours)",
          prix: "980€",
          niveau: "Intermédiaire",
          participants: "Artisans, commerçants ou professions libérales",
          objectifs: [
            "Maîtriser SEOPress pour WooCommerce",
            "Optimiser les fiches produits pour le référencement",
            "Améliorer l'expérience utilisateur et le taux de conversion",
            "Analyser et améliorer les performances de votre boutique en ligne"
          ],
          prerequis: "Connaissances de base de WordPress et WooCommerce",
          modalites: "Présentiel",
          tauxParticipation: "95%",
          tauxReussite: "92%",
          programmeUrl: "/programmes/A011-SW-WC-programme.html"
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
      id: "strategies",
      titre: "Stratégies des Entreprises",
      description: "Des formations dédiées aux entreprises pour optimiser leur présence en ligne et leurs stratégies numériques.",
      formations: [
        {
          id: "A008-BD-WC",
          titre: "MARKETING DIGITAL BREVO + TECHNIQUES DE VENTE EN LIGNE (WOOCOMMERCE)",
          description: "Maîtrisez les outils de marketing digital avec Brevo et apprenez à mettre en place une boutique en ligne performante avec WooCommerce.",
          duree: "28 heures (4 jours)",
          prix: "1960€",
          niveau: "Intermédiaire",
          participants: "Artisans, commerçants ou professions libérales",
          objectifs: [
            "Maîtriser la plateforme Brevo pour l'email marketing",
            "Mettre en place une boutique WooCommerce",
            "Développer des stratégies de vente en ligne efficaces",
            "Analyser et optimiser les performances marketing"
          ],
          prerequis: "Maîtriser son environnement et les fonctions de base pour utiliser un ordinateur",
          modalites: "Présentiel",
          tauxParticipation: "94%",
          tauxReussite: "90%",
          programmeUrl: "/programmes/A008-BD-WC-programme.html"
        },
        {
          id: "A009-SW-MA",
          titre: "GESTION DE LA SÉCURITÉ (WORDPRESS) + TECHNIQUES D'ANALYSE STATISTIQUE WEB (MATOMO)",
          description: "Sécurisez votre site WordPress et analysez efficacement vos statistiques web avec Matomo pour optimiser votre présence en ligne.",
          duree: "14 heures (2 jours)",
          prix: "980€",
          niveau: "Intermédiaire",
          participants: "Artisans, commerçants ou professions libérales",
          objectifs: [
            "Sécuriser votre site WordPress contre les menaces courantes",
            "Mettre en place et configurer Matomo",
            "Analyser les données de trafic et comprendre les comportements utilisateurs",
            "Optimiser votre site web grâce aux données analytiques"
          ],
          prerequis: "Maîtriser son environnement et les fonctions de base pour utiliser un ordinateur",
          modalites: "Présentiel",
          tauxParticipation: "95%",
          tauxReussite: "92%",
          programmeUrl: "/programmes/A009-SW-MA-programme.html"
        },
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
        }
      ]
    },
    {
      id: "fondateurs",
      titre: "Devenez Co-Fondateur",
      description: "Des formations avancées pour les entrepreneurs souhaitant maîtriser tous les aspects du digital et de la création d'entreprise.",
      formations: [
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
        },
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
        },
        {
          id: "A016-RE-HL",
          titre: "BACKEND HEADLESS AVEC WORDPRESS ET FRONTEND REACT",
          description: "Développez des applications modernes en utilisant WordPress comme backend headless et React pour créer des interfaces utilisateur dynamiques et performantes.",
          duree: "35 heures (5 jours)",
          prix: "2450€",
          niveau: "Avancé",
          participants: "Développeurs web, intégrateurs, freelances",
          objectifs: [
            "Configurer WordPress comme API headless",
            "Développer une application frontend avec React",
            "Connecter React à l'API WordPress REST",
            "Déployer et maintenir une architecture headless"
          ],
          prerequis: "Connaissances en développement web et notions de JavaScript",
          modalites: "Présentiel ou distanciel",
          tauxParticipation: "92%",
          tauxReussite: "88%",
          programmeUrl: "/programmes/A016-RE-HL-programme.html"
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
        <FormationsAdaptabilite />
        <ProcessusPedagogique />
        <FormationsList 
          categoriesFormations={categoriesFormations} 
          onPositionnement={handlePositionnement} 
        />
        {/* FAQ WordPress intégrée juste après la liste des formations */}
        <WordPressFAQ />
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

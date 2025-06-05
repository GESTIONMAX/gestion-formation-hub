
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ProcessusPedagogique from "@/components/ProcessusPedagogique";
import PositionnementForm from "@/components/rendez-vous/PositionnementForm";
import CatalogueHeader from "@/components/catalogue/CatalogueHeader";
import CatalogueHero from "@/components/catalogue/CatalogueHero";
import FormationsList from "@/components/catalogue/FormationsList";
import CustomFormationCTA from "@/components/catalogue/CustomFormationCTA";

const Catalogue = () => {
  const [showPositionnementForm, setShowPositionnementForm] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState<string>("");

  const formations = [
    {
      id: "1",
      titre: "WordPress pour débutants",
      description: "Découvrez les bases de WordPress : installation, configuration, création de contenu et personnalisation de votre site web. Formation idéale pour créer votre premier site professionnel.",
      duree: "21 heures",
      prix: "1 890€",
      niveau: "Débutant",
      participants: "Formation en présentiel individuel",
      objectifs: [
        "Installer et configurer WordPress",
        "Créer et gérer du contenu",
        "Personnaliser l'apparence",
        "Optimiser pour le référencement"
      ],
      prerequis: "Aucun prérequis technique",
      modalites: "Présentiel ou distanciel"
    },
    {
      id: "2", 
      titre: "WordPress avancé",
      description: "Maîtrisez les fonctionnalités avancées de WordPress : thèmes personnalisés, extensions, optimisation et sécurité. Devenez autonome sur les aspects techniques.",
      duree: "35 heures",
      prix: "2 890€",
      niveau: "Avancé",
      participants: "Formation en présentiel individuel",
      objectifs: [
        "Développer des thèmes personnalisés",
        "Créer des extensions",
        "Optimiser les performances",
        "Sécuriser son site WordPress"
      ],
      prerequis: "Connaissances de base WordPress et HTML/CSS",
      modalites: "Présentiel uniquement"
    },
    {
      id: "3",
      titre: "E-commerce avec WooCommerce",
      description: "Créez votre boutique en ligne professionnelle avec WooCommerce. Gestion des produits, paiements, livraisons et optimisation des ventes.",
      duree: "28 heures",
      prix: "2 490€",
      niveau: "Intermédiaire",
      participants: "Formation en présentiel individuel",
      objectifs: [
        "Configurer WooCommerce",
        "Gérer un catalogue produits",
        "Paramétrer les moyens de paiement",
        "Analyser les performances"
      ],
      prerequis: "Connaissances WordPress de base",
      modalites: "Présentiel ou distanciel"
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
          formations={formations} 
          onPositionnement={handlePositionnement} 
        />
        <CustomFormationCTA />
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

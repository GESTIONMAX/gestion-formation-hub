"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Clock, Users, Calendar, Computer, Globe, ShoppingBag, Search, Shield, BarChart, Code, Lightbulb, FileDown, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import PositionnementForm from "../rendez-vous/PositionnementForm";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// Type pour une formation
interface Formation {
  id: string;
  titre: string;
  description: string;
  duree: string;
  participants: string;
  prerequis: string;
  icon: React.ReactNode;
  color: string;
  gradientClass: string;
}

const getIconForFormation = (id: string) => {
  if (id.includes('WP')) {
    return <Globe className="h-6 w-6" />;
  } else if (id.includes('WC')) {
    return <ShoppingBag className="h-6 w-6" />;
  } else if (id.includes('SW')) {
    return <Shield className="h-6 w-6" />;
  } else if (id.includes('BD')) {
    return <BarChart className="h-6 w-6" />;
  } else if (id.includes('IA')) {
    return <Lightbulb className="h-6 w-6" />;
  } else {
    return <Computer className="h-6 w-6" />;
  }
};

const getColorForFormation = (id: string) => {
  if (id.includes('WP')) {
    return "#1869ba"; // Bleu
  } else if (id.includes('WC') || id.includes('BD')) {
    return "#8e44ad"; // Violet
  } else if (id.includes('SW')) {
    return "#27ae60"; // Vert
  } else if (id.includes('IA')) {
    return "#e74c3c"; // Rouge
  } else {
    return "#f39c12"; // Orange
  }
};

const getGradientForFormation = (id: string) => {
  if (id.includes('WP')) {
    return "bg-gradient-to-r from-blue-600 to-blue-400";
  } else if (id.includes('WC') || id.includes('BD')) {
    return "bg-gradient-to-r from-purple-600 to-purple-400";
  } else if (id.includes('SW')) {
    return "bg-gradient-to-r from-green-600 to-green-400";
  } else if (id.includes('IA')) {
    return "bg-gradient-to-r from-red-600 to-red-400";
  } else {
    return "bg-gradient-to-r from-orange-500 to-amber-500";
  }
};

const FormationCard = ({ formation, onPositionnement }: { formation: Formation, onPositionnement: (titre: string) => void }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  // Extraire la durée en heures (hypothèse: durée est au format "XX heures")
  const dureeMatch = formation.duree?.match(/\d+/);
  const heures = dureeMatch ? dureeMatch[0] : "14";
  const jours = Math.ceil(parseInt(heures) / 7);

  return (
    <>
      {/* Modal pour les détails de la formation */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{formation.titre}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-md" style={{ backgroundColor: formation.color }}>
                {formation.icon}
              </div>
              <h2 className="text-xl font-bold">{formation.titre}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-gray-700">{formation.description}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Prérequis</h3>
                  <p className="text-gray-700">{formation.prerequis}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Informations pratiques</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{heures} heures ({jours} jour{jours > 1 ? 's' : ''})</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span>Public: {formation.participants}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>Formation présentielle individuelle</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Téléchargements</h3>
                  <Button 
                    className="w-full flex items-center justify-center gap-2" 
                    variant="outline"
                  >
                    <FileDown className="h-4 w-4" />
                    <span>Télécharger le programme détaillé (PDF)</span>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                onClick={() => {
                  setShowDetails(false);
                  onPositionnement(formation.titre);
                }}
                className="w-full flex items-center justify-center gap-2"
                style={{ backgroundColor: formation.color }}
              >
                <Calendar className="h-4 w-4" />
                <span>Réserver un entretien de positionnement</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <Card className="hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden h-full border rounded-lg">
        {/* En-tête avec couleur dynamique */}
        <div className={`${formation.gradientClass} p-4`}>
          <div className="flex items-center">
            <div className="mr-3 bg-white p-2 rounded-md shadow-sm">
              {formation.icon}
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-white/80 mb-0.5">Réf: {formation.id}</p>
              <h3 className="font-semibold text-white line-clamp-2">{formation.titre}</h3>
            </div>
          </div>
        </div>
        
        <CardContent className="p-4 flex-1 flex flex-col">
          <p className="text-gray-700 mb-4 flex-1">{formation.description}</p>
          
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              <span>{heures} heures ({jours} jour{jours > 1 ? 's' : ''})</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Users className="h-4 w-4 mr-2" />
              <span>{formation.participants}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Button 
              onClick={() => onPositionnement(formation.titre)}
              className="w-full flex items-center justify-center gap-2"
              style={{ backgroundColor: formation.color }}
            >
              <Calendar className="h-4 w-4" />
              <span>Réserver un entretien</span>
            </Button>
            
            <Button 
              onClick={() => setShowDetails(true)}
              className="w-full flex items-center justify-center gap-2"
              variant="outline"
            >
              <Eye className="h-4 w-4" />
              <span>Consulter</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

const FeaturedFormations = () => {
  const [showPositionnementForm, setShowPositionnementForm] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState<string>("");
  
  // Initialiser le carrousel avec autoplay et boucle
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", skipSnaps: false }, [
    Autoplay({ delay: 5000, stopOnInteraction: false })
  ]);

  // États pour gérer les boutons de navigation
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  // Fonctions pour la navigation du carrousel
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  // Mettre à jour l'état des boutons de navigation
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  // Ajouter les événements d'écoute au carrousel
  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Liste des formations à afficher
  const formations: Formation[] = [
    {
      id: "A001-WP-DD",
      titre: "Création site internet (WordPress) & Stratégie de développement Digital",
      description: "Créez un site WordPress professionnel et développez une stratégie digitale efficace pour augmenter votre visibilité en ligne.",
      duree: "21 heures",
      participants: "Entrepreneurs, TPE/PME",
      prerequis: "Connaissances de base en informatique",
      icon: getIconForFormation("A001-WP-DD"),
      color: getColorForFormation("A001-WP-DD"),
      gradientClass: getGradientForFormation("A001-WP-DD")
    },
    {
      id: "A008-BD-WC",
      titre: "Marketing digital Brevo + Techniques de vente en ligne (Woocommerce)",
      description: "Maîtrisez le marketing par email avec Brevo et optimisez vos ventes en ligne grâce à WooCommerce.",
      duree: "14 heures",
      participants: "E-commerçants, Marketeurs",
      prerequis: "Site WordPress existant",
      icon: getIconForFormation("A008-BD-WC"),
      color: getColorForFormation("A008-BD-WC"),
      gradientClass: getGradientForFormation("A008-BD-WC")
    },
    {
      id: "A009-SW-MA",
      titre: "Gestion de la sécurité (WordPress) + Techniques d'analyse statistiques Web",
      description: "Sécurisez votre site WordPress et analysez son trafic pour optimiser ses performances et protéger vos données.",
      duree: "14 heures",
      participants: "Webmasters, Administrateurs",
      prerequis: "Site WordPress existant",
      icon: getIconForFormation("A009-SW-MA"),
      color: getColorForFormation("A009-SW-MA"),
      gradientClass: getGradientForFormation("A009-SW-MA")
    },
    {
      id: "A010-WP-IM",
      titre: "Créer et gérer un site WordPress & Stratégie de contenu Inbound Marketing",
      description: "Développez un site WordPress optimisé et créez une stratégie de contenu attractive pour convertir vos visiteurs.",
      duree: "21 heures",
      participants: "Responsables marketing, Rédacteurs",
      prerequis: "Connaissances marketing de base",
      icon: getIconForFormation("A010-WP-IM"),
      color: getColorForFormation("A010-WP-IM"),
      gradientClass: getGradientForFormation("A010-WP-IM")
    },
    {
      id: "A011-SW-WC",
      titre: "SEO : Les fondamentaux (SEOPress) & Techniques de vente avec WooCommerce",
      description: "Optimisez votre référencement avec SEOPress et boostez vos ventes en ligne grâce à WooCommerce.",
      duree: "14 heures",
      participants: "E-commerçants, Rédacteurs SEO",
      prerequis: "Site WordPress existant",
      icon: getIconForFormation("A011-SW-WC"),
      color: getColorForFormation("A011-SW-WC"),
      gradientClass: getGradientForFormation("A011-SW-WC")
    },
    {
      id: "A016-IA-CGPT-WP",
      titre: "Intégrer ChatGPT et optimiser votre relation client grâce à l'IA",
      description: "Exploitez la puissance de l'IA et de ChatGPT pour améliorer votre service client et automatiser des tâches sur WordPress.",
      duree: "14 heures",
      participants: "Tous professionnels",
      prerequis: "Connaissances de base en WordPress",
      icon: getIconForFormation("A016-IA-CGPT-WP"),
      color: getColorForFormation("A016-IA-CGPT-WP"),
      gradientClass: getGradientForFormation("A016-IA-CGPT-WP")
    }
  ];

  const handlePositionnement = (formationTitre: string) => {
    setSelectedFormation(formationTitre);
    setShowPositionnementForm(true);
  };

  const handlePositionnementSubmit = (data: any) => {
    console.log("Données du positionnement:", data);
    setShowPositionnementForm(false);
    setSelectedFormation("");
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Nos formations à la une</h2>
          <p className="mt-4 text-xl text-gray-600">Découvrez nos formations professionnelles adaptées à vos besoins</p>
        </div>
        
        <div className="relative">
          {isMounted ? (
            <>
              {/* Carrousel */}
              <div className="overflow-hidden" ref={setEmblaRef}>
                <div className="flex">
                  {formations.map((formation) => (
                    <div key={formation.id} className="flex-[0_0_100%] min-w-0 px-4 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
                      <FormationCard 
                        formation={formation}
                        onPositionnement={handlePositionnement}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Boutons de navigation */}
              <div className="flex justify-between w-full absolute top-1/2 -translate-y-1/2 pointer-events-none">
                <button 
                  className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center -ml-5 pointer-events-auto border border-gray-200 hover:bg-gray-50 transition-colors" 
                  onClick={scrollPrev} 
                  disabled={prevBtnDisabled}
                  aria-label="Précédent"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-700" />
                </button>
                <button 
                  className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center -mr-5 pointer-events-auto border border-gray-200 hover:bg-gray-50 transition-colors" 
                  onClick={scrollNext} 
                  disabled={nextBtnDisabled}
                  aria-label="Suivant"
                >
                  <ChevronRight className="h-5 w-5 text-gray-700" />
                </button>
              </div>
            </>
          ) : (
            // Fallback pendant le chargement
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {formations.slice(0, 3).map((formation) => (
                <div key={formation.id}>
                  <FormationCard 
                    formation={formation}
                    onPositionnement={handlePositionnement}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal pour le formulaire de positionnement */}
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
    </section>
  );
};

export default FeaturedFormations;

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from "../../../../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../../components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import { Award, CheckCircle, ArrowRight, Users, Calendar, BookOpen, ChevronLeft, ChevronRight, Clock, Computer, Globe, ShoppingBag, Shield, BarChart, Code, Lightbulb, FileDown, Eye } from "lucide-react";
import PositionnementForm from "../../features/rendez-vous/PositionnementForm";
import { Card, CardContent } from "../../../../components/ui/card";
import dynamic from "next/dynamic";

// Import dynamique des dépendances du carousel pour éviter les problèmes SSR
// Utilisons un composant wrapper au lieu d'importer le hook directement
const EmblaCarouselReact = dynamic(
  () => import("embla-carousel-react").then(mod => {
    const EmblaCarousel = mod.default;
    // Créer un composant wrapper pour le hook
    return function EmblaCarouselWrapper(props: any) {
      const [emblaRef, emblaApi] = EmblaCarousel(props.options, props.plugins);
      return <div ref={emblaRef}>{props.children}</div>;
    };
  }),
  { ssr: false }
);

// Créer une fonction pour charger le plugin Autoplay
const loadAutoplayPlugin = async (options: { delay?: number; stopOnInteraction?: boolean }) => {
  const AutoplayModule = await import("embla-carousel-autoplay");
  return AutoplayModule.default(options);
};

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
  // Extraire la durée en heures (hypothèse: durée est au format "XX heures")
  const dureeMatch = formation.duree?.match(/\d+/);
  const heures = dureeMatch ? dureeMatch[0] : "14";
  const jours = Math.ceil(parseInt(heures) / 7);

  return (
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
          
          <Link href="/formations">
            <Button 
              className="w-full flex items-center justify-center gap-2"
              variant="outline"
            >
              <Eye className="h-4 w-4" />
              <span>Consulter</span>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

const FeaturedFormationsCarousel = ({ onPositionnement }: { onPositionnement: (titre: string) => void }) => {
  // État pour suivre si le composant est monté côté client
  const [isMounted, setIsMounted] = useState(false);
  
  // États pour gérer les boutons de navigation
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  
  // Configuration du carrousel
  const [plugins, setPlugins] = useState<any[]>([]);
  
  // Options du carrousel avec le bon type
  const options = { 
    loop: true, 
    align: 'start' as const, 
    skipSnaps: false,
    inViewThreshold: 0.7
  };
  
  // Référence et API du carrousel
  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);
  
  // Fonctions pour la navigation du carrousel
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  
  // Chargement du plugin Autoplay
  useEffect(() => {
    const loadPlugins = async () => {
      const autoplayPlugin = await loadAutoplayPlugin({ delay: 5000, stopOnInteraction: false });
      setPlugins([autoplayPlugin]);
    };
    
    loadPlugins();
  }, []);
  
  // Liste des formations à afficher dans le carrousel
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
  
  // Initialiser le carrousel une fois que le composant est monté côté client
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Mettre à jour l'état des boutons de navigation
  useEffect(() => {
    if (!emblaApi) return;
    
    const onSelect = () => {
      setPrevBtnDisabled(!emblaApi.canScrollPrev());
      setNextBtnDisabled(!emblaApi.canScrollNext());
    };
    
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="relative">
      {isMounted ? (
        <>
          {/* Carrousel */}
          {plugins.length > 0 ? (
            <div className="relative w-full overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {formations.map((formation) => (
                  <div key={formation.id} className="flex-[0_0_100%] min-w-0 px-4 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
                    <FormationCard 
                      formation={formation}
                      onPositionnement={onPositionnement}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="overflow-hidden">
              <div className="flex flex-wrap">
                {formations.map((formation) => (
                  <div key={formation.id} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                    <FormationCard 
                      formation={formation}
                      onPositionnement={onPositionnement}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
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
                onPositionnement={onPositionnement}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AccueilPage = () => {
  const [showPositionnementForm, setShowPositionnementForm] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState<string>("");

  const handlePositionnementSubmit = (data: any) => {
    console.log("Données du positionnement:", data);
    setShowPositionnementForm(false);
    setSelectedFormation("");
  };
  return (
    <>
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/formation-wordpress-antibes.webp" 
            alt="Formation WordPress Antibes" 
            className="object-cover"
            fill
            priority
          />
          <div className="absolute inset-0 bg-blue-900/70"></div>
        </div>
        <div className="relative z-10 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Formations WordPress 
                <span className="text-yellow-400 block mt-1">Certifiées Qualiopi</span>
              </h1>
              <p className="text-xl leading-relaxed mb-8">
                Développez vos compétences web avec nos formations WordPress professionnelles. 
                Programmes personnalisés, formateur expérimenté et suivi post-formation inclus.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="#catalogue">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                    Voir nos formations
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                    Nous contacter
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-6 flex-wrap">
                <div className="flex items-center gap-1">
                  <Award className="h-5 w-5 text-yellow-400" />
                  <span>Certifié Qualiopi</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Éligible CPF</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-5 w-5 text-blue-400" />
                  <span>500+ apprenants formés</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
              <h3 className="text-xl font-semibold mb-4">Prochaines sessions à Antibes</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 pb-3 border-b border-white/20">
                  <Calendar className="h-10 w-10 text-yellow-400" />
                  <div>
                    <p className="font-medium">WordPress Débutant</p>
                    <p className="text-sm text-yellow-200">25-26 septembre 2025</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 pb-3 border-b border-white/20">
                  <Calendar className="h-10 w-10 text-yellow-400" />
                  <div>
                    <p className="font-medium">WooCommerce Avancé</p>
                    <p className="text-sm text-yellow-200">10-12 octobre 2025</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Calendar className="h-10 w-10 text-yellow-400" />
                  <div>
                    <p className="font-medium">Gutenberg Expert</p>
                    <p className="text-sm text-yellow-200">18-20 octobre 2025</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setSelectedFormation("Formation WordPress");
                    setShowPositionnementForm(true);
                  }}
                  className="inline-flex items-center text-yellow-300 hover:text-yellow-100 mt-2 cursor-pointer"
                >
                  <span>Réserver un entretien de positionnement</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Pourquoi choisir nos formations WordPress ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Formation sur mesure</h3>
              <p className="text-gray-600">
                Programmes adaptés à vos objectifs professionnels et votre niveau. 
                Entretien de positionnement offert avant chaque formation.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col items-center text-center">
              <div className="bg-green-100 p-3 rounded-full mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Formateur expert</h3>
              <p className="text-gray-600">
                8+ années d'expérience en développement et formation WordPress.
                Pédagogie basée sur la pratique et des cas réels.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col items-center text-center">
              <div className="bg-purple-100 p-3 rounded-full mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Certification qualité</h3>
              <p className="text-gray-600">
                Organisme certifié Qualiopi. Formations éligibles aux financements CPF, 
                OPCO et pôle emploi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue Section - Carousel */}
      <section id="catalogue" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nos formations à la une
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez nos formations WordPress adaptées à tous les niveaux, 
              de débutant à expert. Disponibles en présentiel à Antibes ou à distance.
            </p>
          </div>
          
          {/* Carrousel de formations */}
          <FeaturedFormationsCarousel onPositionnement={(titre) => {
            setSelectedFormation(titre);
            setShowPositionnementForm(true);
          }} />
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Prêt à développer vos compétences WordPress ?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contactez-nous pour discuter de vos besoins en formation et obtenir un devis personnalisé.
            Premier entretien de positionnement offert !
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => {
                setSelectedFormation("Formation WordPress");
                setShowPositionnementForm(true);
              }}
            >
              Réserver un entretien de positionnement
            </Button>
            <Link href="/a-propos">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                En savoir plus
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
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
    </>
  );
};

export default AccueilPage;

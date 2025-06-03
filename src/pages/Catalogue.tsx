import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Award, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";

const Catalogue = () => {
  const formations = [
    {
      id: "1",
      titre: "WordPress pour débutants",
      description: "Découvrez les bases de WordPress : installation, configuration, création de contenu et personnalisation de votre site web. Formation idéale pour créer votre premier site professionnel.",
      duree: "21 heures",
      prix: "1 890€",
      niveau: "Débutant",
      participants: "8 max",
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
      participants: "6 max",
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
      participants: "6 max",
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">GestionMax Formation</h1>
              <p className="text-gray-600">Formations WordPress professionnelles - Certifié Qualiopi</p>
            </div>
            <Navigation />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Catalogue de Formations WordPress
          </h2>
          <p className="text-xl max-w-3xl mx-auto">
            Découvrez nos formations professionnelles adaptées à tous les niveaux. 
            Certifiées Qualiopi et éligibles CPF.
          </p>
        </div>
      </section>

      {/* Formations Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {formations.map((formation) => (
              <Card key={formation.id} className="hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start mb-3">
                    <CardTitle className="text-xl text-blue-900">{formation.titre}</CardTitle>
                    <Badge variant="outline" className="ml-2">{formation.niveau}</Badge>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{formation.description}</p>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">{formation.duree}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">{formation.participants}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Objectifs principaux :</h4>
                    <ul className="space-y-1">
                      {formation.objectifs.slice(0, 3).map((objectif, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                          {objectif}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 mb-6 text-xs text-gray-600">
                    <p><span className="font-medium">Prérequis :</span> {formation.prerequis}</p>
                    <p><span className="font-medium">Modalités :</span> {formation.modalites}</p>
                  </div>

                  <div className="mt-auto flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">
                      {formation.prix}
                    </span>
                    <Button>
                      RDV de positionnement
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-50 py-12">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Formation sur mesure
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            Besoin d'une formation adaptée à vos besoins spécifiques ? 
            Nous créons des programmes sur mesure pour votre entreprise.
          </p>
          <Button size="lg" className="text-lg px-8 py-3">
            Contactez-nous
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Catalogue;

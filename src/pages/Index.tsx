
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Award, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Index = () => {
  const formationsPreview = [
    {
      id: "1",
      titre: "WordPress pour débutants",
      description: "Découvrez les bases de WordPress : installation, configuration, création de contenu et personnalisation de votre site web.",
      duree: "21 heures",
      prix: "1 890€",
      niveau: "Débutant",
      participants: "8 max",
    },
    {
      id: "2", 
      titre: "WordPress avancé",
      description: "Maîtrisez les fonctionnalités avancées de WordPress : thèmes personnalisés, extensions, optimisation et sécurité.",
      duree: "35 heures",
      prix: "2 890€",
      niveau: "Avancé",
      participants: "6 max",
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
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Formations WordPress Professionnelles
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Développez vos compétences WordPress avec un formateur certifié. 
            Formations éligibles CPF et conformes Qualiopi.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Link to="/catalogue">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Voir le catalogue
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-white/10 hover:bg-white/20 border-white text-white">
              Demander un devis
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Award className="h-5 w-5 mr-2" />
              Certifié Qualiopi
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <CheckCircle className="h-5 w-5 mr-2" />
              Éligible CPF
            </Badge>
          </div>
        </div>
      </section>

      {/* Formations Preview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Nos formations phares
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez un aperçu de nos formations WordPress les plus populaires, 
              adaptées à tous les niveaux.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {formationsPreview.map((formation) => (
              <Card key={formation.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl">{formation.titre}</CardTitle>
                    <Badge variant="outline">{formation.niveau}</Badge>
                  </div>
                  <p className="text-gray-600">{formation.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{formation.duree}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{formation.participants}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">
                      {formation.prix}
                    </span>
                    <Button>
                      Demander un devis
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/catalogue">
              <Button size="lg" className="text-lg px-8 py-3">
                Voir toutes nos formations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Votre formateur certifié
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Formateur indépendant certifié Qualiopi, je vous accompagne dans 
                l'apprentissage de WordPress avec une approche personnalisée et pratique.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Certification Qualiopi</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Formations éligibles CPF</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Suivi personnalisé</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Support technique inclus</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold mb-2">Formations</h4>
                  <p className="text-3xl font-bold text-blue-600">50+</p>
                  <p className="text-sm text-gray-600">Sessions réalisées</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold mb-2">Apprenants</h4>
                  <p className="text-3xl font-bold text-green-600">200+</p>
                  <p className="text-sm text-gray-600">Personnes formées</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h5 className="text-lg font-semibold mb-4">GestionMax Formation</h5>
              <p className="text-gray-300">
                Formations WordPress professionnelles certifiées Qualiopi
              </p>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Contact</h5>
              <p className="text-gray-300">
                Email: contact@gestionmax-formation.fr<br />
                Téléphone: 06 12 34 56 78
              </p>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Certifications</h5>
              <p className="text-gray-300">
                Organisme certifié Qualiopi<br />
                N° déclaration d'activité: 11 75 12345 75
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

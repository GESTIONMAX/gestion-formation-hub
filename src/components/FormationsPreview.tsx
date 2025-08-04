import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Clock, Users, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import PositionnementForm from "@/components/rendez-vous/PositionnementForm";
import FormationDetailsModal from "@/components/catalogue/FormationDetailsModal";
import { Formation } from "@/components/catalogue/types";

const FormationsPreview = () => {
  const [showPositionnementForm, setShowPositionnementForm] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState<string>("");
  const [selectedFormationDetails, setSelectedFormationDetails] = useState<Formation | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const formationsPreview: Formation[] = [
    {
      id: "1",
      titre: "WordPress pour débutants",
      description: "Découvrez les bases de WordPress : installation, configuration, création de contenu et personnalisation de votre site web.",
      duree: "21 heures",
      prix: "1 890€",
      niveau: "Débutant",
      participants: "Formation en présentiel individuel",
      objectifs: [
        "Installer et configurer WordPress",
        "Créer et gérer du contenu",
        "Personnaliser l'apparence de votre site"
      ],
      prerequis: "Aucun prérequis technique",
      modalites: "Présentiel ou à distance",
      tauxParticipation: "98%",
      tauxReussite: "95%",
      programmeUrl: "/programmes/programme-exemple.html",
      categorie: "WordPress"
    },
    {
      id: "2", 
      titre: "WordPress avancé",
      description: "Maîtrisez les fonctionnalités avancées de WordPress : thèmes personnalisés, extensions, optimisation et sécurité.",
      duree: "35 heures",
      prix: "2 890€",
      niveau: "Avancé",
      participants: "Formation en présentiel individuel",
      objectifs: [
        "Développer des thèmes personnalisés",
        "Configurer des extensions avancées",
        "Optimiser les performances et la sécurité"
      ],
      prerequis: "Connaissance de base de WordPress",
      modalites: "Présentiel ou à distance",
      tauxParticipation: "96%",
      tauxReussite: "92%",
      programmeUrl: "/programmes/programme-exemple.html",
      categorie: "WordPress"
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
              <Card key={formation.id} className="hover:shadow-lg transition-all duration-300 flex flex-col border-t-4 border-blue-600 overflow-hidden">
                {/* En-tête avec style "STARTER PACK" */}
                <div className="bg-yellow-500 text-xs font-bold uppercase tracking-wider text-white py-1 px-3 text-center">
                  STARTER PACK
                </div>
                
                <CardHeader>
                  <div className="mb-3">
                    <CardTitle className="text-lg font-bold text-blue-900 uppercase mb-2">{formation.titre}</CardTitle>
                    <p className="text-gray-600 text-sm leading-relaxed">{formation.description}</p>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col">
                  <div className="border-t border-b border-gray-100 py-3 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">{formation.duree}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">{formation.participants}</span>
                    </div>
                  </div>

                  {/* Niveau et badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="text-xs bg-blue-50">{formation.niveau}</Badge>
                    <Badge variant="secondary" className="text-xs bg-green-50 text-green-700">Éligible CPF</Badge>
                  </div>

                  {/* Objectifs */}
                  <div className="mb-4 bg-gray-50 p-3 rounded-md">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Objectifs principaux :</h4>
                    <ul className="space-y-1">
                      {formation.objectifs.slice(0, 3).map((objectif, index) => (
                        <li key={index} className="flex items-start gap-2 text-xs text-gray-700">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                          {objectif}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-1 mb-5 text-xs text-gray-600">
                    <p><span className="font-medium">Prérequis :</span> {formation.prerequis}</p>
                    <p><span className="font-medium">Modalités :</span> {formation.modalites}</p>
                    
                    {/* Indicateurs légalement requis */}
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs font-medium text-gray-500 mb-1">Indicateurs de performance :</p>
                      <div className="flex space-x-4">
                        {formation.tauxParticipation && (
                          <div className="flex-1">
                            <p className="text-xs font-medium text-blue-700">Taux de participation</p>
                            <p className="text-sm font-bold">{formation.tauxParticipation}</p>
                          </div>
                        )}
                        {formation.tauxReussite && (
                          <div className="flex-1">
                            <p className="text-xs font-medium text-green-700">Taux de réussite</p>
                            <p className="text-sm font-bold">{formation.tauxReussite}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-gray-100">
                    {/* Prix */}
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <span className="text-xs text-gray-500">À partir de</span>
                        <p className="text-2xl font-bold text-blue-600">
                          {formation.prix}
                        </p>
                        <span className="text-xs text-gray-500">Net de taxes</span>
                      </div>
                    </div>
                    
                    {/* Boutons */}
                    <div className="flex flex-col space-y-2">
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        onClick={() => handlePositionnement(formation.titre)}
                      >
                        RDV de positionnement
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
                        onClick={() => {
                          setSelectedFormationDetails(formation);
                          setModalOpen(true);
                        }}
                      >
                        En savoir plus
                      </Button>
                    </div>
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
      
      {/* Modal pour les détails de la formation */}
      {selectedFormationDetails && (
        <FormationDetailsModal
          formation={selectedFormationDetails}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

export default FormationsPreview;

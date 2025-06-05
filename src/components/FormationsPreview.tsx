
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";
import PositionnementForm from "@/components/rendez-vous/PositionnementForm";

const FormationsPreview = () => {
  const [showPositionnementForm, setShowPositionnementForm] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState<string>("");

  const formationsPreview = [
    {
      id: "1",
      titre: "WordPress pour débutants",
      description: "Découvrez les bases de WordPress : installation, configuration, création de contenu et personnalisation de votre site web.",
      duree: "21 heures",
      prix: "1 890€",
      niveau: "Débutant",
      participants: "Formation en présentiel individuel",
    },
    {
      id: "2", 
      titre: "WordPress avancé",
      description: "Maîtrisez les fonctionnalités avancées de WordPress : thèmes personnalisés, extensions, optimisation et sécurité.",
      duree: "35 heures",
      prix: "2 890€",
      niveau: "Avancé",
      participants: "Formation en présentiel individuel",
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
                    <Button onClick={() => handlePositionnement(formation.titre)}>
                      RDV de positionnement
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Rendez-vous obligatoire avant inscription
                  </p>
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

      <Dialog open={showPositionnementForm} onOpenChange={setShowPositionnementForm}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Rendez-vous de positionnement - {selectedFormation}</DialogTitle>
          </DialogHeader>
          <PositionnementForm
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

export default FormationsPreview;

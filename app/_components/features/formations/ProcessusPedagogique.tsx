"use client";

import { useState } from "react";
import { Button } from "../../features/ui/button";
import { Calendar, BookOpen, Target, CheckCircle, Users, FileText, Award } from "lucide-react";
import PositionnementForm from "@/_components/features/rendez-vous/PositionnementForm";

interface EtapeProcessus {
  numero: number;
  titre: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  couleur: string;
}

const ProcessusPedagogique = () => {
  const [showPositionnementForm, setShowPositionnementForm] = useState(false);

  const etapes: EtapeProcessus[] = [
    {
      numero: 1,
      titre: "Rendez-vous de découverte",
      description: "Un échange en présentiel pour analyser vos besoins spécifiques et définir ensemble des objectifs opérationnels concrets adaptés à votre activité.",
      icon: Calendar,
      couleur: "bg-blue-100 text-blue-600"
    },
    {
      numero: 2,
      titre: "Élaboration du programme",
      description: "Création d'un programme personnalisé en fonction de vos objectifs, de votre niveau et de vos contraintes.",
      icon: BookOpen,
      couleur: "bg-green-100 text-green-600"
    },
    {
      numero: 3,
      titre: "Positionnement initial",
      description: "Évaluation de vos compétences actuelles pour adapter le parcours de formation à votre niveau.",
      icon: Target,
      couleur: "bg-purple-100 text-purple-600"
    },
    {
      numero: 4,
      titre: "Formation",
      description: "Séances de formation en présentiel ou à distance, avec des méthodes pédagogiques actives et participatives.",
      icon: Users,
      couleur: "bg-amber-100 text-amber-600"
    },
    {
      numero: 5,
      titre: "Évaluation continue",
      description: "Suivi régulier de votre progression et ajustements du programme si nécessaire.",
      icon: CheckCircle,
      couleur: "bg-emerald-100 text-emerald-600"
    },
    {
      numero: 6,
      titre: "Attestation de formation",
      description: "Délivrance d'une attestation de fin de formation mentionnant les compétences acquises.",
      icon: Award,
      couleur: "bg-rose-100 text-rose-600"
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Processus Pédagogique</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Un accompagnement sur-mesure pour garantir l'atteinte de vos objectifs professionnels
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {etapes.map((etape) => (
            <Card key={etape.numero} className="h-full flex flex-col">
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <div className={`p-3 rounded-full ${etape.couleur}`}>
                  <etape.icon className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Étape {etape.numero}</span>
                  <CardTitle className="text-xl">{etape.titre}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-600">{etape.description}</p>
                {etape.numero === 3 && (
                  <div className="mt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowPositionnementForm(true)}
                      className="w-full"
                    >
                      Faire mon positionnement
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={showPositionnementForm} onOpenChange={setShowPositionnementForm}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Questionnaire de positionnement</DialogTitle>
            <p className="text-sm text-gray-500">
              Ce questionnaire nous permettra d'évaluer votre niveau actuel et d'adapter la formation à vos besoins.
            </p>
          </DialogHeader>
          <div className="py-4">
            <PositionnementForm onSuccess={() => setShowPositionnementForm(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProcessusPedagogique;

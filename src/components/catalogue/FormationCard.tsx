
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, CheckCircle } from "lucide-react";

interface Formation {
  id: string;
  titre: string;
  description: string;
  duree: string;
  prix: string;
  niveau: string;
  participants: string;
  objectifs: string[];
  prerequis: string;
  modalites: string;
}

interface FormationCardProps {
  formation: Formation;
  onPositionnement: (titre: string) => void;
}

const FormationCard = ({ formation, onPositionnement }: FormationCardProps) => {
  return (
    <Card className="hover:shadow-xl transition-shadow duration-300 flex flex-col">
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

        <div className="mt-auto">
          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl font-bold text-blue-600">
              {formation.prix}
            </span>
            <Badge variant="secondary" className="text-xs">
              Éligible CPF
            </Badge>
          </div>
          <Button 
            className="w-full"
            onClick={() => onPositionnement(formation.titre)}
          >
            RDV de positionnement
          </Button>
          <p className="text-xs text-gray-500 text-center mt-2">
            Étape obligatoire avant inscription
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FormationCard;


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Users, Clock } from "lucide-react";

interface FormationDetailProps {
  formation: any;
  onBack: () => void;
}

const FormationDetail = ({ formation, onBack }: FormationDetailProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold">{formation.titre}</h2>
          <div className="flex items-center gap-4 mt-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formation.duree}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              Formation certifiée Qualiopi
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{formation.description}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Public cible</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{formation.public}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Objectifs pédagogiques</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="whitespace-pre-line text-gray-700 leading-relaxed">
            {formation.objectifs}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Programme détaillé</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="whitespace-pre-line text-gray-700 leading-relaxed">
            {formation.programme}
          </div>
        </CardContent>
      </Card>

      {formation.pdfUrl && (
        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Télécharger le programme PDF
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FormationDetail;

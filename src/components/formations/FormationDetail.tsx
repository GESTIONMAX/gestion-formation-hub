
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Users, Clock, Calendar, GitBranch, FileText } from "lucide-react";
import { generateFormationPDF } from "@/utils/pdfGenerator";

interface FormationDetailProps {
  formation: any;
  onBack: () => void;
}

const FormationDetail = ({ formation, onBack }: FormationDetailProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleGeneratePDF = () => {
    generateFormationPDF(formation);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
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
            <Badge variant="default" className="flex items-center gap-1">
              <GitBranch className="h-3 w-3" />
              Version {formation.version}
            </Badge>
          </div>
        </div>
        <Button onClick={handleGeneratePDF} className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Générer PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
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
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations de conformité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">Date de création</span>
                </div>
                <p className="text-sm text-gray-600 ml-6">
                  {formatDate(formation.dateCreation)}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Dernière modification</span>
                </div>
                <p className="text-sm text-gray-600 ml-6">
                  {formatDate(formation.dateModification)}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <GitBranch className="h-4 w-4 text-purple-600" />
                  <span className="font-medium">Version actuelle</span>
                </div>
                <div className="ml-6">
                  <Badge variant="default" className="text-sm">
                    v{formation.version}
                  </Badge>
                </div>
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
      </div>
    </div>
  );
};

export default FormationDetail;

import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { ArrowLeft, FileText, Link as LinkIcon } from "lucide-react";
import { Competence, CategorieCompetence, StatutCompetence } from "../../_lib/types/competence";

interface CompetenceDetailProps {
  competence: Competence;
  onBack: () => void;
  onEdit: (competence: Competence) => void;
}

const CompetenceDetail = ({ competence, onBack, onEdit }: CompetenceDetailProps) => {
  const getCategorieLabel = (categorie: CategorieCompetence) => {
    switch (categorie) {
      case "technique": return "Technique";
      case "pedagogique": return "Pédagogique";
      case "relationnelle": return "Relationnelle";
      case "organisationnelle": return "Organisationnelle";
    }
  };
  
  const getStatutBadge = (statut: StatutCompetence) => {
    switch (statut) {
      case "planifie": 
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Planifié</Badge>;
      case "en-cours": 
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">En cours</Badge>;
      case "realise": 
        return <Badge variant="outline" className="bg-green-100 text-green-800">Réalisé</Badge>;
      case "reporte": 
        return <Badge variant="outline" className="bg-gray-100 text-gray-800">Reporté</Badge>;
    }
  };
  
  const renderNiveauStars = (niveau: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg 
            key={star}
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 ${star <= niveau ? "text-yellow-400" : "text-gray-300"}`} 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <h2 className="text-2xl font-bold">{competence.nom}</h2>
        {getStatutBadge(competence.statut)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Détails de la compétence</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-3 mb-4">
                <Badge>{getCategorieLabel(competence.categorie)}</Badge>
                <Badge variant="outline">{competence.domaineDeveloppement}</Badge>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{competence.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-200 pt-4">
                <div>
                  <h3 className="font-semibold mb-2">Niveau actuel</h3>
                  {renderNiveauStars(competence.niveauActuel)}
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Niveau objectif</h3>
                  {renderNiveauStars(competence.objectifNiveau)}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-semibold mb-2">Action prévue</h3>
                <p className="text-gray-700">{competence.actionPrevue}</p>
              </div>

              {(competence.plateformeFomation || competence.lienFormation) && (
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-semibold mb-2">Formation</h3>
                  {competence.plateformeFomation && (
                    <p className="text-gray-700 mb-1">
                      <span className="font-medium">Plateforme: </span>
                      {competence.plateformeFomation}
                    </p>
                  )}
                  {competence.lienFormation && (
                    <p className="text-gray-700 flex items-center gap-1">
                      <span className="font-medium">Lien: </span>
                      <a 
                        href={competence.lienFormation} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        Accéder à la formation
                        <LinkIcon className="h-3 w-3 ml-1" />
                      </a>
                    </p>
                  )}
                </div>
              )}

              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-semibold mb-2">Preuve de réalisation</h3>
                {competence.typePreuve === "fichier" ? (
                  <p className="flex items-center gap-1 text-gray-700">
                    <FileText className="h-4 w-4" />
                    {competence.contenuPreuve}
                  </p>
                ) : (
                  <p className="flex items-center gap-1 text-gray-700">
                    <LinkIcon className="h-4 w-4" />
                    <a 
                      href={competence.contenuPreuve} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {competence.contenuPreuve}
                    </a>
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Informations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Créée le</p>
                <p>{new Date(competence.dateCreation).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Dernière modification</p>
                <p>{new Date(competence.dateModification).toLocaleDateString()}</p>
              </div>
              {competence.formateurId && (
                <div>
                  <p className="text-sm text-gray-500">Formateur assigné</p>
                  <p>{competence.formateurId}</p>
                </div>
              )}
              <div className="pt-4">
                <Button onClick={() => onEdit(competence)} className="w-full">
                  Modifier cette compétence
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CompetenceDetail;

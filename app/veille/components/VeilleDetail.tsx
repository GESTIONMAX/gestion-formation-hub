import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, FileText, MessageCircle, History, Upload, Cog, Lightbulb } from "lucide-react";
import { Veille, TypeVeille, StatutVeille } from "@/lib/utils/types/veille";

interface VeilleDetailProps {
  veille: Veille;
  onBack: () => void;
  onUpdateStatut: (id: string, statut: StatutVeille) => void;
  onUpdateAvancement: (id: string, avancement: number) => void;
  onAddCommentaire: (id: string, commentaire: string) => void;
}

const VeilleDetail = ({
  veille,
  onBack,
  onUpdateStatut,
  onUpdateAvancement,
  onAddCommentaire
}: VeilleDetailProps) => {
  const [nouveauCommentaire, setNouveauCommentaire] = useState("");
  const [nouveauAvancement, setNouveauAvancement] = useState(veille.avancement);
  const [statutActuel, setStatutActuel] = useState<StatutVeille>(veille.statut);

  const getTypeIcon = (type: TypeVeille) => {
    switch (type) {
      case "reglementaire": return <FileText className="h-5 w-5" />;
      case "metier": return <Cog className="h-5 w-5" />;
      case "innovation": return <Lightbulb className="h-5 w-5" />;
    }
  };

  const getTypeLabel = (type: TypeVeille) => {
    switch (type) {
      case "reglementaire": return "Réglementaire";
      case "metier": return "Métier";
      case "innovation": return "Innovation";
    }
  };

  const getStatutColor = (statut: StatutVeille) => {
    switch (statut) {
      case "nouvelle": return "bg-blue-100 text-blue-800";
      case "en-cours": return "bg-yellow-100 text-yellow-800";
      case "terminee": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleCommentaireSubmit = () => {
    if (nouveauCommentaire.trim()) {
      onAddCommentaire(veille.id, nouveauCommentaire.trim());
      setNouveauCommentaire("");
    }
  };

  const handleAvancementSubmit = () => {
    onUpdateAvancement(veille.id, nouveauAvancement);
  };

  const handleStatutChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatut = event.target.value as StatutVeille;
    setStatutActuel(newStatut);
    onUpdateStatut(veille.id, newStatut);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à la liste
        </Button>
        <h2 className="text-2xl font-bold">{veille.titre}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getTypeIcon(veille.type)}
                Détails de la veille
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Badge className={getStatutColor(veille.statut)}>{veille.statut}</Badge>
                <Badge variant="outline">{getTypeLabel(veille.type)}</Badge>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{veille.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Créée le:</span>{" "}
                  {veille.dateCreation.toLocaleDateString()}
                </div>
                {veille.dateEcheance && (
                  <div>
                    <span className="font-medium">Échéance:</span>{" "}
                    {veille.dateEcheance.toLocaleDateString()}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Avancement</span>
                  <span>{veille.avancement}%</span>
                </div>
                <Progress value={veille.avancement} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Commentaires
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {veille.commentaires.length === 0 ? (
                <p className="text-gray-500 italic">Aucun commentaire pour le moment</p>
              ) : (
                <div className="space-y-3">
                  {veille.commentaires.map((commentaire, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-md">
                      <p className="text-gray-800">{commentaire}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-2 pt-4">
                <Textarea
                  value={nouveauCommentaire}
                  onChange={(e) => setNouveauCommentaire(e.target.value)}
                  placeholder="Ajouter un nouveau commentaire..."
                  rows={3}
                />
                <div className="flex justify-end">
                  <Button 
                    onClick={handleCommentaireSubmit}
                    disabled={!nouveauCommentaire.trim()}
                  >
                    Ajouter un commentaire
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cog className="h-5 w-5" />
                Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Statut</label>
                <select
                  value={statutActuel}
                  onChange={handleStatutChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
                >
                  <option value="nouvelle">Nouvelle</option>
                  <option value="en-cours">En cours</option>
                  <option value="terminee">Terminée</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Avancement (%)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={nouveauAvancement}
                    onChange={(e) => setNouveauAvancement(parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="w-12 text-center">{nouveauAvancement}%</span>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleAvancementSubmit}>
                    Mettre à jour
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              {veille.documents.length === 0 ? (
                <p className="text-gray-500 italic">Aucun document attaché</p>
              ) : (
                <ul className="space-y-2">
                  {veille.documents.map((doc) => (
                    <li key={doc.id} className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <a 
                        href={doc.url} 
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {doc.nom}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
              <Button variant="outline" className="w-full mt-3">
                <Upload className="h-4 w-4 mr-2" />
                Ajouter un document
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Historique
              </CardTitle>
            </CardHeader>
            <CardContent>
              {veille.historique.length === 0 ? (
                <p className="text-gray-500 italic">Aucun événement historique</p>
              ) : (
                <ul className="space-y-3">
                  {veille.historique.map((event) => (
                    <li key={event.id} className="text-sm border-l-2 border-gray-300 pl-3">
                      <span className="font-medium">{event.action}</span>
                      <div className="text-xs text-gray-500">
                        {event.date.toLocaleDateString()} par {event.utilisateur}
                      </div>
                      {event.details && (
                        <div className="text-gray-700 mt-1">{event.details}</div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VeilleDetail;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import RendezVousForm from "./RendezVousForm";
import { Badge } from "@/components/ui/badge";

const RendezVousList = () => {
  const [showForm, setShowForm] = useState(false);
  const [rendezVous, setRendezVous] = useState([
    {
      id: "1",
      date: "2024-03-15T10:00:00",
      canal: "Téléphone",
      objectif: "Entretien de positionnement",
      synthese: "Bonnes bases, motivé pour apprendre WordPress",
      apprenantNom: "Marie Dubois",
      formationTitre: "WordPress pour débutants"
    }
  ]);
  const { toast } = useToast();

  const handleCreate = async (rdvData: any) => {
    try {
      const newRdv = {
        ...rdvData,
        id: Date.now().toString(),
      };
      setRendezVous(prev => [newRdv, ...prev]);
      setShowForm(false);
      toast({
        title: "Rendez-vous créé",
        description: "Le rendez-vous a été créé avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création.",
        variant: "destructive",
      });
    }
  };

  if (showForm) {
    return (
      <RendezVousForm
        onSubmit={handleCreate}
        onCancel={() => setShowForm(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Rendez-vous</h2>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nouveau rendez-vous
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rendezVous.map((rdv) => (
          <Card key={rdv.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{rdv.objectif}</CardTitle>
              <div className="flex gap-2">
                <Badge variant="secondary">{rdv.canal}</Badge>
                <Badge variant="outline">
                  {new Date(rdv.date).toLocaleDateString('fr-FR')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Apprenant:</strong> {rdv.apprenantNom}
              </p>
              <p className="text-sm text-gray-700 mb-4">
                <strong>Formation:</strong> {rdv.formationTitre}
              </p>
              {rdv.synthese && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  <strong>Synthèse:</strong> {rdv.synthese}
                </p>
              )}
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RendezVousList;

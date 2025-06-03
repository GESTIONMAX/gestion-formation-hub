
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";

interface RendezVousFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const RendezVousForm = ({ onSubmit, onCancel }: RendezVousFormProps) => {
  const [formData, setFormData] = useState({
    date: "",
    canal: "",
    objectif: "",
    synthese: "",
    apprenantNom: "",
    formationTitre: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold">Nouveau rendez-vous</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations du rendez-vous</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date et heure *</Label>
                <Input
                  id="date"
                  type="datetime-local"
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="canal">Canal *</Label>
                <Select value={formData.canal} onValueChange={(value) => handleChange("canal", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un canal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="telephone">Téléphone</SelectItem>
                    <SelectItem value="visio">Visioconférence</SelectItem>
                    <SelectItem value="presentiel">Présentiel</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="objectif">Objectif du rendez-vous *</Label>
              <Select value={formData.objectif} onValueChange={(value) => handleChange("objectif", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un objectif" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="positionnement">Entretien de positionnement</SelectItem>
                  <SelectItem value="suivi">Suivi pédagogique</SelectItem>
                  <SelectItem value="evaluation">Évaluation</SelectItem>
                  <SelectItem value="bilan">Bilan de formation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="apprenantNom">Apprenant *</Label>
                <Input
                  id="apprenantNom"
                  value={formData.apprenantNom}
                  onChange={(e) => handleChange("apprenantNom", e.target.value)}
                  placeholder="Nom de l'apprenant"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="formationTitre">Formation *</Label>
                <Input
                  id="formationTitre"
                  value={formData.formationTitre}
                  onChange={(e) => handleChange("formationTitre", e.target.value)}
                  placeholder="Titre de la formation"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="synthese">Synthèse</Label>
              <Textarea
                id="synthese"
                value={formData.synthese}
                onChange={(e) => handleChange("synthese", e.target.value)}
                placeholder="Synthèse du rendez-vous (à compléter après l'entretien)"
                rows={4}
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                Créer le rendez-vous
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Annuler
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RendezVousForm;

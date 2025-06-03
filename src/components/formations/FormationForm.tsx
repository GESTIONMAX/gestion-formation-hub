
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload } from "lucide-react";

interface FormationFormProps {
  formation?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const FormationForm = ({ formation, onSubmit, onCancel }: FormationFormProps) => {
  const [formData, setFormData] = useState({
    titre: formation?.titre || "",
    description: formation?.description || "",
    objectifs: formation?.objectifs || "",
    programme: formation?.programme || "",
    duree: formation?.duree || "",
    public: formation?.public || "",
    pdfUrl: formation?.pdfUrl || "",
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
        <h2 className="text-2xl font-bold">
          {formation ? "Modifier la formation" : "Nouvelle formation"}
        </h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations de la formation</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="titre">Titre de la formation *</Label>
                <Input
                  id="titre"
                  value={formData.titre}
                  onChange={(e) => handleChange("titre", e.target.value)}
                  placeholder="Ex: WordPress avancé"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duree">Durée *</Label>
                <Input
                  id="duree"
                  value={formData.duree}
                  onChange={(e) => handleChange("duree", e.target.value)}
                  placeholder="Ex: 35 heures"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Description détaillée de la formation"
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="objectifs">Objectifs pédagogiques *</Label>
              <Textarea
                id="objectifs"
                value={formData.objectifs}
                onChange={(e) => handleChange("objectifs", e.target.value)}
                placeholder="Objectifs à atteindre à l'issue de la formation"
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="programme">Programme détaillé *</Label>
              <Textarea
                id="programme"
                value={formData.programme}
                onChange={(e) => handleChange("programme", e.target.value)}
                placeholder="Programme détaillé de la formation"
                rows={6}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="public">Public cible *</Label>
              <Textarea
                id="public"
                value={formData.public}
                onChange={(e) => handleChange("public", e.target.value)}
                placeholder="Prérequis et public visé"
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pdfUrl">Programme PDF (optionnel)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="pdfUrl"
                  value={formData.pdfUrl}
                  onChange={(e) => handleChange("pdfUrl", e.target.value)}
                  placeholder="URL du fichier PDF"
                />
                <Button type="button" variant="outline">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                {formation ? "Modifier" : "Créer"} la formation
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

export default FormationForm;

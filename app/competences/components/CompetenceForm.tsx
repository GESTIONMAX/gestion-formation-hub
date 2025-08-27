import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { X } from "lucide-react";
import { CompetenceFormData, CategorieCompetence, StatutCompetence, TypePreuve } from "../../_lib/types/competence";

interface CompetenceFormProps {
  initialData?: CompetenceFormData;
  onSubmit: (data: CompetenceFormData) => void;
  onCancel: () => void;
}

const CompetenceForm = ({ initialData, onSubmit, onCancel }: CompetenceFormProps) => {
  const [formData, setFormData] = useState<CompetenceFormData>(
    initialData || {
      nom: "",
      description: "",
      categorie: "technique",
      domaineDeveloppement: "",
      niveauActuel: 1,
      objectifNiveau: 3,
      statut: "planifie",
      actionPrevue: "",
      typePreuve: "fichier",
      contenuPreuve: ""
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (name: string, value: number) => {
    setFormData(prev => ({ ...prev, [name]: Math.max(1, Math.min(5, value)) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{initialData ? "Modifier la compétence" : "Ajouter une nouvelle compétence"}</CardTitle>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
              Nom de la compétence
            </label>
            <Input
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="categorie" className="block text-sm font-medium text-gray-700 mb-1">
                Catégorie
              </label>
              <Select 
                value={formData.categorie} 
                onValueChange={(value) => handleSelectChange("categorie", value as CategorieCompetence)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technique">Technique</SelectItem>
                  <SelectItem value="pedagogique">Pédagogique</SelectItem>
                  <SelectItem value="relationnelle">Relationnelle</SelectItem>
                  <SelectItem value="organisationnelle">Organisationnelle</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label htmlFor="domaineDeveloppement" className="block text-sm font-medium text-gray-700 mb-1">
                Domaine de développement
              </label>
              <Input
                id="domaineDeveloppement"
                name="domaineDeveloppement"
                value={formData.domaineDeveloppement}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="niveauActuel" className="block text-sm font-medium text-gray-700 mb-1">
                Niveau actuel (1-5)
              </label>
              <div className="flex items-center gap-2">
                <Input
                  id="niveauActuel"
                  type="number"
                  min={1}
                  max={5}
                  value={formData.niveauActuel}
                  onChange={(e) => handleNumberChange("niveauActuel", parseInt(e.target.value))}
                  required
                />
                <span className="text-sm text-gray-500">/5</span>
              </div>
            </div>
            
            <div>
              <label htmlFor="objectifNiveau" className="block text-sm font-medium text-gray-700 mb-1">
                Niveau objectif (1-5)
              </label>
              <div className="flex items-center gap-2">
                <Input
                  id="objectifNiveau"
                  type="number"
                  min={1}
                  max={5}
                  value={formData.objectifNiveau}
                  onChange={(e) => handleNumberChange("objectifNiveau", parseInt(e.target.value))}
                  required
                />
                <span className="text-sm text-gray-500">/5</span>
              </div>
            </div>
            
            <div>
              <label htmlFor="statut" className="block text-sm font-medium text-gray-700 mb-1">
                Statut
              </label>
              <Select 
                value={formData.statut} 
                onValueChange={(value) => handleSelectChange("statut", value as StatutCompetence)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planifie">Planifié</SelectItem>
                  <SelectItem value="en-cours">En cours</SelectItem>
                  <SelectItem value="realise">Réalisé</SelectItem>
                  <SelectItem value="reporte">Reporté</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <label htmlFor="actionPrevue" className="block text-sm font-medium text-gray-700 mb-1">
              Action prévue
            </label>
            <Textarea
              id="actionPrevue"
              name="actionPrevue"
              value={formData.actionPrevue}
              onChange={handleChange}
              rows={2}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="plateformeFomation" className="block text-sm font-medium text-gray-700 mb-1">
                Plateforme de formation (optionnel)
              </label>
              <Input
                id="plateformeFomation"
                name="plateformeFomation"
                value={formData.plateformeFomation || ""}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="lienFormation" className="block text-sm font-medium text-gray-700 mb-1">
                Lien de la formation (optionnel)
              </label>
              <Input
                id="lienFormation"
                name="lienFormation"
                value={formData.lienFormation || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="typePreuve" className="block text-sm font-medium text-gray-700 mb-1">
              Type de preuve
            </label>
            <Select 
              value={formData.typePreuve} 
              onValueChange={(value) => handleSelectChange("typePreuve", value as TypePreuve)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Type de preuve" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fichier">Fichier</SelectItem>
                <SelectItem value="url">URL</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label htmlFor="contenuPreuve" className="block text-sm font-medium text-gray-700 mb-1">
              {formData.typePreuve === "fichier" ? "Nom du fichier" : "URL"}
            </label>
            <Input
              id="contenuPreuve"
              name="contenuPreuve"
              value={formData.contenuPreuve}
              onChange={handleChange}
              placeholder={formData.typePreuve === "fichier" ? "Nom du fichier" : "https://..."}
              required
            />
          </div>
          
          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Annuler
            </Button>
            <Button type="submit">
              {initialData ? "Mettre à jour" : "Ajouter"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CompetenceForm;

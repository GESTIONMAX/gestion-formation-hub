import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { X } from "lucide-react";

interface ActionCorrective {
  id?: string;
  titre: string;
  description: string;
  statut: 'planifiee' | 'en-cours' | 'terminee' | 'annulee';
  priorite: 'faible' | 'normale' | 'haute' | 'urgente';
  avancement: number;
  dateCreation?: Date;
  dateEcheance?: string;
  dateRealisation?: string;
  responsable?: string;
  source?: string;
  commentaires?: string[];
}

interface ActionCorrectiveFormProps {
  action?: ActionCorrective;
  onSubmit: (data: ActionCorrective) => void;
  onCancel: () => void;
}

const ActionCorrectiveForm = ({ action, onSubmit, onCancel }: ActionCorrectiveFormProps) => {
  const [formData, setFormData] = useState<ActionCorrective>(
    action || {
      titre: "",
      description: "",
      statut: "planifiee",
      priorite: "normale",
      avancement: 0,
      dateEcheance: "",
      responsable: "",
      source: "",
      commentaires: []
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvancementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setFormData(prev => ({ ...prev, avancement: isNaN(value) ? 0 : Math.max(0, Math.min(100, value)) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{action?.id ? "Modifier l'action corrective" : "Créer une nouvelle action corrective"}</CardTitle>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="titre" className="block text-sm font-medium text-gray-700 mb-1">
              Titre de l'action
            </label>
            <Input
              id="titre"
              name="titre"
              value={formData.titre}
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
              <label htmlFor="statut" className="block text-sm font-medium text-gray-700 mb-1">
                Statut
              </label>
              <Select 
                value={formData.statut} 
                onValueChange={(value) => handleSelectChange("statut", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planifiee">Planifiée</SelectItem>
                  <SelectItem value="en-cours">En cours</SelectItem>
                  <SelectItem value="terminee">Terminée</SelectItem>
                  <SelectItem value="annulee">Annulée</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label htmlFor="priorite" className="block text-sm font-medium text-gray-700 mb-1">
                Priorité
              </label>
              <Select 
                value={formData.priorite} 
                onValueChange={(value) => handleSelectChange("priorite", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une priorité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="faible">Faible</SelectItem>
                  <SelectItem value="normale">Normale</SelectItem>
                  <SelectItem value="haute">Haute</SelectItem>
                  <SelectItem value="urgente">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label htmlFor="responsable" className="block text-sm font-medium text-gray-700 mb-1">
                Responsable
              </label>
              <Input
                id="responsable"
                name="responsable"
                value={formData.responsable || ""}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">
                Source
              </label>
              <Input
                id="source"
                name="source"
                value={formData.source || ""}
                onChange={handleChange}
                placeholder="Ex: Audit, Réclamation, Veille..."
              />
            </div>
            
            <div>
              <label htmlFor="dateEcheance" className="block text-sm font-medium text-gray-700 mb-1">
                Date d'échéance
              </label>
              <Input
                id="dateEcheance"
                name="dateEcheance"
                type="date"
                value={formData.dateEcheance || ""}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="avancement" className="block text-sm font-medium text-gray-700 mb-1">
                Avancement (%)
              </label>
              <div className="flex items-center gap-2">
                <Input
                  id="avancement"
                  name="avancement"
                  type="number"
                  min={0}
                  max={100}
                  value={formData.avancement}
                  onChange={handleAvancementChange}
                />
                <span className="text-sm text-gray-500">%</span>
              </div>
            </div>
          </div>
          
          {formData.statut === "terminee" && (
            <div>
              <label htmlFor="dateRealisation" className="block text-sm font-medium text-gray-700 mb-1">
                Date de réalisation
              </label>
              <Input
                id="dateRealisation"
                name="dateRealisation"
                type="date"
                value={formData.dateRealisation || ""}
                onChange={handleChange}
              />
            </div>
          )}
          
          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Annuler
            </Button>
            <Button type="submit">
              {action?.id ? "Mettre à jour" : "Créer"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ActionCorrectiveForm;

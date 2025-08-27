import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import { Veille, TypeVeille, StatutVeille } from "@/lib/utils/types/veille";

interface VeilleFormProps {
  veille?: Partial<Veille>;
  onSubmit: (data: Partial<Veille>) => void;
  onCancel: () => void;
}

const VeilleForm = ({ veille, onSubmit, onCancel }: VeilleFormProps) => {
  const [formData, setFormData] = useState<Partial<Veille>>(
    veille || {
      titre: "",
      description: "",
      type: "metier",
      statut: "nouvelle",
      avancement: 0,
      dateCreation: new Date(),
      commentaires: [],
      documents: [],
      historique: []
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value ? new Date(value) : undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{veille?.id ? "Modifier la veille" : "Créer une nouvelle veille"}</CardTitle>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="titre" className="block text-sm font-medium text-gray-700 mb-1">
              Titre
            </label>
            <Input
              id="titre"
              name="titre"
              value={formData.titre || ""}
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
              value={formData.description || ""}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Type de veille
              </label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => handleSelectChange("type", value as TypeVeille)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Type de veille" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reglementaire">Réglementaire</SelectItem>
                  <SelectItem value="metier">Métier</SelectItem>
                  <SelectItem value="innovation">Innovation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label htmlFor="statut" className="block text-sm font-medium text-gray-700 mb-1">
                Statut
              </label>
              <Select 
                value={formData.statut} 
                onValueChange={(value) => handleSelectChange("statut", value as StatutVeille)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nouvelle">Nouvelle</SelectItem>
                  <SelectItem value="en-cours">En cours</SelectItem>
                  <SelectItem value="terminee">Terminée</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label htmlFor="dateEcheance" className="block text-sm font-medium text-gray-700 mb-1">
                Date d'échéance (optionnelle)
              </label>
              <Input
                id="dateEcheance"
                name="dateEcheance"
                type="date"
                value={formData.dateEcheance ? formData.dateEcheance.toISOString().split("T")[0] : ""}
                onChange={handleDateChange}
              />
            </div>
            
            <div>
              <label htmlFor="avancement" className="block text-sm font-medium text-gray-700 mb-1">
                Avancement (%)
              </label>
              <div className="flex gap-2 items-center">
                <Input
                  id="avancement"
                  name="avancement"
                  type="number"
                  min={0}
                  max={100}
                  value={formData.avancement?.toString() || "0"}
                  onChange={(e) => handleSelectChange("avancement", parseInt(e.target.value) || 0)}
                />
                <span>%</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Annuler
            </Button>
            <Button type="submit">
              {veille?.id ? "Mettre à jour" : "Créer"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default VeilleForm;

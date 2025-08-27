"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useToast } from "../../_lib/hooks/use-toast";

interface RendezvousFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
  editMode?: boolean;
}

const RendezvousFormUnified = ({ onSubmit, onCancel, initialData, editMode = false }: RendezvousFormProps) => {
  const [formData, setFormData] = useState({
    nom: initialData?.nom || "",
    prenom: initialData?.prenom || "",
    email: initialData?.email || "",
    telephone: initialData?.telephone || "",
    date: initialData?.date || "",
    heure: initialData?.heure || "",
    type: initialData?.type || "information",
    motif: initialData?.motif || "",
    notes: initialData?.notes || "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validation simple
    if (!formData.nom || !formData.prenom || !formData.email || !formData.date) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Soumettre les données au parent
      await onSubmit(formData);
      
      toast({
        title: editMode ? "Rendez-vous modifié" : "Rendez-vous créé",
        description: editMode 
          ? "Le rendez-vous a été modifié avec succès."
          : "Le rendez-vous a été créé avec succès.",
      });
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la soumission du formulaire.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editMode ? "Modifier le rendez-vous" : "Nouveau rendez-vous"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nom">Nom *</Label>
              <Input
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prenom">Prénom *</Label>
              <Input
                id="prenom"
                name="prenom"
                value={formData.prenom}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telephone">Téléphone</Label>
              <Input
                id="telephone"
                name="telephone"
                value={formData.telephone}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="heure">Heure *</Label>
              <Input
                id="heure"
                name="heure"
                type="time"
                value={formData.heure}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type de rendez-vous *</Label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="information">Demande d'information</option>
              <option value="positionnement">Positionnement</option>
              <option value="suivi">Suivi de formation</option>
              <option value="bilan">Bilan de formation</option>
              <option value="autre">Autre</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="motif">Motif du rendez-vous *</Label>
            <Textarea
              id="motif"
              name="motif"
              value={formData.motif}
              onChange={handleInputChange}
              rows={2}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={4}
            />
          </div>

          <div className="flex gap-4 pt-2">
            <Button type="submit" disabled={isProcessing} className="flex-1">
              {isProcessing ? "Traitement en cours..." : (editMode ? "Modifier" : "Créer le rendez-vous")}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Annuler
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RendezvousFormUnified;

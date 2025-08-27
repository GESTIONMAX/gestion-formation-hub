"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useToast } from "../../_lib/hooks/use-toast";
import api from "../../../services/api";
import { Checkbox } from "../ui/checkbox";

interface ProgrammePersonnaliseFormProps {
  positionnementRequest: any;
  onCancel: () => void;
  onSuccess: (programmeId: string) => void;
}

const ProgrammePersonnaliseForm = ({ positionnementRequest, onCancel, onSuccess }: ProgrammePersonnaliseFormProps) => {
  const [formData, setFormData] = useState({
    titre: positionnementRequest.formation_selectionnee || "",
    duree: "14",
    duree_unite: "heures",
    objectifs: "À l'issue de cette formation, l'apprenant sera capable de :",
    public_cible: "Professionnels souhaitant développer leurs compétences dans ce domaine.",
    prerequis: "Aucun prérequis spécifique n'est nécessaire pour suivre cette formation.",
    moyens_pedagogiques: "Formation en présentiel ou à distance\nSupport de cours\nExercices pratiques\nMises en situation professionnelles",
    contenu: "Module 1 : Introduction\n\nModule 2 : Principes fondamentaux\n\nModule 3 : Applications pratiques\n\nModule 4 : Évaluation des acquis",
    modalites_evaluation: "Évaluation continue lors des exercices pratiques\nQCM de validation des acquis\nMise en situation professionnelle",
    accessibilite: true,
    qualiopi: true,
    prix_ht: "",
    taux_horaire_ht: "120"
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const calculatePrixHT = () => {
    if (formData.duree && formData.taux_horaire_ht) {
      const duree = parseFloat(formData.duree);
      const tauxHoraire = parseFloat(formData.taux_horaire_ht);
      if (!isNaN(duree) && !isNaN(tauxHoraire)) {
        return (duree * tauxHoraire).toFixed(2);
      }
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.titre.trim()) {
      toast({
        title: "Champ requis",
        description: "Le titre du programme est requis",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Préparer les données pour l'API
      const programmeData = {
        titre: formData.titre,
        duree: parseFloat(formData.duree),
        dureeUnite: formData.duree_unite,
        objectifs: formData.objectifs,
        publicCible: formData.public_cible,
        prerequis: formData.prerequis,
        moyensPedagogiques: formData.moyens_pedagogiques,
        contenu: formData.contenu,
        modalitesEvaluation: formData.modalites_evaluation,
        accessibilite: formData.accessibilite,
        qualiopi: formData.qualiopi,
        tauxHoraireHT: parseFloat(formData.taux_horaire_ht),
        prixHT: calculatePrixHT() ? parseFloat(calculatePrixHT()) : undefined,
        categorieId: positionnementRequest.categorie_id || null,
        type: 'sur-mesure', // Programme personnalisé = sur mesure
        beneficiaire: {
          nom: positionnementRequest.nom_beneficiaire,
          prenom: positionnementRequest.prenom_beneficiaire,
          email: positionnementRequest.email
        }
      };

      // Appel API pour créer le programme personnalisé
      const response = await api.post('/programmes-personnalises', programmeData);
      const data = response.data;

      toast({
        title: "Programme créé",
        description: "Le programme personnalisé a été créé avec succès.",
      });

      // Appeler le callback avec l'ID du programme créé
      onSuccess(data.id);
    } catch (error) {
      console.error('Erreur lors de la création du programme:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création du programme personnalisé.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Création du programme personnalisé</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="titre">Titre du programme *</Label>
            <Input
              id="titre"
              name="titre"
              value={formData.titre}
              onChange={handleInputChange}
              placeholder="Titre de la formation"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duree">Durée *</Label>
              <div className="flex">
                <Input
                  id="duree"
                  name="duree"
                  type="number"
                  value={formData.duree}
                  onChange={handleInputChange}
                  className="rounded-r-none"
                  required
                />
                <select
                  name="duree_unite"
                  value={formData.duree_unite}
                  onChange={(e) => setFormData(prev => ({ ...prev, duree_unite: e.target.value }))}
                  className="border rounded-l-none border-l-0 px-3 py-2"
                >
                  <option value="heures">heures</option>
                  <option value="jours">jours</option>
                  <option value="semaines">semaines</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="taux_horaire_ht">Taux horaire HT (€) *</Label>
              <Input
                id="taux_horaire_ht"
                name="taux_horaire_ht"
                type="number"
                value={formData.taux_horaire_ht}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="prix_ht">Prix total HT (€)</Label>
            <Input
              id="prix_ht"
              name="prix_ht"
              type="text"
              value={calculatePrixHT()}
              readOnly
              className="bg-gray-50"
            />
            <p className="text-xs text-gray-500">Calculé automatiquement d'après la durée et le taux horaire</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="objectifs">Objectifs *</Label>
            <Textarea
              id="objectifs"
              name="objectifs"
              value={formData.objectifs}
              onChange={handleInputChange}
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="public_cible">Public cible *</Label>
            <Textarea
              id="public_cible"
              name="public_cible"
              value={formData.public_cible}
              onChange={handleInputChange}
              rows={2}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="prerequis">Prérequis *</Label>
            <Textarea
              id="prerequis"
              name="prerequis"
              value={formData.prerequis}
              onChange={handleInputChange}
              rows={2}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="moyens_pedagogiques">Moyens pédagogiques *</Label>
            <Textarea
              id="moyens_pedagogiques"
              name="moyens_pedagogiques"
              value={formData.moyens_pedagogiques}
              onChange={handleInputChange}
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contenu">Contenu de la formation *</Label>
            <Textarea
              id="contenu"
              name="contenu"
              value={formData.contenu}
              onChange={handleInputChange}
              rows={8}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="modalites_evaluation">Modalités d'évaluation *</Label>
            <Textarea
              id="modalites_evaluation"
              name="modalites_evaluation"
              value={formData.modalites_evaluation}
              onChange={handleInputChange}
              rows={3}
              required
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="accessibilite" 
                checked={formData.accessibilite}
                onCheckedChange={(checked) => handleCheckboxChange("accessibilite", checked === true)}
              />
              <Label htmlFor="accessibilite" className="font-normal">Accessible aux personnes en situation de handicap</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="qualiopi" 
                checked={formData.qualiopi}
                onCheckedChange={(checked) => handleCheckboxChange("qualiopi", checked === true)}
              />
              <Label htmlFor="qualiopi" className="font-normal">Formation certifiée Qualiopi</Label>
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isProcessing} className="flex-1">
              {isProcessing ? "Création en cours..." : "Créer le programme"}
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

export default ProgrammePersonnaliseForm;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import api from "@/services/api";

interface ProgrammePersonnaliseFormProps {
  positionnementRequest: any;
  onCancel: () => void;
  onSuccess: (programmeId: string) => void;
}

const ProgrammePersonnaliseForm = ({ positionnementRequest, onCancel, onSuccess }: ProgrammePersonnaliseFormProps) => {
  const [formData, setFormData] = useState({
    titre: `Formation WordPress personnalisée - ${positionnementRequest.prenom_beneficiaire} ${positionnementRequest.nom_beneficiaire}`,
    objectifs_specifiques: "",
    duree_estimee: 35, // 35h par défaut
    modalites_pedagogiques: "Formation individuelle à distance avec accompagnement personnalisé",
    prerequis_adaptes: "",
    evaluation_prevue: "Évaluation continue et projet final de création de site vitrine",
    competences_visees: ["Créer un site vitrine avec WordPress", "Maîtriser l'interface d'administration", "Optimiser le référencement de base"],
    ressources_necessaires: ["Ordinateur avec connexion internet", "Accès à un hébergement web", "Logiciels: navigateur web, éditeur de texte"]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCompetenceChange = (index: number, value: string) => {
    const newCompetences = [...formData.competences_visees];
    newCompetences[index] = value;
    setFormData(prev => ({ ...prev, competences_visees: newCompetences }));
  };

  const addCompetence = () => {
    setFormData(prev => ({ 
      ...prev, 
      competences_visees: [...prev.competences_visees, ""] 
    }));
  };

  const removeCompetence = (index: number) => {
    const newCompetences = formData.competences_visees.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, competences_visees: newCompetences }));
  };

  const handleRessourceChange = (index: number, value: string) => {
    const newRessources = [...formData.ressources_necessaires];
    newRessources[index] = value;
    setFormData(prev => ({ ...prev, ressources_necessaires: newRessources }));
  };

  const addRessource = () => {
    setFormData(prev => ({ 
      ...prev, 
      ressources_necessaires: [...prev.ressources_necessaires, ""] 
    }));
  };

  const removeRessource = (index: number) => {
    const newRessources = formData.ressources_necessaires.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, ressources_necessaires: newRessources }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Création du programme personnalisé via l'API
      const programmeData = {
        positionnementRequestId: positionnementRequest.id,
        titre: formData.titre,
        objectifsSpecifiques: formData.objectifs_specifiques,
        competencesVisees: formData.competences_visees.filter(c => c.trim() !== ''),
        dureeEstimee: formData.duree_estimee,
        modalitesPedagogiques: formData.modalites_pedagogiques,
        prerequisAdaptes: formData.prerequis_adaptes,
        evaluationPrevue: formData.evaluation_prevue,
        ressourcesNecessaires: formData.ressources_necessaires.filter(r => r.trim() !== ''),
        statut: 'valide'
      };
      
      const response = await api.post('/programmes-personnalises', programmeData);
      const data = response.data;

      toast({
        title: "Programme créé",
        description: "Le programme de formation personnalisé a été créé avec succès.",
      });

      onSuccess(data.id);
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création du programme.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold">Création du programme personnalisé</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Programme pour {positionnementRequest.prenom_beneficiaire} {positionnementRequest.nom_beneficiaire}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="titre">Titre du programme *</Label>
              <Input
                id="titre"
                value={formData.titre}
                onChange={(e) => handleChange("titre", e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duree_estimee">Durée estimée (heures) *</Label>
                <Input
                  id="duree_estimee"
                  type="number"
                  value={formData.duree_estimee}
                  onChange={(e) => handleChange("duree_estimee", parseInt(e.target.value))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="objectifs_specifiques">Objectifs spécifiques</Label>
              <Textarea
                id="objectifs_specifiques"
                value={formData.objectifs_specifiques}
                onChange={(e) => handleChange("objectifs_specifiques", e.target.value)}
                placeholder="Objectifs adaptés selon le positionnement..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Compétences visées</Label>
              {formData.competences_visees.map((competence, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={competence}
                    onChange={(e) => handleCompetenceChange(index, e.target.value)}
                    placeholder="Décrivez une compétence..."
                  />
                  <Button type="button" variant="outline" onClick={() => removeCompetence(index)}>
                    Supprimer
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addCompetence}>
                Ajouter une compétence
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="modalites_pedagogiques">Modalités pédagogiques</Label>
              <Textarea
                id="modalites_pedagogiques"
                value={formData.modalites_pedagogiques}
                onChange={(e) => handleChange("modalites_pedagogiques", e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prerequis_adaptes">Prérequis adaptés</Label>
              <Textarea
                id="prerequis_adaptes"
                value={formData.prerequis_adaptes}
                onChange={(e) => handleChange("prerequis_adaptes", e.target.value)}
                placeholder="Prérequis selon le niveau détecté..."
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="evaluation_prevue">Évaluation prévue</Label>
              <Textarea
                id="evaluation_prevue"
                value={formData.evaluation_prevue}
                onChange={(e) => handleChange("evaluation_prevue", e.target.value)}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label>Ressources nécessaires</Label>
              {formData.ressources_necessaires.map((ressource, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={ressource}
                    onChange={(e) => handleRessourceChange(index, e.target.value)}
                    placeholder="Décrivez une ressource..."
                  />
                  <Button type="button" variant="outline" onClick={() => removeRessource(index)}>
                    Supprimer
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addRessource}>
                Ajouter une ressource
              </Button>
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? "Création en cours..." : "Créer le programme"}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
                Annuler
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgrammePersonnaliseForm;

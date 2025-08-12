
import { useState } from "react";
import { useConfetti } from "@/hooks/useConfetti";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";
import PositionnementFormHeader from "./PositionnementFormHeader";
import BeneficiaireInfoSection from "./BeneficiaireInfoSection";
import CoordonneesSection from "./CoordonneesSection";
import ExperienceObjectifsSection from "./ExperienceObjectifsSection";

interface PositionnementFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  formationTitre?: string;
}

const PositionnementForm = ({ onSubmit, onCancel, formationTitre = "WordPress : concevoir et réaliser un site vitrine • webmarketing initial" }: PositionnementFormProps) => {
  const [formData, setFormData] = useState({
    // Formation sélectionnée
    formationSelectionnee: formationTitre,
    // Informations du bénéficiaire
    nomBeneficiaire: "",
    prenomBeneficiaire: "",
    dateNaissance: "",
    sexe: "",
    situationHandicap: "",
    // Coordonnées
    email: "",
    telephone: "",
    // Adresse
    adresse: "",
    codePostal: "",
    ville: "",
    // Statut
    statut: "",
    // Expérience
    experienceWordPress: "",
    // Objectifs
    objectifsPrincipaux: "",
    // Niveau de maîtrise
    niveauMaitrise: "non",
    // Programme de formation
    programmeFormation: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { fireConfetti } = useConfetti();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation basique
    if (!formData.nomBeneficiaire || !formData.prenomBeneficiaire || !formData.email || !formData.telephone) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Données envoyées:", formData);
      
      // Utilisation de l'API qui interagit avec Prisma
      const response = await api.post('/api/positionnement-requests', {
        nomBeneficiaire: formData.nomBeneficiaire,
        prenomBeneficiaire: formData.prenomBeneficiaire,
        email: formData.email,
        telephone: formData.telephone,
        formationSelectionnee: formData.formationSelectionnee,
        dateNaissance: formData.dateNaissance || null,
        sexe: formData.sexe,
        situationHandicap: formData.situationHandicap,
        adresse: formData.adresse,
        codePostal: formData.codePostal,
        ville: formData.ville,
        statut: formData.statut,
        experienceWordpress: formData.experienceWordPress,
        objectifsPrincipaux: formData.objectifsPrincipaux,
        niveauMaitrise: formData.niveauMaitrise,
        programmeFormation: formData.programmeFormation
      });

      const { data } = response;
      console.log('Demande créée avec succès, ID:', data.id);

      toast({
        title: "Demande envoyée",
        description: "Votre demande de rendez-vous de positionnement a été envoyée avec succès. Nous vous recontacterons rapidement.",
      });
      
      // Lancer l'effet de confetti pour célébrer la soumission réussie
      fireConfetti();
      
      onSubmit(formData);
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      toast({
        title: "Erreur",
        description: `Une erreur est survenue lors de l'envoi de votre demande : ${error instanceof Error ? error.message : error?.response?.data?.message || 'Erreur inconnue'}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <PositionnementFormHeader formationTitre={formationTitre} />
        <CardContent className="mt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-sm text-gray-700 mb-4">
                Ce formulaire nous aidera dans un premier temps à identifier vos acquis, 
                expériences et besoins de formation. Il en ressortira un premier entretien 
                téléphonique de positionnement pédagogique.
              </p>
            </div>

            <BeneficiaireInfoSection formData={formData} handleChange={handleChange} />
            <CoordonneesSection formData={formData} handleChange={handleChange} />
            <ExperienceObjectifsSection formData={formData} handleChange={handleChange} />

            {/* Programme de formation */}
            <div className="bg-blue-50 p-4 rounded space-y-2">
              <h3 className="font-semibold text-blue-900">Programme de formation</h3>
              <p className="text-sm text-blue-800">
                Le programme de la formation sera personnalisé suite à l'entretien de positionnement.
              </p>
            </div>

            {/* Boutons */}
            <div className="flex gap-4 pt-6">
              <Button 
                type="submit" 
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
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

export default PositionnementForm;

import { useState } from "react";
import { useConfetti } from "../../_lib/hooks/useConfetti";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/lib/hooks/use-toast";
import api from "@/services/api";
import BeneficiaireInfoSection from "./BeneficiaireInfoSection";
import CoordonneesSection from "./CoordonneesSection";
import ExperienceObjectifsSection from "./ExperienceObjectifsSection";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { AxiosError } from "axios";

interface FormData {
  formationSelectionnee: string;
  nomBeneficiaire: string;
  prenomBeneficiaire: string;
  dateNaissance: string;
  sexe: string;
  situationHandicap: string;
  dateRdv?: Date;
  email: string;
  telephone: string;
  adresse: string;
  codePostal: string;
  ville: string;
  statut: string;
  experienceWordPress: string;
  objectifsPrincipaux: string;
  niveauMaitrise: string;
  programmeFormation: string;
}

interface PositionnementFormProps {
  onSubmit?: (data: FormData) => void;
  onCancel?: () => void;
  onSuccess?: () => void;
  formationTitre?: string;
}

const PositionnementForm = ({ onSubmit, onCancel, formationTitre = "WordPress : concevoir et réaliser un site vitrine • webmarketing initial" }: PositionnementFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    // Formation sélectionnée
    formationSelectionnee: formationTitre,
    // Informations du bénéficiaire
    nomBeneficiaire: "",
    prenomBeneficiaire: "",
    dateNaissance: "",
    sexe: "",
    situationHandicap: "",
    // Date et heure du rendez-vous
    dateRdv: undefined,
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
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Données envoyées:", formData);
      
      const response = await api.post('/api/rendezvous', {
        // Informations du bénéficiaire
        nom: formData.nomBeneficiaire,
        prenom: formData.prenomBeneficiaire,
        dateNaissance: formData.dateNaissance,
        sexe: formData.sexe,
        situationHandicap: formData.situationHandicap,
        // Coordonnées
        email: formData.email,
        telephone: formData.telephone,
        adresse: formData.adresse,
        codePostal: formData.codePostal,
        ville: formData.ville,
        // Formation
        formation: formData.formationSelectionnee,
        // Expérience et objectifs
        pratiqueActuelle: formData.experienceWordPress,
        objectifs: formData.objectifsPrincipaux,
        niveau: formData.niveauMaitrise,
        // Date et statut du rendez-vous
        dateRdv: formData.dateRdv,
        status: 'nouveau', // Statut initial d'une demande de positionnement
        type: 'positionnement'
      });

      const { data } = response;
      console.log('Demande créée avec succès, ID:', data.id);

      toast.success("Votre demande de rendez-vous de positionnement a été envoyée avec succès. Nous vous recontacterons rapidement.");
      
      // Lancer l'effet de confetti pour célébrer la soumission réussie
      fireConfetti();
      
      if (onSubmit) {
        onSubmit(formData);
      }
    } catch (error: unknown) {
      console.error('Erreur lors de l\'envoi:', error);
      let errorMessage = 'Erreur inconnue';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        errorMessage = axiosError.response?.data?.message || 'Erreur inconnue';
      }
      
      toast.error(`Une erreur est survenue lors de l'envoi de votre demande : ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string | boolean | Date | undefined) => {
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

            {/* Date et heure du rendez-vous */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Planification du rendez-vous</h3>
              <div className="space-y-2">
                <Label htmlFor="dateRdv">Date et heure souhaitées</Label>
                <DateTimePicker
                  date={formData.dateRdv instanceof Date ? formData.dateRdv : formData.dateRdv ? new Date(formData.dateRdv) : undefined}
                  setDate={(date) => handleChange("dateRdv", date)}
                />
              </div>
            </div>

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

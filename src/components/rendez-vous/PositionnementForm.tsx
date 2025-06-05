
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import PositionnementFormHeader from "./PositionnementFormHeader";
import BeneficiaireInfoSection from "./BeneficiaireInfoSection";
import CoordonneesSection from "./CoordonneesSection";
import ExperienceObjectifsSection from "./ExperienceObjectifsSection";

interface PositionnementFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const PositionnementForm = ({ onSubmit, onCancel }: PositionnementFormProps) => {
  const [formData, setFormData] = useState({
    // Formation sélectionnée
    formationSelectionnee: "WordPress : concevoir et réaliser un site vitrine • webmarketing initial",
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
      
      // Utilisation de la fonction RPC pour contourner les politiques RLS
      const { error } = await supabase.rpc('create_positionnement_request', {
        p_nom_beneficiaire: formData.nomBeneficiaire,
        p_prenom_beneficiaire: formData.prenomBeneficiaire,
        p_email: formData.email,
        p_telephone: formData.telephone,
        p_formation_selectionnee: formData.formationSelectionnee,
        p_date_naissance: formData.dateNaissance || null,
        p_sexe: formData.sexe,
        p_situation_handicap: formData.situationHandicap,
        p_adresse: formData.adresse,
        p_code_postal: formData.codePostal,
        p_ville: formData.ville,
        p_statut: formData.statut,
        p_experience_wordpress: formData.experienceWordPress,
        p_objectifs_principaux: formData.objectifsPrincipaux,
        p_niveau_maitrise: formData.niveauMaitrise,
        p_programme_formation: formData.programmeFormation
      });

      if (error) {
        console.error('Erreur Supabase:', error);
        throw error;
      }

      toast({
        title: "Demande envoyée",
        description: "Votre demande de rendez-vous de positionnement a été envoyée avec succès. Nous vous recontacterons rapidement.",
      });
      
      onSubmit(formData);
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      toast({
        title: "Erreur",
        description: `Une erreur est survenue lors de l'envoi de votre demande : ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
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
        <PositionnementFormHeader />
        <CardContent className="mt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-sm text-gray-700 mb-4">
                Ce formulaire nous aide permettra dans un premier temps d'identifier vos acquis, 
                expériences, vos besoins de formation et sans doute certains traits. Il en 
                ressortira un premier entretien téléphonique de positionnement pédagogique.
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

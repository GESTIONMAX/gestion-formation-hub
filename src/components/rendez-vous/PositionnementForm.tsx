
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
        description: "Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer.",
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
        <CardHeader className="bg-blue-50">
          <CardTitle className="text-2xl text-blue-900">
            Rendez-vous de positionnement initial
          </CardTitle>
          <div className="bg-blue-100 p-3 rounded">
            <p className="text-sm text-blue-800">
              <strong>Formation sélectionnée :</strong> WordPress : concevoir et réaliser un site vitrine • webmarketing initial <br/>
              <strong>Référence :</strong> RNCP35634-BC01 <br/>
              <strong>Catégorie :</strong> Formations sur le code ROME E
            </p>
          </div>
        </CardHeader>
        <CardContent className="mt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-sm text-gray-700 mb-4">
                Ce formulaire nous aide permettra dans un premier temps d'identifier vos acquis, 
                expériences, vos besoins de formation et sans doute certains traits. Il en 
                ressortira un premier entretien téléphonique de positionnement pédagogique.
              </p>
            </div>

            {/* Informations du bénéficiaire */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Informations du bénéficiaire</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nomBeneficiaire">Nom du bénéficiaire *</Label>
                  <Input
                    id="nomBeneficiaire"
                    value={formData.nomBeneficiaire}
                    onChange={(e) => handleChange("nomBeneficiaire", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prenomBeneficiaire">Prénom du bénéficiaire *</Label>
                  <Input
                    id="prenomBeneficiaire"
                    value={formData.prenomBeneficiaire}
                    onChange={(e) => handleChange("prenomBeneficiaire", e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateNaissance">Date de naissance</Label>
                  <Input
                    id="dateNaissance"
                    type="date"
                    value={formData.dateNaissance}
                    onChange={(e) => handleChange("dateNaissance", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sexe">Sexe du bénéficiaire *</Label>
                  <Select value={formData.sexe} onValueChange={(value) => handleChange("sexe", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="femme">Femme</SelectItem>
                      <SelectItem value="homme">Homme</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="situationHandicap">Situation handicap</Label>
                  <Select value={formData.situationHandicap} onValueChange={(value) => handleChange("situationHandicap", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oui">Oui</SelectItem>
                      <SelectItem value="non">Non</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Coordonnées */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Coordonnées</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telephone">Téléphone *</Label>
                  <Input
                    id="telephone"
                    type="tel"
                    value={formData.telephone}
                    onChange={(e) => handleChange("telephone", e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="adresse">Adresse complète</Label>
                <Input
                  id="adresse"
                  value={formData.adresse}
                  onChange={(e) => handleChange("adresse", e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="codePostal">Code postal</Label>
                  <Input
                    id="codePostal"
                    value={formData.codePostal}
                    onChange={(e) => handleChange("codePostal", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ville">Ville</Label>
                  <Input
                    id="ville"
                    value={formData.ville}
                    onChange={(e) => handleChange("ville", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Statut */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="statut">Statut actuel</Label>
                <Select value={formData.statut} onValueChange={(value) => handleChange("statut", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner votre statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salarie">Salarié(e)</SelectItem>
                    <SelectItem value="independant">Travailleur indépendant</SelectItem>
                    <SelectItem value="demandeur-emploi">Demandeur d'emploi</SelectItem>
                    <SelectItem value="etudiant">Étudiant(e)</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Expérience */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="experienceWordPress">Expérience avec WordPress</Label>
                <Textarea
                  id="experienceWordPress"
                  value={formData.experienceWordPress}
                  onChange={(e) => handleChange("experienceWordPress", e.target.value)}
                  placeholder="Décrivez votre expérience avec WordPress ou les outils web..."
                  rows={3}
                />
              </div>
            </div>

            {/* Objectifs */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="objectifsPrincipaux">Objectifs principaux</Label>
                <Textarea
                  id="objectifsPrincipaux"
                  value={formData.objectifsPrincipaux}
                  onChange={(e) => handleChange("objectifsPrincipaux", e.target.value)}
                  placeholder="Quels sont vos objectifs avec cette formation ?"
                  rows={3}
                />
              </div>
            </div>

            {/* Niveau de maîtrise */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Niveau de maîtrise</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="niveauMaitrise"
                      value="oui"
                      checked={formData.niveauMaitrise === "oui"}
                      onChange={(e) => handleChange("niveauMaitrise", e.target.value)}
                    />
                    <span>Oui</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="niveauMaitrise"
                      value="non"
                      checked={formData.niveauMaitrise === "non"}
                      onChange={(e) => handleChange("niveauMaitrise", e.target.value)}
                    />
                    <span>Non</span>
                  </label>
                </div>
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

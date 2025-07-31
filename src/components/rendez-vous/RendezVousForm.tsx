
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RendezVousFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any; // Données initiales pour l'édition
  editMode?: boolean; // Mode édition ou création
}

const RendezVousForm = ({ onSubmit, onCancel, initialData, editMode = false }: RendezVousFormProps) => {
  const [formData, setFormData] = useState(initialData || {
    // Informations de base
    date: "",
    canal: "",
    objectif: "",
    synthese: "",
    apprenantNom: "",
    formationTitre: "",
    
    // Informations B2B
    entreprise: "",
    siret: "",
    adresseEntreprise: "",
    interlocuteurNom: "",
    interlocuteurFonction: "",
    interlocuteurEmail: "",
    interlocuteurTelephone: "",
    organismeFinanceur: "",
    numeroConvention: "",
    
    // Informations complémentaires pour la formation professionnelle
    typeFinancement: "", // OPCO, entreprise, personnel, etc.
    priseEnChargeOPCO: false,
    tauxPriseEnCharge: "",
    restePourEntreprise: "",
    besoinsSpecifiques: "",
    prerequisFormation: "",
    contraintes: "",
    delaisDemarrage: "",
    noteQualification: "", // Notes qualificatives du commercial
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold">{editMode ? "Modifier rendez-vous" : "Nouveau rendez-vous"}</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations du rendez-vous</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Tabs defaultValue="general">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="general">Général</TabsTrigger>
                <TabsTrigger value="business">Informations B2B</TabsTrigger>
                <TabsTrigger value="qualification">Qualification commerciale</TabsTrigger>
              </TabsList>
              
              {/* Onglet Général */}
              <TabsContent value="general">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date et heure *</Label>
                    <Input
                      id="date"
                      type="datetime-local"
                      value={formData.date}
                      onChange={(e) => handleChange("date", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="canal">Canal *</Label>
                    <Select value={formData.canal} onValueChange={(value) => handleChange("canal", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un canal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="telephone">Téléphone</SelectItem>
                        <SelectItem value="visio">Visioconférence</SelectItem>
                        <SelectItem value="presentiel">Présentiel</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <Label htmlFor="objectif">Objectif du rendez-vous *</Label>
                  <Select value={formData.objectif} onValueChange={(value) => handleChange("objectif", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un objectif" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="positionnement">Entretien de positionnement</SelectItem>
                      <SelectItem value="suivi">Suivi pédagogique</SelectItem>
                      <SelectItem value="evaluation">Évaluation</SelectItem>
                      <SelectItem value="bilan">Bilan de formation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="apprenantNom">Apprenant *</Label>
                    <Input
                      id="apprenantNom"
                      value={formData.apprenantNom}
                      onChange={(e) => handleChange("apprenantNom", e.target.value)}
                      placeholder="Nom de l'apprenant"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="formationTitre">Formation *</Label>
                    <Input
                      id="formationTitre"
                      value={formData.formationTitre}
                      onChange={(e) => handleChange("formationTitre", e.target.value)}
                      placeholder="Titre de la formation"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="synthese">Synthèse</Label>
                  <Textarea
                    id="synthese"
                    value={formData.synthese}
                    onChange={(e) => handleChange("synthese", e.target.value)}
                    placeholder="Synthèse du rendez-vous (à compléter après l'entretien)"
                    rows={4}
                  />
                </div>
              </TabsContent>
              
              {/* Onglet Informations B2B */}
              <TabsContent value="business">
                <div className="space-y-4">
                  <div className="border-b pb-2">
                    <h3 className="font-semibold text-lg">Informations sur l'entreprise</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="entreprise">Nom de l'entreprise</Label>
                      <Input
                        id="entreprise"
                        value={formData.entreprise}
                        onChange={(e) => handleChange("entreprise", e.target.value)}
                        placeholder="Raison sociale"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="siret">SIRET</Label>
                      <Input
                        id="siret"
                        value={formData.siret}
                        onChange={(e) => handleChange("siret", e.target.value)}
                        placeholder="Numéro SIRET"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="adresseEntreprise">Adresse</Label>
                    <Input
                      id="adresseEntreprise"
                      value={formData.adresseEntreprise}
                      onChange={(e) => handleChange("adresseEntreprise", e.target.value)}
                      placeholder="Adresse complète"
                    />
                  </div>
                  
                  <div className="border-b pb-2 mt-6">
                    <h3 className="font-semibold text-lg">Interlocuteur</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="interlocuteurNom">Nom et prénom</Label>
                      <Input
                        id="interlocuteurNom"
                        value={formData.interlocuteurNom}
                        onChange={(e) => handleChange("interlocuteurNom", e.target.value)}
                        placeholder="Nom et prénom de l'interlocuteur"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="interlocuteurFonction">Fonction</Label>
                      <Input
                        id="interlocuteurFonction"
                        value={formData.interlocuteurFonction}
                        onChange={(e) => handleChange("interlocuteurFonction", e.target.value)}
                        placeholder="Fonction dans l'entreprise"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="interlocuteurEmail">Email</Label>
                      <Input
                        id="interlocuteurEmail"
                        type="email"
                        value={formData.interlocuteurEmail}
                        onChange={(e) => handleChange("interlocuteurEmail", e.target.value)}
                        placeholder="Email professionnel"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="interlocuteurTelephone">Téléphone</Label>
                      <Input
                        id="interlocuteurTelephone"
                        value={formData.interlocuteurTelephone}
                        onChange={(e) => handleChange("interlocuteurTelephone", e.target.value)}
                        placeholder="Téléphone professionnel"
                      />
                    </div>
                  </div>
                  
                  <div className="border-b pb-2 mt-6">
                    <h3 className="font-semibold text-lg">Financement</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="typeFinancement">Type de financement</Label>
                      <Select value={formData.typeFinancement} onValueChange={(value) => handleChange("typeFinancement", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un type de financement" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="opco">OPCO</SelectItem>
                          <SelectItem value="entreprise">Fonds propres entreprise</SelectItem>
                          <SelectItem value="personnel">Personnel</SelectItem>
                          <SelectItem value="cpf">CPF</SelectItem>
                          <SelectItem value="polemploi">Pôle Emploi</SelectItem>
                          <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="organismeFinanceur">Organisme financeur</Label>
                      <Input
                        id="organismeFinanceur"
                        value={formData.organismeFinanceur}
                        onChange={(e) => handleChange("organismeFinanceur", e.target.value)}
                        placeholder="Nom de l'organisme financeur"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="priseEnChargeOPCO" 
                          checked={formData.priseEnChargeOPCO} 
                          onCheckedChange={(checked) => handleChange("priseEnChargeOPCO", checked ? true : false)}
                        />
                        <Label htmlFor="priseEnChargeOPCO">Prise en charge OPCO</Label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tauxPriseEnCharge">Taux de prise en charge (%)</Label>
                      <Input
                        id="tauxPriseEnCharge"
                        value={formData.tauxPriseEnCharge}
                        onChange={(e) => handleChange("tauxPriseEnCharge", e.target.value)}
                        placeholder="Ex: 70"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="restePourEntreprise">Reste à charge entreprise (€)</Label>
                      <Input
                        id="restePourEntreprise"
                        value={formData.restePourEntreprise}
                        onChange={(e) => handleChange("restePourEntreprise", e.target.value)}
                        placeholder="Montant en euros"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="numeroConvention">Numéro de convention</Label>
                      <Input
                        id="numeroConvention"
                        value={formData.numeroConvention}
                        onChange={(e) => handleChange("numeroConvention", e.target.value)}
                        placeholder="N° de convention ou de dossier"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Onglet Qualification commerciale */}
              <TabsContent value="qualification">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="besoinsSpecifiques">Besoins spécifiques identifiés</Label>
                    <Textarea
                      id="besoinsSpecifiques"
                      value={formData.besoinsSpecifiques}
                      onChange={(e) => handleChange("besoinsSpecifiques", e.target.value)}
                      placeholder="Description des besoins identifiés lors de l'entretien"
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="prerequisFormation">Prérequis et niveau de départ</Label>
                    <Textarea
                      id="prerequisFormation"
                      value={formData.prerequisFormation}
                      onChange={(e) => handleChange("prerequisFormation", e.target.value)}
                      placeholder="Prérequis et compétences initiales identifiés"
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contraintes">Contraintes particulières</Label>
                    <Textarea
                      id="contraintes"
                      value={formData.contraintes}
                      onChange={(e) => handleChange("contraintes", e.target.value)}
                      placeholder="Contraintes horaires, techniques, organisationnelles..."
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="delaisDemarrage">Délais de démarrage souhaités</Label>
                      <Input
                        id="delaisDemarrage"
                        value={formData.delaisDemarrage}
                        onChange={(e) => handleChange("delaisDemarrage", e.target.value)}
                        placeholder="Ex: 1 mois, ASAP, Q3 2025..."
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="noteQualification">Notes de qualification commerciale</Label>
                    <Textarea
                      id="noteQualification"
                      value={formData.noteQualification}
                      onChange={(e) => handleChange("noteQualification", e.target.value)}
                      placeholder="Notes pour l'équipe commerciale (niveau d'intérêt, budget, timing...)"
                      rows={3}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex gap-4 pt-4 border-t mt-6">
              <Button type="submit" className="flex-1">
                Créer le rendez-vous
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Annuler
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RendezVousForm;

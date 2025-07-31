
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload, ChevronDown, ChevronUp } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FormationFormProps {
  formation?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const FormationForm = ({ formation, onSubmit, onCancel }: FormationFormProps) => {
  const [formData, setFormData] = useState({
    // Informations légales et réglementaires uniquement
    code: formation?.code || "",
    libelle: formation?.libelle || "",
    prerequis: formation?.prerequis || "",
    publicConcerne: formation?.publicConcerne || "",
    duree: formation?.duree || "",
    horaires: formation?.horaires || "9h-12h30 et 14h-17h30, adaptables selon les besoins du bénéficiaire",
    objectifsPedagogiques: formation?.objectifsPedagogiques || "",
    contenuDetailleJours: formation?.contenuDetailleJours || "",
    modalitesAcces: formation?.modalitesAcces || "Formation accessible à distance ou en présentiel selon le contexte",
    
    tarif: formation?.tarif || "",
    modalitesReglement: formation?.modalitesReglement || "",
    
    contactOrganisme: formation?.contactOrganisme || "GestionMax - contact@gestionmax.fr - 01.23.45.67.89",
    referentPedagogique: formation?.referentPedagogique || "Jean Dupont - jean.dupont@gestionmax.fr",
    referentQualite: formation?.referentQualite || "Marie Martin - marie.martin@gestionmax.fr",
    
    modalitesTechniques: formation?.modalitesTechniques || "Formation synchrone à distance via visioconférence et partage d'écran",
    formateur: formation?.formateur || "Formateur spécialisé WordPress avec 5+ ans d'expérience",
    
    ressourcesDisposition: formation?.ressourcesDisposition || "Support de cours, tutoriels vidéo, accès à une plateforme d'exercices",
    modalitesEvaluation: formation?.modalitesEvaluation || "",
    sanctionFormation: formation?.sanctionFormation || "",
    niveauCertification: formation?.niveauCertification || "Formation non certifiante",
    delaiAcceptation: formation?.delaiAcceptation || "7 jours ouvrables",
    accessibiliteHandicapee: formation?.accessibiliteHandicapee || "Formation accessible aux personnes en situation de handicap. Contactez notre référent handicap pour adapter le parcours.",
    cessationAbandon: formation?.cessationAbandon || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold">
          {formation ? "Modifier la formation" : "Nouvelle formation"}
        </h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations légales et réglementaires de la formation</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">Code de la formation *</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => handleChange("code", e.target.value)}
                  placeholder="Ex: FOR-WP-01"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="libelle">Libellé de la formation *</Label>
                <Input
                  id="libelle"
                  value={formData.libelle}
                  onChange={(e) => handleChange("libelle", e.target.value)}
                  placeholder="Ex: Formation WordPress avancée"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duree">Durée *</Label>
                <Input
                  id="duree"
                  value={formData.duree}
                  onChange={(e) => handleChange("duree", e.target.value)}
                  placeholder="Ex: 35 heures"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tarif">Tarif de la formation *</Label>
                <Input
                  id="tarif"
                  value={formData.tarif}
                  onChange={(e) => handleChange("tarif", e.target.value)}
                  placeholder="Ex: 2500€ HT"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="prerequis">Prérequis *</Label>
                <Textarea
                  id="prerequis"
                  value={formData.prerequis}
                  onChange={(e) => handleChange("prerequis", e.target.value)}
                  placeholder="Prérequis nécessaires pour suivre la formation"
                  rows={2}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="publicConcerne">Public concerné *</Label>
                <Textarea
                  id="publicConcerne"
                  value={formData.publicConcerne}
                  onChange={(e) => handleChange("publicConcerne", e.target.value)}
                  placeholder="Type de public visé par cette formation"
                  rows={2}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="horaires">Les horaires *</Label>
                <Textarea
                  id="horaires"
                  value={formData.horaires}
                  onChange={(e) => handleChange("horaires", e.target.value)}
                  placeholder="Horaires habituels de la formation"
                  rows={2}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="modalitesAcces">Modalités et délais d'accès *</Label>
                <Textarea
                  id="modalitesAcces"
                  value={formData.modalitesAcces}
                  onChange={(e) => handleChange("modalitesAcces", e.target.value)}
                  placeholder="Modalités et délais moyens d'accès"
                  rows={2}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="objectifsPedagogiques">Objectifs pédagogiques *</Label>
              <Textarea
                id="objectifsPedagogiques"
                value={formData.objectifsPedagogiques}
                onChange={(e) => handleChange("objectifsPedagogiques", e.target.value)}
                placeholder="Objectifs pédagogiques détaillés de la formation"
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contenuDetailleJours">Contenu détaillé par jour</Label>
              <Textarea
                id="contenuDetailleJours"
                value={formData.contenuDetailleJours}
                onChange={(e) => handleChange("contenuDetailleJours", e.target.value)}
                placeholder="Détaillez le contenu de la formation jour par jour (Jour 1: ..., Jour 2: ...)"
                rows={6}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tarif">Tarif de la formation *</Label>
                <Input
                  id="tarif"
                  value={formData.tarif}
                  onChange={(e) => handleChange("tarif", e.target.value)}
                  placeholder="Ex: 2500€ HT"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="modalitesReglement">Modalités de règlement *</Label>
                <Textarea
                  id="modalitesReglement"
                  value={formData.modalitesReglement}
                  onChange={(e) => handleChange("modalitesReglement", e.target.value)}
                  placeholder="Conditions et modalités de paiement"
                  rows={2}
                  required
                />
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full border rounded-md p-2">
              <AccordionItem value="contacts" className="border-none">
                <AccordionTrigger className="py-2 font-semibold text-lg">
                  Contacts et référents
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactOrganisme">Contact de l'organisme *</Label>
                      <Textarea
                        id="contactOrganisme"
                        value={formData.contactOrganisme}
                        onChange={(e) => handleChange("contactOrganisme", e.target.value)}
                        placeholder="Coordonnées complètes de l'organisme"
                        rows={2}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="referentPedagogique">Référent pédagogique *</Label>
                      <Textarea
                        id="referentPedagogique"
                        value={formData.referentPedagogique}
                        onChange={(e) => handleChange("referentPedagogique", e.target.value)}
                        placeholder="Nom et contact du référent pédagogique"
                        rows={2}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="referentQualite">Référent qualité *</Label>
                      <Textarea
                        id="referentQualite"
                        value={formData.referentQualite}
                        onChange={(e) => handleChange("referentQualite", e.target.value)}
                        placeholder="Nom et contact du référent qualité"
                        rows={2}
                        required
                      />
                    </div>
                    

                    
                    <div className="space-y-2">
                      <Label htmlFor="modalitesTechniques">Modalités techniques et pédagogiques</Label>
                      <Textarea
                        id="modalitesTechniques"
                        value={formData.modalitesTechniques}
                        onChange={(e) => handleChange("modalitesTechniques", e.target.value)}
                        placeholder="Modalités techniques et pédagogiques de la formation"
                        rows={2}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="formateur">Formateur</Label>
                      <Input
                        id="formateur"
                        value={formData.formateur}
                        onChange={(e) => handleChange("formateur", e.target.value)}
                        placeholder="Informations sur le formateur"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="ressourcesDisposition">Ressources mises à disposition</Label>
                      <Textarea
                        id="ressourcesDisposition"
                        value={formData.ressourcesDisposition}
                        onChange={(e) => handleChange("ressourcesDisposition", e.target.value)}
                        placeholder="Ressources mises à disposition des apprenants"
                        rows={2}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="modalitesEvaluation">Modalités d'évaluation</Label>
                      <Textarea
                        id="modalitesEvaluation"
                        value={formData.modalitesEvaluation}
                        onChange={(e) => handleChange("modalitesEvaluation", e.target.value)}
                        placeholder="Modalités d'évaluation des apprenants"
                        rows={2}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="sanctionFormation">Sanction de la formation</Label>
                      <Textarea
                        id="sanctionFormation"
                        value={formData.sanctionFormation}
                        onChange={(e) => handleChange("sanctionFormation", e.target.value)}
                        placeholder="Sanction de la formation (certificat, attestation...)"
                        rows={2}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="niveauCertification">Niveau/certification obtenue</Label>
                      <Input
                        id="niveauCertification"
                        value={formData.niveauCertification}
                        onChange={(e) => handleChange("niveauCertification", e.target.value)}
                        placeholder="Niveau ou certification obtenue"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="delaiAcceptation">Délai d'acceptation</Label>
                      <Input
                        id="delaiAcceptation"
                        value={formData.delaiAcceptation}
                        onChange={(e) => handleChange("delaiAcceptation", e.target.value)}
                        placeholder="Délai d'acceptation de la formation"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="accessibiliteHandicapee">Accessibilité handicapée</Label>
                      <Textarea
                        id="accessibiliteHandicapee"
                        value={formData.accessibiliteHandicapee}
                        onChange={(e) => handleChange("accessibiliteHandicapee", e.target.value)}
                        placeholder="Informations sur l'accessibilité aux personnes en situation de handicap"
                        rows={2}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cessationAbandon">Cessation anticipée/abandon</Label>
                      <Textarea
                        id="cessationAbandon"
                        value={formData.cessationAbandon}
                        onChange={(e) => handleChange("cessationAbandon", e.target.value)}
                        placeholder="Conditions en cas de cessation anticipée ou d'abandon"
                        rows={2}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                {formation ? "Modifier" : "Créer"} la formation
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

export default FormationForm;

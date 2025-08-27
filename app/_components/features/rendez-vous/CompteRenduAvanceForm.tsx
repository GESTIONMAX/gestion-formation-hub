"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { DialogFooter } from "../ui/dialog";
import { Loader2, FileText, Sparkles } from "lucide-react";
import { Rendezvous } from "../../_lib/hooks/useRendezvous";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface CompteRenduAvanceFormProps {
  onSubmit: (data: any) => Promise<void>;
  onClose: () => void;
  onGenerateProgramme: () => Promise<{ programmeId: string; dossierId: string }>;
  initialData: Rendezvous;
  loading: boolean;
  generationLoading: boolean;
}

export default function CompteRenduAvanceForm({
  onSubmit,
  onClose,
  onGenerateProgramme,
  initialData,
  loading,
  generationLoading,
}: CompteRenduAvanceFormProps) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      besoins: initialData.besoins || "",
      objectifs: initialData.objectifs || "",
      attentes: initialData.attentes || "",
      contexte: initialData.contexte || "",
      budget: initialData.budget || "",
      dateSouhaitee: initialData.dateSouhaitee || "",
      duree: initialData.duree || "",
      format: initialData.format || "presentiel",
      niveauInitial: initialData.niveauInitial || "",
      niveauSouhaite: initialData.niveauSouhaite || "",
      observations: initialData.observations || "",
    }
  });

  const [isValid, setIsValid] = useState(false);

  // Valider si les champs obligatoires sont remplis
  const watchedFields = watch([
    "besoins", "objectifs", "attentes", "contexte", "budget", 
    "dateSouhaitee", "duree", "format"
  ]);

  useEffect(() => {
    const allFieldsValid = watchedFields.every(field => field && field.trim() !== "");
    setIsValid(allFieldsValid);
  }, [watchedFields]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="besoins">Besoins identifiés</Label>
            <Textarea
              id="besoins"
              placeholder="Décrivez les besoins identifiés lors du rendez-vous"
              rows={4}
              {...register("besoins", { required: true })}
              className={errors.besoins ? "border-red-500" : ""}
            />
            {errors.besoins && (
              <p className="text-sm text-red-500">Ce champ est requis</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="objectifs">Objectifs de formation</Label>
            <Textarea
              id="objectifs"
              placeholder="Décrivez les objectifs de la formation"
              rows={4}
              {...register("objectifs", { required: true })}
              className={errors.objectifs ? "border-red-500" : ""}
            />
            {errors.objectifs && (
              <p className="text-sm text-red-500">Ce champ est requis</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="attentes">Attentes spécifiques</Label>
            <Textarea
              id="attentes"
              placeholder="Précisez les attentes spécifiques du bénéficiaire"
              rows={3}
              {...register("attentes", { required: true })}
              className={errors.attentes ? "border-red-500" : ""}
            />
            {errors.attentes && (
              <p className="text-sm text-red-500">Ce champ est requis</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contexte">Contexte professionnel</Label>
            <Textarea
              id="contexte"
              placeholder="Décrivez le contexte professionnel"
              rows={3}
              {...register("contexte", { required: true })}
              className={errors.contexte ? "border-red-500" : ""}
            />
            {errors.contexte && (
              <p className="text-sm text-red-500">Ce champ est requis</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="budget">Budget estimé</Label>
            <Input
              id="budget"
              placeholder="Ex: 1500 €"
              {...register("budget", { required: true })}
              className={errors.budget ? "border-red-500" : ""}
            />
            {errors.budget && (
              <p className="text-sm text-red-500">Ce champ est requis</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dateSouhaitee">Date souhaitée</Label>
            <Input
              id="dateSouhaitee"
              type="text"
              placeholder="Ex: Septembre 2025"
              {...register("dateSouhaitee", { required: true })}
              className={errors.dateSouhaitee ? "border-red-500" : ""}
            />
            {errors.dateSouhaitee && (
              <p className="text-sm text-red-500">Ce champ est requis</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="duree">Durée envisagée</Label>
            <Input
              id="duree"
              placeholder="Ex: 3 jours"
              {...register("duree", { required: true })}
              className={errors.duree ? "border-red-500" : ""}
            />
            {errors.duree && (
              <p className="text-sm text-red-500">Ce champ est requis</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="format">Format de formation</Label>
            <Select
              defaultValue={initialData.format || "presentiel"}
              onValueChange={(value) => setValue("format", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="presentiel">Présentiel</SelectItem>
                <SelectItem value="distanciel">Distanciel</SelectItem>
                <SelectItem value="hybride">Hybride</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="niveauInitial">Niveau initial</Label>
            <Input
              id="niveauInitial"
              placeholder="Ex: Débutant"
              {...register("niveauInitial")}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="niveauSouhaite">Niveau souhaité</Label>
            <Input
              id="niveauSouhaite"
              placeholder="Ex: Intermédiaire"
              {...register("niveauSouhaite")}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="observations">Observations complémentaires</Label>
          <Textarea
            id="observations"
            placeholder="Ajoutez toutes observations complémentaires utiles"
            rows={3}
            {...register("observations")}
          />
        </div>
      </div>
      
      <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={loading || generationLoading}
        >
          Annuler
        </Button>
        <Button
          type="submit"
          disabled={!isValid || loading || generationLoading}
          className="gap-2"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          <FileText className="h-4 w-4" />
          Enregistrer
        </Button>
        <Button
          type="button"
          disabled={!isValid || loading || generationLoading}
          className="gap-2"
          onClick={() => onGenerateProgramme()}
        >
          {generationLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          <Sparkles className="h-4 w-4" />
          Générer programme
        </Button>
      </DialogFooter>
    </form>
  );
}

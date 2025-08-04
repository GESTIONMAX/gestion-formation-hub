import { FileDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Formation } from "./types";
import { Badge } from "@/components/ui/badge";

interface FormationDetailsModalProps {
  formation: Formation | null;
  isOpen: boolean;
  onClose: () => void;
}

const FormationDetailsModal = ({ formation, isOpen, onClose }: FormationDetailsModalProps) => {
  if (!formation) return null;

  // Dans un cas réel, ceci serait dynamique et pointerait vers un vrai PDF
  const programmeUrl = `/programmes/${formation.id}-programme.pdf`;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4 mb-4">
          <div className="flex items-start justify-between">
            <DialogTitle className="text-2xl text-blue-900">{formation.titre}</DialogTitle>
            <DialogClose className="h-8 w-8 rounded-full hover:bg-gray-100 flex items-center justify-center">
              <X className="h-4 w-4" />
            </DialogClose>
          </div>
          <DialogDescription className="text-base mt-2">{formation.description}</DialogDescription>
          <div className="flex items-center gap-3 mt-3 text-xs bg-gray-50 p-2 rounded">
            <span className="font-medium text-gray-600">Version: 2.1</span>
            <span className="text-gray-500">•</span>
            <span className="font-medium text-gray-600">Mise à jour: 04/08/2025</span>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Colonne gauche */}
          <div className="md:col-span-2">
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3 text-blue-800">Programme détaillé</h3>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium mb-2">Module 1: Introduction</h4>
                <ul className="list-disc list-inside mb-4 text-sm text-gray-700 space-y-1">
                  <li>Présentation des concepts fondamentaux</li>
                  <li>Contexte et enjeux</li>
                  <li>Méthodologie et bonnes pratiques</li>
                </ul>
                
                <h4 className="font-medium mb-2">Module 2: Mise en pratique</h4>
                <ul className="list-disc list-inside mb-4 text-sm text-gray-700 space-y-1">
                  <li>Application des concepts théoriques</li>
                  <li>Études de cas concrets</li>
                  <li>Exercices pratiques guidés</li>
                </ul>
                
                <h4 className="font-medium mb-2">Module 3: Perfectionnement</h4>
                <ul className="list-disc list-inside mb-4 text-sm text-gray-700 space-y-1">
                  <li>Techniques avancées</li>
                  <li>Optimisation et performance</li>
                  <li>Intégration dans un environnement professionnel</li>
                </ul>
                
                <h4 className="font-medium mb-2">Évaluation et certification</h4>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  <li>Quiz et tests de connaissances</li>
                  <li>Projet pratique de validation</li>
                  <li>Certification finale</li>
                </ul>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3 text-blue-800">Objectifs pédagogiques</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="mb-3 text-sm text-gray-700">À l'issue de cette formation, vous serez capable de :</p>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                  {formation.objectifs.map((objectif, index) => (
                    <li key={index}>{objectif}</li>
                  ))}
                  <li>Mettre en place une stratégie personnalisée</li>
                  <li>Évaluer et optimiser les performances</li>
                  <li>Résoudre des problématiques complexes du domaine</li>
                </ul>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3 text-blue-800">Méthodes pédagogiques</h3>
              <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-700 space-y-3">
                <p>
                  <span className="font-medium">Approche théorique :</span> Présentations dynamiques, discussions de groupe et études de cas.
                </p>
                <p>
                  <span className="font-medium">Mise en pratique :</span> Exercices guidés, travaux pratiques et projets concrets.
                </p>
                <p>
                  <span className="font-medium">Évaluation continue :</span> Quiz réguliers, feedback personnalisé et évaluation finale.
                </p>
              </div>
            </div>
          </div>
          
          {/* Colonne droite */}
          <div>
            <div className="bg-white border rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-3 text-gray-900">Informations clés</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Niveau</p>
                  <p className="font-medium">{formation.niveau}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Durée</p>
                  <p className="font-medium">{formation.duree}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Modalité</p>
                  <p className="font-medium">{formation.modalites}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Participants</p>
                  <p className="font-medium">{formation.participants}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Prérequis</p>
                  <p className="font-medium">{formation.prerequis}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Prix</p>
                  <p className="font-bold text-blue-600">{formation.prix}</p>
                  <p className="text-xs text-gray-500">Net de taxes</p>
                </div>
              </div>
            </div>
            
            {/* Indicateurs de performance */}
            <div className="bg-white border rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-3 text-gray-900">Indicateurs de performance</h3>
              
              <div className="space-y-3">
                {formation.tauxParticipation && (
                  <div>
                    <p className="text-sm text-gray-500">Taux de participation</p>
                    <p className="font-bold text-blue-700">{formation.tauxParticipation}</p>
                  </div>
                )}
                
                {formation.tauxReussite && (
                  <div>
                    <p className="text-sm text-gray-500">Taux de réussite</p>
                    <p className="font-bold text-green-700">{formation.tauxReussite}</p>
                  </div>
                )}
                
                <div>
                  <p className="text-sm text-gray-500">Satisfaction globale</p>
                  <p className="font-bold text-amber-600">4,8/5</p>
                </div>
              </div>
            </div>
            
            {/* Certification */}
            <div className="bg-white border border-green-100 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-gray-900">Certification</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
                  Éligible CPF
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                  Certification reconnue
                </Badge>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="mt-8 pt-4 border-t flex flex-col sm:flex-row gap-4">
          <p className="text-sm text-gray-500 sm:mr-auto">
            <span className="font-semibold">Information réglementaire :</span> Ce programme est fourni conformément aux exigences de la certification Qualiopi.
          </p>
          <Button 
            className="flex items-center gap-2" 
            variant="outline" 
            onClick={() => window.open(programmeUrl, '_blank')}
          >
            <FileDown className="h-4 w-4" />
            Télécharger le programme complet (PDF)
          </Button>
          <Button onClick={onClose}>Fermer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FormationDetailsModal;

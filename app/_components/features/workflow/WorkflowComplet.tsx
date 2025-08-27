import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { apiClient } from '@/lib/api/client';
import { Loader2, CheckCircle, FileText, FileSpreadsheet, Download } from 'lucide-react';
import { useToast } from '@/lib/hooks/use-toast';

interface Rendezvous {
  id: string;
  type: string;
  nom: string;
  prenom: string;
  email: string;
  objectifs?: string[];
  niveau?: string;
  formationTitre?: string;
}

interface Module {
  titre: string;
  duree: number;
  contenu?: string;
  objectifs?: string[];
}

interface Programme {
  id: string;
  titre: string;
  description?: string;
  modules?: Module[];
}

interface WorkflowCompletProps {
  rendezvous?: Rendezvous;
  programme?: Programme;
  onComplete?: () => void;
  onCancel?: () => void;
}

export default function WorkflowComplet({ 
  rendezvous, 
  programme: initialProgramme,
  onComplete,
  onCancel
}: WorkflowCompletProps) {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(rendezvous ? 1 : programme ? 2 : 1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [programme, setProgramme] = useState<Programme | undefined>(initialProgramme);
  const [dossier, setDossier] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);

  // Formulaire de programme
  const [programmeForm, setProgrammeForm] = useState({
    titre: programme?.titre || '',
    description: programme?.description || '',
    modules: programme?.modules || [{ titre: 'Module 1', duree: 7, contenu: '' }]
  });

  // Formulaire de dossier
  const [dossierForm, setDossierForm] = useState({
    numeroDossier: `DF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    apprenantNom: rendezvous?.nom || '',
    apprenantPrenom: rendezvous?.prenom || '',
    apprenantEmail: rendezvous?.email || '',
    dateDebut: '',
    dateFin: '',
    formateur: '',
    notesFormateur: ''
  });

  // Étape 1: Créer un programme à partir d'un rendez-vous
  const createProgramme = async () => {
    if (!rendezvous && !programmeForm.titre) {
      toast({
        title: "Information manquante",
        description: "Veuillez remplir au moins le titre du programme",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      let response;
      
      if (rendezvous) {
        // Créer à partir d'un RDV
        response = await apiClient.post<{data: Programme}>('/api/programmes/from-rendezvous', {
          rendezvousId: rendezvous.id,
          titre: programmeForm.titre || undefined,
          description: programmeForm.description || undefined,
          modules: programmeForm.modules?.length ? programmeForm.modules : undefined,
          options: {
            copierObjectifs: true,
            copierNiveau: true,
            personnaliser: true
          }
        });
      } else {
        // Créer un programme manuellement
        response = await apiClient.post<{data: Programme}>('/api/programmes', {
          titre: programmeForm.titre,
          description: programmeForm.description,
          type: 'sur-mesure',
          public: 'Tous niveaux',
          duree: programmeForm.modules?.reduce((sum, m) => sum + m.duree, 0) || 7,
          estPublic: false,
          estActif: true,
          modules: programmeForm.modules
        });
      }
      
      const { data: nouveauProgramme } = response;
      setProgramme(nouveauProgramme);
      
      toast({
        title: "Programme créé",
        description: "Le programme a été créé avec succès"
      });
      
      setCurrentStep(2);
    } catch (error) {
      console.error('Erreur lors de la création du programme:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création du programme",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Étape 2: Créer un dossier à partir du programme
  const createDossier = async () => {
    if (!programme?.id) {
      toast({
        title: "Programme manquant",
        description: "Un programme est nécessaire pour créer un dossier",
        variant: "destructive"
      });
      return;
    }

    if (!dossierForm.numeroDossier) {
      toast({
        title: "Numéro de dossier manquant",
        description: "Veuillez saisir un numéro de dossier",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const response = await apiClient.post<{data: any}>('/api/dossiers-formation/from-programme', {
        programmeId: programme.id,
        apprenantNom: dossierForm.apprenantNom,
        apprenantPrenom: dossierForm.apprenantPrenom,
        apprenantEmail: dossierForm.apprenantEmail,
        numeroDossier: dossierForm.numeroDossier,
        statut: 'cree',
        dateDebut: dossierForm.dateDebut ? new Date(dossierForm.dateDebut).toISOString() : undefined,
        dateFin: dossierForm.dateFin ? new Date(dossierForm.dateFin).toISOString() : undefined,
        formateur: dossierForm.formateur || undefined,
        notesFormateur: dossierForm.notesFormateur || undefined
      });
      
      const { data: nouveauDossier } = response;
      setDossier(nouveauDossier);
      
      toast({
        title: "Dossier créé",
        description: `Le dossier ${nouveauDossier.numeroDossier} a été créé avec succès`
      });
      
      setCurrentStep(3);
    } catch (error) {
      console.error('Erreur lors de la création du dossier:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création du dossier",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Étape 3: Générer les documents pour le dossier
  const generateDocuments = async () => {
    if (!dossier?.id) {
      toast({
        title: "Dossier manquant",
        description: "Un dossier est nécessaire pour générer des documents",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const response = await apiClient.post<{data: any[]}>('/api/documents/generate-batch', {
        dossierId: dossier.id,
        documentTypes: ['tous'],
        options: {
          forceRegenerate: false,
          downloadFiles: true
        }
      });
      
      const { data: documentsGeneres } = response;
      setDocuments(documentsGeneres || []);
      
      toast({
        title: "Documents générés",
        description: `${documentsGeneres.length} documents ont été générés avec succès`
      });
      
      setCurrentStep(4);
    } catch (error) {
      console.error('Erreur lors de la génération des documents:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la génération des documents",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Rendu des différentes étapes
  const renderProgrammeStep = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Création du programme de formation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {rendezvous && (
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h3 className="font-medium text-blue-800">Détails du rendez-vous</h3>
            <p className="text-sm text-blue-700">
              {rendezvous.type} pour {rendezvous.nom} {rendezvous.prenom}
              {rendezvous.formationTitre && ` - Formation: ${rendezvous.formationTitre}`}
            </p>
            {rendezvous.objectifs?.length && (
              <div className="mt-2">
                <h4 className="text-sm font-medium text-blue-800">Objectifs:</h4>
                <ul className="text-sm text-blue-700">
                  {rendezvous.objectifs.map((obj, i) => (
                    <li key={i}>• {obj}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Titre du programme *
            </label>
            <input
              className="w-full p-2 border rounded"
              value={programmeForm.titre}
              onChange={(e) => setProgrammeForm({...programmeForm, titre: e.target.value})}
              placeholder="Titre du programme de formation"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Description
            </label>
            <textarea
              className="w-full p-2 border rounded"
              rows={3}
              value={programmeForm.description}
              onChange={(e) => setProgrammeForm({...programmeForm, description: e.target.value})}
              placeholder="Description du programme"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium mb-2">
              Modules
            </label>
            
            {programmeForm.modules.map((module, index) => (
              <div key={index} className="border p-3 rounded mb-2">
                <div className="flex justify-between mb-2">
                  <h4 className="font-medium">Module {index + 1}</h4>
                  {programmeForm.modules.length > 1 && (
                    <button
                      type="button"
                      className="text-red-500 text-sm"
                      onClick={() => {
                        const newModules = [...programmeForm.modules];
                        newModules.splice(index, 1);
                        setProgrammeForm({...programmeForm, modules: newModules});
                      }}
                    >
                      Supprimer
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  <input
                    className="w-full p-2 border rounded"
                    value={module.titre}
                    onChange={(e) => {
                      const newModules = [...programmeForm.modules];
                      newModules[index].titre = e.target.value;
                      setProgrammeForm({...programmeForm, modules: newModules});
                    }}
                    placeholder="Titre du module"
                  />
                  
                  <div className="flex gap-2 items-center">
                    <label className="whitespace-nowrap">Durée (heures):</label>
                    <input
                      type="number"
                      className="w-20 p-2 border rounded"
                      value={module.duree}
                      min="1"
                      onChange={(e) => {
                        const newModules = [...programmeForm.modules];
                        newModules[index].duree = parseInt(e.target.value) || 1;
                        setProgrammeForm({...programmeForm, modules: newModules});
                      }}
                    />
                  </div>
                  
                  <textarea
                    className="w-full p-2 border rounded"
                    rows={2}
                    value={module.contenu || ''}
                    onChange={(e) => {
                      const newModules = [...programmeForm.modules];
                      newModules[index].contenu = e.target.value;
                      setProgrammeForm({...programmeForm, modules: newModules});
                    }}
                    placeholder="Contenu du module"
                  />
                </div>
              </div>
            ))}
            
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-2"
              onClick={() => {
                setProgrammeForm({
                  ...programmeForm,
                  modules: [...programmeForm.modules, { 
                    titre: `Module ${programmeForm.modules.length + 1}`, 
                    duree: 3,
                    contenu: ''
                  }]
                });
              }}
            >
              + Ajouter un module
            </Button>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button onClick={createProgramme} disabled={isProcessing} className="flex-1">
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Création en cours...
              </>
            ) : "Créer le programme"}
          </Button>
          {onCancel && (
            <Button variant="outline" onClick={onCancel}>
              Annuler
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderDossierStep = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5" />
          Création du dossier de formation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-green-700">
            <CheckCircle className="h-4 w-4" />
            <span className="font-medium">Programme "{programme?.titre}" créé avec succès</span>
          </div>
          <p className="text-sm text-green-600 mt-1">
            {programme?.modules?.length || 0} modules, {programme?.modules?.reduce((sum, m) => sum + m.duree, 0) || 0} heures de formation
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Numéro de dossier *
            </label>
            <input
              className="w-full p-2 border rounded"
              value={dossierForm.numeroDossier}
              onChange={(e) => setDossierForm({...dossierForm, numeroDossier: e.target.value})}
              placeholder="Numéro du dossier (ex: numéro de devis)"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Nom de l'apprenant *
              </label>
              <input
                className="w-full p-2 border rounded"
                value={dossierForm.apprenantNom}
                onChange={(e) => setDossierForm({...dossierForm, apprenantNom: e.target.value})}
                placeholder="Nom de l'apprenant"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Prénom de l'apprenant
              </label>
              <input
                className="w-full p-2 border rounded"
                value={dossierForm.apprenantPrenom}
                onChange={(e) => setDossierForm({...dossierForm, apprenantPrenom: e.target.value})}
                placeholder="Prénom de l'apprenant"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Email de l'apprenant
            </label>
            <input
              className="w-full p-2 border rounded"
              type="email"
              value={dossierForm.apprenantEmail}
              onChange={(e) => setDossierForm({...dossierForm, apprenantEmail: e.target.value})}
              placeholder="Email de l'apprenant"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Date de début
              </label>
              <input
                className="w-full p-2 border rounded"
                type="date"
                value={dossierForm.dateDebut}
                onChange={(e) => setDossierForm({...dossierForm, dateDebut: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Date de fin
              </label>
              <input
                className="w-full p-2 border rounded"
                type="date"
                value={dossierForm.dateFin}
                onChange={(e) => setDossierForm({...dossierForm, dateFin: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Formateur
            </label>
            <input
              className="w-full p-2 border rounded"
              value={dossierForm.formateur}
              onChange={(e) => setDossierForm({...dossierForm, formateur: e.target.value})}
              placeholder="Nom du formateur"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Notes du formateur
            </label>
            <textarea
              className="w-full p-2 border rounded"
              rows={3}
              value={dossierForm.notesFormateur}
              onChange={(e) => setDossierForm({...dossierForm, notesFormateur: e.target.value})}
              placeholder="Notes ou observations particulières"
            />
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button onClick={createDossier} disabled={isProcessing} className="flex-1">
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Création en cours...
              </>
            ) : "Créer le dossier"}
          </Button>
          <Button variant="outline" onClick={() => setCurrentStep(1)}>
            Retour
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderDocumentsStep = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Génération des documents
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-green-50 p-4 rounded-lg space-y-2">
          <div className="flex items-center gap-2 text-green-700">
            <CheckCircle className="h-4 w-4" />
            <span className="font-medium">Programme créé</span>
          </div>
          <div className="flex items-center gap-2 text-green-700">
            <CheckCircle className="h-4 w-4" />
            <span className="font-medium">
              Dossier "{dossier?.numeroDossier}" créé pour {dossier?.apprenant?.nom} {dossier?.apprenant?.prenom}
            </span>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Documents qui seront générés :</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Convention de formation</li>
            <li>• Programme de formation détaillé</li>
            <li>• Feuille d'émargement</li>
            <li>• Devis</li>
            <li>• Évaluation satisfaction</li>
          </ul>
        </div>

        <div className="flex gap-4 pt-4">
          <Button onClick={generateDocuments} disabled={isProcessing} className="flex-1">
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Génération en cours...
              </>
            ) : "Générer les documents"}
          </Button>
          <Button variant="outline" onClick={() => setCurrentStep(2)}>
            Retour
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderCompleteStep = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-700">
          <CheckCircle className="h-5 w-5" />
          Workflow terminé avec succès !
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle className="h-4 w-4" />
              <span className="font-medium">Programme créé</span>
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle className="h-4 w-4" />
              <span className="font-medium">Dossier de formation créé</span>
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle className="h-4 w-4" />
              <span className="font-medium">
                {documents.length} documents générés
              </span>
            </div>
          </div>
        </div>

        {documents.length > 0 && (
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Type</th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Fichier</th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {documents.map((doc, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="py-2 px-4 text-sm text-gray-700">{doc.typeDocument}</td>
                    <td className="py-2 px-4 text-sm text-gray-700">{doc.nomFichier}</td>
                    <td className="py-2 px-4 text-sm">
                      <Button size="sm" variant="ghost" className="h-8 px-2">
                        <Download className="h-4 w-4 mr-1" />
                        Télécharger
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex gap-4 pt-4">
          {onComplete ? (
            <Button onClick={onComplete} className="flex-1">
              Terminer
            </Button>
          ) : (
            <Button onClick={() => window.location.reload()} className="flex-1">
              Nouveau workflow
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  // Indicateur de progression
  const renderProgressBar = () => (
    <div className="mb-8">
      {/* Indicateur de progression */}
      <div className="flex items-center justify-center space-x-4">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step < currentStep ? 'bg-green-500 text-white' :
              step === currentStep ? 'bg-blue-500 text-white' :
              'bg-gray-200 text-gray-600'
            }`}>
              {step < currentStep ? <CheckCircle className="h-4 w-4" /> : step}
            </div>
            {step < 4 && (
              <div className={`w-12 h-1 ${
                step < currentStep ? 'bg-green-500' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Légende */}
      <div className="text-center text-sm text-gray-600 mt-2">
        <div className="flex justify-between max-w-md mx-auto">
          <span className={currentStep >= 1 ? 'text-green-600 font-medium' : ''}>Programme</span>
          <span className={currentStep >= 2 ? 'text-green-600 font-medium' : ''}>Dossier</span>
          <span className={currentStep >= 3 ? 'text-green-600 font-medium' : ''}>Documents</span>
          <span className={currentStep >= 4 ? 'text-green-600 font-medium' : ''}>Terminé</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      {renderProgressBar()}
      
      {currentStep === 1 && renderProgrammeStep()}
      {currentStep === 2 && renderDossierStep()}
      {currentStep === 3 && renderDocumentsStep()}
      {currentStep === 4 && renderCompleteStep()}
    </div>
  );
}

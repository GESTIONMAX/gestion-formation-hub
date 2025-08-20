"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProgrammesFormation } from '@/hooks/useProgrammesFormation';
import { ProgrammeFormation } from '@/types/programme';
import { Loader2, Plus, Copy, Check, X, FileEdit, Trash } from 'lucide-react';
import { ProgrammeFormationModal } from '@/components/programmes/ProgrammeFormationModal';

/**
 * @description Composant de gestion des programmes de formation catalogue
 * Conforme aux exigences Qualiopi pour l'affichage des informations légales
 */
export const ProgrammesCatalogue = () => {
  // États locaux
  const [selectedTab, setSelectedTab] = useState<string>('tous');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedProgramme, setSelectedProgramme] = useState<ProgrammeFormation | null>(null);
  
  // Utilisation du hook documenté
  const {
    programmes,
    loading,
    categories,
    createProgramme,
    updateProgramme,
    deleteProgramme,
    duplicateProgramme,
    updateProgrammeStatus,
    getProgrammesByType,
    getProgrammesByCategorie
  } = useProgrammesFormation();
  
  // Filtrer pour n'obtenir que les programmes de type catalogue
  const programmesCatalogue = getProgrammesByType("catalogue");
  
  // Gestionnaires d'événements
  const handleCreateNew = () => {
    setSelectedProgramme(null);
    setModalOpen(true);
  };
  
  const handleEdit = (programme: ProgrammeFormation) => {
    setSelectedProgramme(programme);
    setModalOpen(true);
  };
  
  const handleDuplicate = async (programme: ProgrammeFormation) => {
    try {
      // Dupliquer en conservant le même type (catalogue)
      await duplicateProgramme(programme.id, {
        titre: `${programme.titre} (copie)`,
        type: "catalogue"
      });
    } catch (error) {
      console.error("Erreur lors de la duplication:", error);
    }
  };
  
  const handleToggleStatus = async (programme: ProgrammeFormation) => {
    try {
      await updateProgrammeStatus(programme.id, { estActif: !programme.estActif });
    } catch (error) {
      console.error("Erreur lors du changement de statut:", error);
    }
  };
  
  const handleDelete = async (programmeId: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce programme ?")) {
      try {
        await deleteProgramme(programmeId);
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
      }
    }
  };
  
  const handleSaveProgram = async (programmeData: Partial<ProgrammeFormation>) => {
    try {
      if (selectedProgramme) {
        // Mise à jour
        await updateProgramme(selectedProgramme.id, programmeData);
      } else {
        // Création
        await createProgramme({
          ...programmeData as Omit<ProgrammeFormation, 'id' | 'createdAt' | 'updatedAt'>,
          type: "catalogue"
        });
      }
      setModalOpen(false);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
    }
  };
  
  // Filtrage des programmes selon l'onglet sélectionné
  const filteredProgrammes = selectedTab === 'tous'
    ? programmesCatalogue
    : getProgrammesByCategorie(selectedTab);
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Programmes de Formation Catalogue</h1>
        <Button onClick={handleCreateNew} className="flex items-center gap-2">
          <Plus size={16} />
          <span>Nouveau programme</span>
        </Button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Chargement des programmes...</span>
        </div>
      ) : (
        <>
          <Tabs defaultValue="tous" value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="tous">Tous</TabsTrigger>
              {categories.map(categorie => (
                <TabsTrigger key={categorie.id} value={categorie.id}>
                  {categorie.titre || categorie.code}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value={selectedTab} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProgrammes.length > 0 ? (
                  filteredProgrammes.map(programme => (
                    <Card key={programme.id} className={`border-l-4 ${programme.estActif ? 'border-l-green-500' : 'border-l-gray-300'}`}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <Badge variant={programme.estActif ? "default" : "outline"}>
                            {programme.estActif ? "Actif" : "Inactif"}
                          </Badge>
                          <Badge variant="secondary">{programme.code}</Badge>
                        </div>
                        <CardTitle className="text-xl mt-2">{programme.titre}</CardTitle>
                        <CardDescription className="text-sm line-clamp-2">
                          {programme.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        {/* Section conforme Qualiopi avec mentions légales obligatoires */}
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="font-semibold">Durée:</span>
                            <span>{typeof programme.duree === 'number' ? `${programme.duree} heures` : programme.duree}</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="font-semibold">Tarif:</span>
                            <span>{programme.tarifIntraEntreprise ? `${programme.tarifIntraEntreprise}€ HT` : programme.prix || 'Sur demande'}</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="font-semibold">Public visé:</span>
                            <span>{programme.publicVise || programme.publicConcerne || '-'}</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="font-semibold">Prérequis:</span>
                            <span>{programme.prerequis || "Aucun"}</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="font-semibold">Modalités:</span>
                            <span>{programme.modalites}</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="font-semibold">Accessibilité:</span>
                            <span>{programme.accessibilite || programme.accessibiliteHandicap || "Formation accessible aux PSH"}</span>
                          </div>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="flex justify-between pt-2">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(programme)}>
                            <FileEdit size={16} className="mr-1" /> Modifier
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDuplicate(programme)}>
                            <Copy size={16} className="mr-1" /> Dupliquer
                          </Button>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button 
                            variant={programme.estActif ? "destructive" : "outline"} 
                            size="sm" 
                            onClick={() => handleToggleStatus(programme)}
                          >
                            {programme.estActif ? (
                              <X size={16} className="mr-1" />
                            ) : (
                              <Check size={16} className="mr-1" />
                            )}
                            {programme.estActif ? "Désactiver" : "Activer"}
                          </Button>
                          
                          <Button variant="destructive" size="sm" onClick={() => handleDelete(programme.id)}>
                            <Trash size={16} />
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-3 p-8 text-center bg-muted rounded-lg">
                    <p>Aucun programme trouvé dans cette catégorie</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
      
      {/* Modal pour création/édition de programme */}
      {modalOpen && (
        <ProgrammeFormationModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveProgram}
          programme={selectedProgramme}
          categories={categories}
          type="catalogue"
        />
      )}
    </div>
  );
};

export default ProgrammesCatalogue;

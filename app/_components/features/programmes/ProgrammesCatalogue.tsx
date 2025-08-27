"use client";

import { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useProgrammesFormation } from '../../../../app/(pages)/_lib/hooks/useProgrammesFormation';
import type { ProgrammeFormation, CategorieFormation } from '../../../../app/(pages)/_lib/types/programme';
import { toast } from 'sonner';
import { Loader2, Plus, FileEdit, Copy, Check, X, User, Link2, Trash, FileText, BookOpen, Archive } from 'lucide-react';
import { ProgrammeFormationModal } from './ProgrammeFormationModal';
import { cn } from '../../../../lib/utils';

/**
 * @description Composant de gestion des programmes de formation catalogue
 * Conforme aux exigences Qualiopi pour l'affichage des informations légales
 */
export const ProgrammesCatalogue = () => {
  // États locaux
  const [selectedTab, setSelectedTab] = useState<string>('tous');
  const [selectedType, setSelectedType] = useState<'catalogue' | 'sur-mesure'>('catalogue'); // Nouvel état pour filtrer par type
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedProgramme, setSelectedProgramme] = useState<ProgrammeFormation | null>(null);
  
  // Utilisation du hook documenté
  const {
    programmes,
    categories,
    createProgramme,
    updateProgramme,
    deleteProgramme,
    duplicateProgramme,
    updateProgrammeStatus,
    loading,
    error: apiError
  } = useProgrammesFormation();
  
  // Obtenir les programmes filtrés par type et catégorie
  const filteredProgrammes = programmes.filter(programme => {
    const matchesCategory = selectedTab === 'tous' || programme.categorieId === selectedTab;
    return matchesCategory && programme.type === selectedType;
  });
  
  // Obtenir les programmes du catalogue pour les statistiques
  const programmesCatalogue = programmes.filter(prog => prog.type === 'catalogue');
  
  // Obtenir les catégories uniques pour les onglets
  const categoriesUniques = [...new Set(programmesCatalogue.map(p => p.categorieId))];
  
  // Fonctions de filtrage
  const getProgrammesByType = (type: 'catalogue' | 'sur-mesure') => 
    programmes.filter(p => p.type === type);
    
  const getProgrammesByCategorie = (categorieId: string) =>
    programmes.filter(p => p.categorieId === categorieId);
  
  // Gestionnaires d'événements
  const handleCreateNew = () => {
    // Réinitialiser complètement l'tat
    setSelectedProgramme(null);
    
    // Forcer la fermeture puis l'ouverture du modal pour éviter des états incohérents
    setModalOpen(false);
    setTimeout(() => {
      setModalOpen(true);
    }, 50);
  };
  
  const handleEdit = (programme: ProgrammeFormation) => {
    setSelectedProgramme(programme);
    setModalOpen(true);
  };
  
  const handleDuplicate = async (programme: ProgrammeFormation) => {
    try {
      // Dupliquer en convertissant en version sur-mesure
      const dupliqueProgramme = await duplicateProgramme(programme.id, {
        titre: `${programme.titre} (copie sur-mesure)`,
        type: "sur-mesure"
      });
      
      console.log("Programme dupliqué avec succès:", dupliqueProgramme);
      
      // Sélectionner le programme dupliqué pour édition immédiate
      if (dupliqueProgramme) {
        // Force un délai pour permettre la mise à jour des données avant de basculer
        setTimeout(() => {
          // Basculer vers le type Sur-mesure
          setSelectedType("sur-mesure");
          setSelectedTab("tous"); // Réinitialiser le filtrage par catégorie
          
          // Sélectionner le nouveau programme pour édition
          setSelectedProgramme(dupliqueProgramme);
          
          // Ouvrir le modal d'édition avec un petit délai pour garantir le rendu
          setTimeout(() => {
            setModalOpen(true);
          }, 100);
        }, 200); // Délai suffisant pour garantir le rafraîchissement de l'interface
      }
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
  
  const handleCreateProgramme = async (data: Omit<ProgrammeFormation, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await createProgramme({
        ...data,
        type: 'catalogue',
        estActif: true,
        prix: data.prix || 0,
        duree: data.duree || '1 jour',
        objectifsSpecifiques: data.objectifsSpecifiques || '',
        prerequis: data.prerequis || '',
        accessibiliteHandicap: data.accessibiliteHandicap || ''
      });
      toast.success('Programme créé avec succès');
      setModalOpen(false);
    } catch (error) {
      console.error('Erreur lors de la création du programme:', error);
      toast.error('Erreur lors de la création du programme');
    }
  };
  
  // Grouper les programmes par catégorie pour les onglets
  const categoriesWithProgrammes = categories.map(categorie => ({
    ...categorie,
    count: programmes.filter(p => p.categorieId === categorie.id).length
  }));
  
  // Fonction utilitaire pour formater la durée
  const formatDuree = (duree: string | number | undefined): string => {
    if (!duree) return 'Non spécifiée';
    if (typeof duree === 'number') return `${duree} heures`;
    return duree;
  };

  // Rendu d'une carte de programme
  const renderProgrammeCard = (programme: ProgrammeFormation) => (
    <Card key={programme.id} className="mb-4">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{programme.titre}</CardTitle>
            <CardDescription>{programme.description}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge variant={programme.estActif ? 'default' : 'secondary'}>
              {programme.estActif ? 'Actif' : 'Inactif'}
            </Badge>
            {programme.type === 'sur-mesure' && (
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                Sur-mesure
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Type</p>
            <p className="text-sm text-muted-foreground">
              {programme.type === 'catalogue' ? 'Catalogue' : 'Sur-mesure'}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Prix</p>
            <p className="text-sm text-muted-foreground">
              {programme.prix ? `${programme.prix} €` : 'Sur devis'}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Public visé</p>
            <p className="text-sm text-muted-foreground">
              {programme.publicCible || 'Non spécifié'}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Accessibilité</p>
            <p className="text-sm text-muted-foreground">
              {programme.accessibiliteHandicap || 'Non spécifiée'}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Durée</p>
            <p className="text-sm text-muted-foreground">
              {formatDuree(programme.duree)}
            </p>
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
  );

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Programmes de formation</h2>
        <Button onClick={handleCreateNew} className="flex items-center gap-2">
          <Plus size={16} />
          <span>Créer un nouveau programme</span>
        </Button>
      </div>
      
      <Tabs 
        value={selectedType} 
        onValueChange={(value) => setSelectedType(value as 'catalogue' | 'sur-mesure')}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="catalogue">Catalogue</TabsTrigger>
          <TabsTrigger value="sur-mesure">Sur-mesure</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedType} className="space-y-4">
          {/* Filtres par catégorie */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Button
              variant={selectedTab === 'tous' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedTab('tous')}
            >
              Tous
            </Button>
            {categoriesWithProgrammes.map(categorie => (
              <Button
                key={categorie.id}
                variant={selectedTab === categorie.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTab(categorie.id)}
              >
                {categorie.nom || categorie.titre} ({categorie.count})
              </Button>
            ))}
          </div>

          {/* Liste des programmes */}
          {filteredProgrammes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProgrammes.map(programme => renderProgrammeCard(programme))}
            </div>
          ) : (
            <div className="col-span-3 p-8 flex flex-col items-center justify-center bg-muted/50 rounded-lg border-2 border-dashed border-muted-foreground/20 min-h-[300px] text-center">
              {selectedType === 'catalogue' ? (
                <EmptyState
                  icon={<BookOpen size={50} />}
                  title="Aucun programme catalogue"
                  description="Votre bibliothèque de programmes catalogue est vide. Commencez par créer votre premier programme qui sera disponible dans le catalogue de formations."
                  action={
                    <Button 
                      onClick={() => {
                        setSelectedType('catalogue');
                        handleCreateNew();
                      }}
                      size="lg"
                      className="mt-4"
                    >
                      <Plus size={16} className="mr-2" /> Créer un programme catalogue
                    </Button>
                  }
                />
              ) : (
                <EmptyState
                  icon={<Archive size={50} />}
                  title="Aucun programme sur-mesure"
                  description="Votre bibliothèque de programmes sur-mesure est vide. Vous pouvez créer un programme personnalisé ou dupliquer un programme catalogue existant."
                  action={
                    <Button 
                      onClick={() => {
                        setSelectedType('sur-mesure');
                        handleCreateNew();
                      }}
                      size="lg"
                      className="mt-4"
                    >
                      <Plus size={16} className="mr-2" /> Créer un programme sur-mesure
                    </Button>
                  }
                />
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Modal pour création/édition de programme */}
      {modalOpen && (
        <ProgrammeFormationModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveProgram}
          programme={selectedProgramme}
          categories={categories}
          type={selectedProgramme ? selectedProgramme.type : selectedType}
        />
      )}
    </div>
  );
};

// Composant d'état vide amélioré avec icône, titre, description et bouton d'action
interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: React.ReactNode;
}

const EmptyState = ({ icon, title, description, action }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center space-y-4 max-w-md">
    <div className="rounded-full bg-primary/10 p-6 text-primary">
      {icon}
    </div>
    <h3 className="text-2xl font-semibold">{title}</h3>
    <p className="text-muted-foreground text-center">{description}</p>
    {action}
    <div className="text-sm text-muted-foreground mt-6 border-t border-border pt-4 w-full text-center">
      <p className="mb-2">Conseils pour démarrer :</p>
      <ul className="text-left list-disc pl-4 space-y-2 text-xs">
        <li>Un programme peut être de type <strong>catalogue</strong> (générique) ou <strong>sur-mesure</strong> (personnalisé)</li>
        <li>Utilisez le formulaire pour saisir les informations pédagogiques et légales</li>
        <li>Vous pourrez activer/désactiver vos programmes à tout moment</li>
      </ul>
    </div>
  </div>
);

export default ProgrammesCatalogue;

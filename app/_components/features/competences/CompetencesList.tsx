import { useState } from "react";
import { 
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "../../../../components/ui";
import { Plus, Edit, Trash, Eye, CheckCircle, PlusCircle, List, Grid } from "lucide-react";
import { useToast } from "./hooks/use-toast";
import { useCompetences } from "./hooks/useCompetences";

const CompetencesList = () => {
  const { competences, loading, addCompetence, updateCompetence, deleteCompetence } = useCompetences();
  const { toast } = useToast();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCompetence, setSelectedCompetence] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const handleAddCompetence = (data: any) => {
    addCompetence(data)
      .then(() => {
        toast({
          title: "Compétence ajoutée",
          description: "La compétence a été ajoutée avec succès"
        });
        setShowAddModal(false);
      })
      .catch(() => {
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de l'ajout de la compétence",
          variant: "destructive"
        });
      });
  };

  const handleUpdateCompetence = (data: any) => {
    if (!selectedCompetence) return;
    
    updateCompetence(selectedCompetence.id, data)
      .then(() => {
        toast({
          title: "Compétence mise à jour",
          description: "La compétence a été mise à jour avec succès"
        });
        setShowEditModal(false);
      })
      .catch(() => {
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la mise à jour de la compétence",
          variant: "destructive"
        });
      });
  };

  const handleDeleteCompetence = (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette compétence ?")) return;
    
    deleteCompetence(id)
      .then(() => {
        toast({
          title: "Compétence supprimée",
          description: "La compétence a été supprimée avec succès"
        });
      })
      .catch(() => {
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la suppression de la compétence",
          variant: "destructive"
        });
      });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Chargement des compétences...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Compétences</h2>
        <div className="flex gap-2">
          <div className="flex border rounded-md p-1">
            <Button 
              variant={viewMode === "list" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setViewMode("list")}
              className="px-2"
            >
              <List className="h-4 w-4 mr-1" />
              Liste
            </Button>
            <Button 
              variant={viewMode === "grid" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setViewMode("grid")}
              className="px-2"
            >
              <Grid className="h-4 w-4 mr-1" />
              Grille
            </Button>
          </div>
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle compétence
          </Button>
        </div>
      </div>

      <Tabs defaultValue="toutes" className="w-full">
        <TabsList>
          <TabsTrigger value="toutes">Toutes</TabsTrigger>
          <TabsTrigger value="techniques">Techniques</TabsTrigger>
          <TabsTrigger value="transversales">Transversales</TabsTrigger>
          <TabsTrigger value="metiers">Métiers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="toutes" className="pt-4">
          {viewMode === "list" ? (
            <div className="space-y-4">
              {competences.length > 0 ? (
                competences.map((competence: any) => (
                  <Card key={competence.id} className="overflow-hidden">
                    <div className="flex justify-between items-start p-4">
                      <div>
                        <h3 className="text-lg font-bold">{competence.nom}</h3>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline">{competence.categorie}</Badge>
                          {competence.niveau && <Badge>{competence.niveau}</Badge>}
                        </div>
                        <p className="text-sm mt-2 text-gray-600">{competence.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => {
                            setSelectedCompetence(competence);
                            setShowEditModal(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteCompetence(competence.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-10 border rounded-lg">
                  <p className="text-gray-500">Aucune compétence trouvée</p>
                  <Button onClick={() => setShowAddModal(true)} className="mt-4" variant="outline">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Ajouter une compétence
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {competences.length > 0 ? (
                competences.map((competence: any) => (
                  <Card key={competence.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{competence.nom}</CardTitle>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => {
                              setSelectedCompetence(competence);
                              setShowEditModal(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteCompetence(competence.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2 mb-2">
                        <Badge variant="outline">{competence.categorie}</Badge>
                        {competence.niveau && <Badge>{competence.niveau}</Badge>}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{competence.description}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 text-center py-10 border rounded-lg">
                  <p className="text-gray-500">Aucune compétence trouvée</p>
                  <Button onClick={() => setShowAddModal(true)} className="mt-4" variant="outline">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Ajouter une compétence
                  </Button>
                </div>
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="techniques" className="pt-4">
          <div className="text-center py-10">
            Filtrer par compétences techniques (à implémenter)
          </div>
        </TabsContent>
        
        <TabsContent value="transversales" className="pt-4">
          <div className="text-center py-10">
            Filtrer par compétences transversales (à implémenter)
          </div>
        </TabsContent>
        
        <TabsContent value="metiers" className="pt-4">
          <div className="text-center py-10">
            Filtrer par compétences métiers (à implémenter)
          </div>
        </TabsContent>
      </Tabs>

      {/* Modals pour ajouter/éditer des compétences */}
      {showAddModal && (
        <CompetenceForm 
          onSubmit={handleAddCompetence}
          onClose={() => setShowAddModal(false)}
        />
      )}
      
      {showEditModal && selectedCompetence && (
        <CompetenceForm 
          onSubmit={handleUpdateCompetence}
          initialData={selectedCompetence}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
};

// Composant temporaire de formulaire pour les compétences
const CompetenceForm = ({ onSubmit, initialData, onClose }: { onSubmit: (data: any) => void, initialData?: any, onClose: () => void }) => {
  const [formData, setFormData] = useState({
    nom: initialData?.nom || "",
    description: initialData?.description || "",
    categorie: initialData?.categorie || "technique",
    niveau: initialData?.niveau || "débutant"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Modifier la compétence" : "Ajouter une compétence"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="nom" className="text-sm font-medium">Nom</label>
            <input
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-md min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="categorie" className="text-sm font-medium">Catégorie</label>
            <select
              id="categorie"
              name="categorie"
              value={formData.categorie}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="technique">Technique</option>
              <option value="transversale">Transversale</option>
              <option value="metier">Métier</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="niveau" className="text-sm font-medium">Niveau</label>
            <select
              id="niveau"
              name="niveau"
              value={formData.niveau}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="débutant">Débutant</option>
              <option value="intermédiaire">Intermédiaire</option>
              <option value="avancé">Avancé</option>
              <option value="expert">Expert</option>
            </select>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              {initialData ? "Mettre à jour" : "Ajouter"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CompetencesList;

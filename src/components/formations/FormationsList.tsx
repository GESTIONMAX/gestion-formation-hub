import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Eye, Clock, Users, BookOpen, Info, GitBranch, Calendar, Download, Archive, FileText } from "lucide-react";
import { useProgrammesFormation, ProgrammeFormation } from "@/hooks/useProgrammesFormation";
import { useToast } from "@/hooks/use-toast";
import ProgrammeForm from "./ProgrammeForm";
import FormationDetail from "./FormationDetail";
import MentionsLegales from "./MentionsLegales";
import { generateFormationPDF } from "@/utils/pdfGenerator";

const FormationsList = () => {
  const { programmes, loading, createProgramme, updateProgramme, deleteProgramme, categories } = useProgrammesFormation();
  const { toast } = useToast();
  const [view, setView] = useState<"list" | "form" | "detail">("list");
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [editingFormation, setEditingFormation] = useState(null);
  
  // Fonction pour filtrer les programmes par type (catalogue ou sur-mesure)
  const getProgrammesByType = (type: string) => {
    return programmes?.filter((programme) => programme.type === type) || [];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleCreate = () => {
    setEditingFormation(null);
    setView("form");
  };

  const handleEdit = (formation: any) => {
    setEditingFormation(formation);
    setView("form");
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProgramme(id);
      toast({
        title: "Programme supprimé",
        description: "Le programme a été supprimé avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le programme.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (formData: any) => {
    try {
      if (editingFormation) {
        await updateProgramme(editingFormation.id, formData);
        toast({
          title: "Programme modifié",
          description: "Le programme a été modifié avec succès.",
        });
      } else {
        await createProgramme(formData);
        toast({
          title: "Programme créé",
          description: "Le nouveau programme a été créé avec succès.",
        });
      }
      setView("list");
      setEditingFormation(null);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le programme.",
        variant: "destructive",
      });
    }
  };

  const handleGeneratePDF = (formation: any) => {
    generateFormationPDF(formation);
  };

  const handleViewDetail = (formation: any) => {
    setSelectedFormation(formation);
    setView("detail");
  };

  const handleBack = () => {
    setView("list");
    setSelectedFormation(null);
    setEditingFormation(null);
  };

  if (view === "form") {
    return (
      <ProgrammeForm
        programme={editingFormation}
        onSubmit={handleSubmit}
        onCancel={handleBack}
      />
    );
  }

  if (view === "detail") {
    return (
      <FormationDetail
        formation={selectedFormation}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gestion des programmes de formation</h2>
          <p className="text-gray-600">Gérez votre bibliothèque unifiée de programmes de formation</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau programme
        </Button>
      </div>

      <Tabs defaultValue="tous" className="space-y-6">
        <TabsList>
          <TabsTrigger value="tous" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Tous les programmes
          </TabsTrigger>
          <TabsTrigger value="catalogue" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Catalogue
          </TabsTrigger>
          <TabsTrigger value="sur-mesure" className="flex items-center gap-2">
            <Archive className="h-4 w-4" />
            Sur-mesure
          </TabsTrigger>
          <TabsTrigger value="mentions" className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            Mentions légales
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tous">
          {loading ? (
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-gray-500">Chargement des programmes...</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {programmes.map((programme) => (
                <Card key={programme.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{programme.pictogramme}</span>
                          <CardTitle className="text-lg">{programme.titre || programme.code || "Sans titre"}</CardTitle>
                        </div>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {programme.duree}
                          </Badge>
                          <Badge variant={programme.type === "catalogue" ? "default" : "outline"} className="flex items-center gap-1">
                            {programme.type === "catalogue" ? (
                              <FileText className="h-3 w-3" />
                            ) : (
                              <Archive className="h-3 w-3" />
                            )}
                            {programme.type === "catalogue" ? "Catalogue" : "Sur-mesure"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {programme.description || "Description non disponible"}
                    </p>
                    
                    <div className="space-y-2 mb-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>Public: {programme.publicConcerne || "Non défini"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Info className="h-3 w-3" />
                        <span>Prérequis: {programme.prerequis || "Aucun"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>Code: {programme.code}</span>
                      </div>
                      {programme.categorieId && (
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          <span>Catégorie: {programme.categorie?.titre || programme.categorieId}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewDetail(programme)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(programme)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(programme.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      {programme.programmeUrl && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleGeneratePDF(programme)}
                          className="flex items-center gap-1"
                        >
                          <Download className="h-4 w-4" />
                          PDF
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="catalogue">
          {loading ? (
            <div className="flex justify-center p-10">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : !programmes.some(programme => programme.type === "catalogue") ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-10">
                  <Archive className="mx-auto h-10 w-10 text-gray-400" />
                  <h3 className="mt-2 text-sm font-semibold">Aucun programme catalogue</h3>
                  <p className="mt-1 text-sm text-gray-500">Commencez par créer un nouveau programme.</p>
                  <div className="mt-6">
                    <Button onClick={handleCreate}>
                      <Plus className="h-4 w-4 mr-2" />
                      Nouveau programme
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {getProgrammesByType("catalogue")
                .map((programme) => (
                  <Card key={programme.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{programme.pictogramme}</span>
                            <CardTitle className="text-lg">{programme.titre || programme.code || "Sans titre"}</CardTitle>
                          </div>
                          <div className="flex items-center gap-2 mt-2 flex-wrap">
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {programme.duree}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {programme.description || "Description non disponible"}
                      </p>
                      
                      <div className="space-y-2 mb-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>Public: {programme.publicConcerne || "Non défini"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Info className="h-3 w-3" />
                          <span>Prérequis: {programme.prerequis || "Aucun"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Code: {programme.code}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewDetail(programme)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(programme)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(programme.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        {programme.programmeUrl && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleGeneratePDF(programme)}
                            className="flex items-center gap-1"
                          >
                            <Download className="h-4 w-4" />
                            PDF
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="sur-mesure">
          {loading ? (
            <div className="flex justify-center p-10">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : !programmes.some(programme => programme.type === "sur-mesure") ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-10">
                  <Archive className="mx-auto h-10 w-10 text-gray-400" />
                  <h3 className="mt-2 text-sm font-semibold">Aucun programme sur-mesure</h3>
                  <p className="mt-1 text-sm text-gray-500">Commencez par créer un nouveau programme.</p>
                  <div className="mt-6">
                    <Button onClick={handleCreate}>
                      <Plus className="h-4 w-4 mr-2" />
                      Nouveau programme
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {getProgrammesByType("sur-mesure")
                .map((programme) => (
                  <Card key={programme.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{programme.pictogramme}</span>
                            <CardTitle className="text-lg">{programme.titre || programme.code || "Sans titre"}</CardTitle>
                          </div>
                          <div className="flex items-center gap-2 mt-2 flex-wrap">
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {programme.duree}
                            </Badge>
                            {programme.beneficiaireId && (
                              <Badge variant="outline" className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {programme.beneficiaireId}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {programme.description || "Description non disponible"}
                      </p>
                      
                      <div className="space-y-2 mb-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>Public: {programme.publicConcerne || "Non défini"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Info className="h-3 w-3" />
                          <span>Prérequis: {programme.prerequis || "Aucun"}</span>
                        </div>
                        {programme.objectifsSpecifiques && (
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            <span>Objectifs spécifiques: {programme.objectifsSpecifiques}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewDetail(programme)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(programme)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(programme.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="mentions">
          <MentionsLegales />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormationsList;

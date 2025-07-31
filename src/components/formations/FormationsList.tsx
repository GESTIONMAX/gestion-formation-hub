import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Eye, Clock, Users, BookOpen, Info, GitBranch, Calendar, Download } from "lucide-react";
import { useFormations } from "@/hooks/useFormations";
import { useToast } from "@/hooks/use-toast";
import FormationForm from "./FormationForm";
import FormationDetail from "./FormationDetail";
import MentionsLegales from "./MentionsLegales";
import { generateFormationPDF } from "@/utils/pdfGenerator";

const FormationsList = () => {
  const { formations, loading, createFormation, updateFormation, deleteFormation } = useFormations();
  const { toast } = useToast();
  const [view, setView] = useState<"list" | "form" | "detail">("list");
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [editingFormation, setEditingFormation] = useState(null);

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
      await deleteFormation(id);
      toast({
        title: "Formation supprimée",
        description: "La formation a été supprimée avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la formation.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (formData: any) => {
    try {
      if (editingFormation) {
        await updateFormation(editingFormation.id, formData);
        toast({
          title: "Formation modifiée",
          description: "La formation a été modifiée avec succès.",
        });
      } else {
        await createFormation(formData);
        toast({
          title: "Formation créée",
          description: "La nouvelle formation a été créée avec succès.",
        });
      }
      setView("list");
      setEditingFormation(null);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder la formation.",
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
      <FormationForm
        formation={editingFormation}
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
          <h2 className="text-2xl font-bold">Gestion des formations</h2>
          <p className="text-gray-600">Gérez vos programmes de formation WordPress</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle formation
        </Button>
      </div>

      <Tabs defaultValue="formations" className="space-y-6">
        <TabsList>
          <TabsTrigger value="formations" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Formations
          </TabsTrigger>
          <TabsTrigger value="mentions" className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            Mentions légales
          </TabsTrigger>
        </TabsList>

        <TabsContent value="formations">
          {loading ? (
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-gray-500">Chargement des formations...</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {formations.map((formation) => (
                <Card key={formation.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{formation.code || "Code non défini"}</CardTitle>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formation.duree}
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            Formation
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {formation.objectifsPedagogiques || "Objectifs non définis"}
                    </p>
                    
                    <div className="space-y-2 mb-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>Public: {formation.publicConcerne || "Non défini"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Info className="h-3 w-3" />
                        <span>Prérequis: {formation.prerequis || "Aucun"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>Modifié le {formatDate(formation.dateModification)}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewDetail(formation)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(formation)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(formation.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleGeneratePDF(formation)}
                        className="flex items-center gap-1"
                      >
                        <Download className="h-4 w-4" />
                        PDF
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

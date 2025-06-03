
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Eye, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import FormationForm from "./FormationForm";
import FormationDetail from "./FormationDetail";
import { useFormations } from "@/hooks/useFormations";

const FormationsList = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [editingFormation, setEditingFormation] = useState(null);
  const { toast } = useToast();
  const { formations, loading, createFormation, updateFormation, deleteFormation } = useFormations();

  const handleCreate = async (formationData: any) => {
    try {
      await createFormation(formationData);
      setShowForm(false);
      toast({
        title: "Formation créée",
        description: "La formation a été créée avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = async (formationData: any) => {
    try {
      await updateFormation(editingFormation.id, formationData);
      setEditingFormation(null);
      toast({
        title: "Formation modifiée",
        description: "La formation a été modifiée avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la modification.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette formation ?")) {
      try {
        await deleteFormation(id);
        toast({
          title: "Formation supprimée",
          description: "La formation a été supprimée avec succès.",
        });
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la suppression.",
          variant: "destructive",
        });
      }
    }
  };

  if (selectedFormation) {
    return (
      <FormationDetail
        formation={selectedFormation}
        onBack={() => setSelectedFormation(null)}
      />
    );
  }

  if (showForm || editingFormation) {
    return (
      <FormationForm
        formation={editingFormation}
        onSubmit={editingFormation ? handleEdit : handleCreate}
        onCancel={() => {
          setShowForm(false);
          setEditingFormation(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Formations WordPress</h2>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nouvelle formation
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formations.map((formation) => (
            <Card key={formation.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{formation.titre}</CardTitle>
                <p className="text-sm text-gray-600">{formation.duree}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                  {formation.description}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedFormation(formation)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingFormation(formation)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(formation.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormationsList;

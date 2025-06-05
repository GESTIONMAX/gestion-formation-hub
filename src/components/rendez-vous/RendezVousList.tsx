
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Eye, Clock, CheckCircle, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import RendezVousForm from "./RendezVousForm";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RendezVousList = () => {
  const [showForm, setShowForm] = useState(false);
  const [rendezVous, setRendezVous] = useState([
    {
      id: "1",
      date: "2024-03-15T10:00:00",
      canal: "Téléphone",
      objectif: "Entretien de positionnement",
      synthese: "Bonnes bases, motivé pour apprendre WordPress",
      apprenantNom: "Marie Dubois",
      formationTitre: "WordPress pour débutants"
    }
  ]);
  const [positionnementRequests, setPositionnementRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPositionnementRequests();
  }, []);

  const fetchPositionnementRequests = async () => {
    try {
      // Utilisation d'une requête directe pour contourner le problème de types
      const { data, error } = await (supabase as any)
        .from('positionnement_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setPositionnementRequests(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les demandes de positionnement.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (id: string, newStatus: string) => {
    try {
      // Utilisation d'une requête directe pour contourner le problème de types
      const { error } = await (supabase as any)
        .from('positionnement_requests')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) {
        throw error;
      }

      // Refresh the list
      fetchPositionnementRequests();

      toast({
        title: "Statut mis à jour",
        description: "Le statut de la demande a été mis à jour avec succès.",
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'en_attente':
        return <Badge variant="outline" className="text-orange-600 border-orange-600"><Clock className="h-3 w-3 mr-1" />En attente</Badge>;
      case 'traite':
        return <Badge variant="outline" className="text-blue-600 border-blue-600"><CheckCircle className="h-3 w-3 mr-1" />Traité</Badge>;
      case 'rdv_fixe':
        return <Badge variant="outline" className="text-green-600 border-green-600"><Calendar className="h-3 w-3 mr-1" />RDV fixé</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleCreate = async (rdvData: any) => {
    try {
      const newRdv = {
        ...rdvData,
        id: Date.now().toString(),
      };
      setRendezVous(prev => [newRdv, ...prev]);
      setShowForm(false);
      toast({
        title: "Rendez-vous créé",
        description: "Le rendez-vous a été créé avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création.",
        variant: "destructive",
      });
    }
  };

  if (showForm) {
    return (
      <RendezVousForm
        onSubmit={handleCreate}
        onCancel={() => setShowForm(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Rendez-vous</h2>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nouveau rendez-vous
        </Button>
      </div>

      <Tabs defaultValue="positionnement" className="space-y-6">
        <TabsList>
          <TabsTrigger value="positionnement">Demandes de positionnement</TabsTrigger>
          <TabsTrigger value="rendez-vous">Rendez-vous planifiés</TabsTrigger>
        </TabsList>

        <TabsContent value="positionnement">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Demandes de rendez-vous de positionnement</h3>
            {loading ? (
              <p>Chargement...</p>
            ) : positionnementRequests.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-gray-500">Aucune demande de positionnement pour le moment.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {positionnementRequests.map((request: any) => (
                  <Card key={request.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{request.nom_beneficiaire} {request.prenom_beneficiaire}</CardTitle>
                        {getStatusBadge(request.status)}
                      </div>
                      <div className="text-sm text-gray-600">
                        <strong>Formation :</strong> {request.formation_selectionnee}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <p><strong>Email :</strong> {request.email}</p>
                        <p><strong>Téléphone :</strong> {request.telephone}</p>
                        {request.statut && <p><strong>Statut :</strong> {request.statut}</p>}
                        {request.experience_wordpress && (
                          <p><strong>Expérience :</strong> {request.experience_wordpress.substring(0, 50)}...</p>
                        )}
                        <p><strong>Reçu le :</strong> {new Date(request.created_at).toLocaleDateString('fr-FR')}</p>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateRequestStatus(request.id, 'traite')}
                          disabled={request.status === 'traite'}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateRequestStatus(request.id, 'rdv_fixe')}
                          disabled={request.status === 'rdv_fixe'}
                        >
                          <Calendar className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="rendez-vous">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rendezVous.map((rdv) => (
              <Card key={rdv.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{rdv.objectif}</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{rdv.canal}</Badge>
                    <Badge variant="outline">
                      {new Date(rdv.date).toLocaleDateString('fr-FR')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Apprenant:</strong> {rdv.apprenantNom}
                  </p>
                  <p className="text-sm text-gray-700 mb-4">
                    <strong>Formation:</strong> {rdv.formationTitre}
                  </p>
                  {rdv.synthese && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      <strong>Synthèse:</strong> {rdv.synthese}
                    </p>
                  )}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RendezVousList;

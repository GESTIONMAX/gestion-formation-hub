import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Eye, Clock, CheckCircle, Calendar, FileText, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import RendezVousForm from "./RendezVousForm";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkflowPositionnement from "./WorkflowPositionnement";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";

const RendezVousList = () => {
  const [showForm, setShowForm] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [rdvToEdit, setRdvToEdit] = useState(null);
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
  const navigate = useNavigate();

  useEffect(() => {
    fetchPositionnementRequests();
  }, []);

  const fetchPositionnementRequests = async () => {
    try {
      // Utilisation de l'API pour récupérer les demandes de positionnement
      const response = await api.get('/positionnement-requests');

      setPositionnementRequests(response.data);
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
      console.log(`Tentative de mise à jour du statut pour l'ID: ${id} vers ${newStatus}`);
      
      // Mise à jour du statut via l'API
      const response = await api.put(`/positionnement-requests/${id}/status`, { status: newStatus });
      
      console.log('Réponse de l\'API:', response.data);

      // Rafraîchir la liste
      fetchPositionnementRequests();

      toast({
        title: "Statut mis à jour",
        description: "Le statut de la demande a été mis à jour avec succès.",
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      // Afficher plus de détails sur l'erreur
      if (error.response) {
        console.error('Données de réponse d\'erreur:', error.response.data);
        console.error('Statut d\'erreur:', error.response.status);
      }
      
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

  const handleSubmitRdv = async (rdvData: any) => {
    try {
      if (editMode && rdvToEdit) {
        // Mise à jour d'un RDV existant
        await updateRendezVous(rdvData);
      } else {
        // Création d'un nouveau RDV
        await createRendezVous(rdvData);
      }
      
      // Réinitialiser les états et rafraîchir les données
      setShowForm(false);
      setEditMode(false);
      setRdvToEdit(null);
      // Rafraîchir les données
      fetchPositionnementRequests();
    } catch (error) {
      console.error("Erreur lors de la soumission du rendez-vous:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la soumission du rendez-vous.",
        variant: "destructive",
      });
    }
  };

  const createRendezVous = async (rdvData: any) => {
    try {
      // Création via l'API
      await api.post('/positionnement-requests', rdvData);
      
      toast({
        title: "Rendez-vous créé",
        description: "Le rendez-vous a été créé avec succès.",
      });
    } catch (error) {
      console.error("Erreur lors de la création:", error);
      throw error;
    }
  };
  
  const updateRendezVous = async (rdvData: any) => {
    if (!rdvToEdit?.id) return;
    
    try {
      // Mise à jour via l'API
      await api.put(`/positionnement-requests/${rdvToEdit.id}`, rdvData);
      
      toast({
        title: "Rendez-vous modifié",
        description: "Le rendez-vous a été mis à jour avec succès.",
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      throw error;
    }
  };
  
  const handleEditRdv = (rdv: any) => {
    // Préparer les données pour l'édition
    const formattedData = {
      // Informations de base
      date: rdv.date_rendez_vous || rdv.date || "",
      canal: rdv.canal || "",
      objectif: rdv.objectif_rendez_vous || rdv.objectif || "",
      synthese: rdv.synthese || "",
      apprenantNom: rdv.nom_beneficiaire ? `${rdv.nom_beneficiaire} ${rdv.prenom_beneficiaire || ""}` : rdv.apprenantNom || "",
      formationTitre: rdv.formation_selectionnee || rdv.formationTitre || "",
      
      // Informations B2B
      entreprise: rdv.entreprise || "",
      siret: rdv.siret || "",
      adresseEntreprise: rdv.adresse_entreprise || "",
      interlocuteurNom: rdv.interlocuteur_nom || "",
      interlocuteurFonction: rdv.interlocuteur_fonction || "",
      interlocuteurEmail: rdv.interlocuteur_email || "",
      interlocuteurTelephone: rdv.interlocuteur_telephone || "",
      organismeFinanceur: rdv.organisme_financeur || "",
      numeroConvention: rdv.numero_convention || "",
      
      // Informations complémentaires
      typeFinancement: rdv.type_financement || "",
      priseEnChargeOPCO: rdv.prise_en_charge_opco || false,
      tauxPriseEnCharge: rdv.taux_prise_en_charge || "",
      restePourEntreprise: rdv.reste_pour_entreprise || "",
      besoinsSpecifiques: rdv.besoins_specifiques || "",
      prerequisFormation: rdv.prerequis_formation || "",
      contraintes: rdv.contraintes || "",
      delaisDemarrage: rdv.delais_demarrage || "",
      noteQualification: rdv.note_qualification || ""
    };
    
    setRdvToEdit(rdv);
    setEditMode(true);
    setShowForm(true);
  };

  const startWorkflow = (request: any) => {
    setSelectedRequest(request);
    setShowWorkflow(true);
  };
  
  const creerFormation = (request: any) => {
    // Naviguer vers la page de création de formation avec les données du positionnement
    navigate('/admin/formations/new', { 
      state: { 
        positionnementRequestId: request.id,
        nomBeneficiaire: `${request.prenom_beneficiaire} ${request.nom_beneficiaire}`,
        formationSouhaitee: request.formation_selectionnee,
        sourceData: 'positionnement'
      } 
    });
    toast({
      title: "Création de formation",
      description: "Formulaire de création de formation pour " + request.prenom_beneficiaire + " " + request.nom_beneficiaire,
    });
  };

  const handleWorkflowComplete = () => {
    setShowWorkflow(false);
    setSelectedRequest(null);
    fetchPositionnementRequests(); // Refresh the list
    toast({
      title: "Processus terminé",
      description: "Le processus de création du dossier de formation est terminé.",
    });
  };

  if (showForm) {
    return (
      <RendezVousForm
        onSubmit={handleSubmitRdv}
        onCancel={() => {
          setShowForm(false);
          setEditMode(false);
          setRdvToEdit(null);
        }}
        initialData={editMode && rdvToEdit ? rdvToEdit : undefined}
        editMode={editMode}
      />
    );
  }

  if (showWorkflow && selectedRequest) {
    return (
      <WorkflowPositionnement
        positionnementRequest={selectedRequest}
        onCancel={() => {
          setShowWorkflow(false);
          setSelectedRequest(null);
        }}
        onComplete={handleWorkflowComplete}
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
                        <p><strong>Reçu le :</strong> {request.createdAt ? new Date(request.createdAt).toLocaleDateString('fr-FR') : 'Date inconnue'}</p>
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
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={() => creerFormation(request)}
                          className="bg-blue-600 hover:bg-blue-700 mr-2"
                        >
                          <BookOpen className="h-4 w-4 mr-1" />
                          Créer formation
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={() => startWorkflow(request)}
                          disabled={request.status === 'traite'}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          Créer programme
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditRdv(request)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Éditer
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
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditRdv(rdv)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Modifier
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

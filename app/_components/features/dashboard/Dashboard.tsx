import { useState } from "react";
import { 
  Button,
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "../../../../components/ui";
import { 
  Users, 
  BookOpen, 
  Calendar, 
  FileCheck, 
  Accessibility, 
  Search, 
  MessageSquareWarning, 
  ClipboardCheck, 
  Database 
} from "lucide-react";
import { useAuth } from "./useAuth";
import ProgrammesManager from "../formations/ProgrammesManager";
import ApprenantsList from "../apprenants/ApprenantsList";
import CompetencesList from "../competences/CompetencesList";
import RendezVousListUnified from "../rendez-vous/unified-list/RendezVousListUnified";
import ReclamationsList from "../reclamations/ReclamationsList";
import ActionsCorrectivesList from "../actions-correctives/ActionsCorrectivesList";
import VeilleManager from "../veille/VeilleManager";
import AccessibiliteManager from "../accessibilite/AccessibiliteManager";
import ConformiteQualiopi from "../conformite/ConformiteQualiopi";

// Composants temporaires pour la migration
const FormationsList = () => <div>FormationsList - À migrer</div>;
const CompetenceManager = () => <div>CompetenceManager - À migrer</div>;
// Note: ReclamationsList, ActionsCorrectivesList, VeilleManager, AccessibiliteManager et ConformiteQualiopi ont été migrés et sont maintenant importés

// Les composants seront migrés dans les étapes suivantes

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("formations");
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
        <div>
          {user && (
            <p className="text-sm text-gray-500">
              Connecté en tant que: {user.email}
            </p>
          )}
        </div>
        <Button variant="outline" onClick={logout}>
          Se déconnecter
        </Button>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="flex flex-wrap gap-1 p-1 w-full">
            <TabsTrigger value="formations" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              Formations
            </TabsTrigger>
            <TabsTrigger value="apprenants" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Apprenants
            </TabsTrigger>
            <TabsTrigger value="rendez-vous" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Rendez-vous
            </TabsTrigger>
            <TabsTrigger value="competences" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Compétences
            </TabsTrigger>
            <TabsTrigger value="reclamations" className="flex items-center gap-2">
              <MessageSquareWarning className="h-4 w-4" />
              Réclamations
            </TabsTrigger>
            <TabsTrigger value="actions-correctives" className="flex items-center gap-2">
              <ClipboardCheck className="h-4 w-4" />
              Actions Correctives
            </TabsTrigger>
            <TabsTrigger value="veille" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Veille
            </TabsTrigger>
            <TabsTrigger value="accessibilite" className="flex items-center gap-2">
              <Accessibility className="h-4 w-4" />
              Accessibilité
            </TabsTrigger>
            <TabsTrigger value="conformite" className="flex items-center gap-2">
              <FileCheck className="h-4 w-4" />
              Conformité
            </TabsTrigger>
          </TabsList>

          <TabsContent value="formations">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Gestion des formations</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="publiees" className="w-full">
                  <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="publiees" className="flex items-center justify-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      Formations Publiées
                    </TabsTrigger>
                    <TabsTrigger value="admin" className="flex items-center justify-center gap-1">
                      <Database className="h-4 w-4" />
                      Administration
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="publiees" className="mt-4">
                    <FormationsList />
                  </TabsContent>
                  <TabsContent value="admin" className="mt-4">
                    <ProgrammesManager />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rendez-vous" className="space-y-4">
            <RendezVousListUnified />
          </TabsContent>

          <TabsContent value="apprenants">
            <ApprenantsList />
          </TabsContent>

          <TabsContent value="competences">
            <CompetencesList />
          </TabsContent>

          <TabsContent value="reclamations">
            <ReclamationsList />
          </TabsContent>

          <TabsContent value="actions-correctives">
            <ActionsCorrectivesList />
          </TabsContent>

          <TabsContent value="veille">
            <VeilleManager />
          </TabsContent>

          <TabsContent value="accessibilite">
            <AccessibiliteManager />
          </TabsContent>

          <TabsContent value="conformite">
            <ConformiteQualiopi />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, BookOpen, Calendar, FileCheck, Accessibility, Search } from "lucide-react";
import FormationsList from "@/components/formations/FormationsList";
import ApprenantsList from "@/components/apprenants/ApprenantsList";
import RendezVousList from "@/components/rendez-vous/RendezVousList";
import ConformiteQualiopi from "@/components/conformite/ConformiteQualiopi";
import AccessibiliteManager from "@/components/accessibilite/AccessibiliteManager";
import VeilleManager from "@/components/veille/VeilleManager";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("formations");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">GestionMax Formation</h1>
              <p className="text-gray-600">Gestion des formations WordPress - Certifié Qualiopi</p>
            </div>
            <Button variant="outline">Se déconnecter</Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="formations" className="flex items-center gap-2">
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
            <FormationsList />
          </TabsContent>

          <TabsContent value="apprenants">
            <ApprenantsList />
          </TabsContent>

          <TabsContent value="rendez-vous">
            <RendezVousList />
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

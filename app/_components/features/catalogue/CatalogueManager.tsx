"use client";

import { useState } from 'react';
import { useProgrammesCatalogue } from './hooks/useProgrammesCatalogue';
import FormationsList from './FormationsList';
import { CategorieFormation } from '@/_components/features/catalogue/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

// Fonction utilitaire pour formater une date
const formatDate = (dateString?: string | Date) => {
  if (!dateString) return '';
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
};

const CatalogueManager = () => {
  const { categories, loading, error } = useProgrammesCatalogue();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  // Gestionnaire pour ouvrir le modal de positionnement
  const handlePositionnement = (formationTitre: string) => {
    console.log("Demande de positionnement pour:", formationTitre);
    // Ici, on pourrait ouvrir un modal ou rediriger vers la page de rendez-vous
    window.location.href = `/rendez-vous?formation=${encodeURIComponent(formationTitre)}`;
  };

  return (
    <div className="w-full py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Catalogue de formations</h1>
        
        {loading ? (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
            {error}
          </div>
        ) : (
          <div>
            {categories && Array.isArray(categories) && categories.length > 0 ? (
              <FormationsList 
                categoriesFormations={categories} 
                onPositionnement={handlePositionnement} 
              />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Aucune formation disponible pour le moment</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogueManager;

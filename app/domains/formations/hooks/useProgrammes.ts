'use client';

import { useState, useEffect } from 'react';
import { ProgrammeWithDetails, ProgrammeFilterParams } from '../services/programme-service';

/**
 * Hook pour la récupération des programmes avec gestion de l'état
 * et des filtres de recherche
 */
export function useProgrammes(initialParams: Partial<ProgrammeFilterParams> = {}) {
  const [programmes, setProgrammes] = useState<ProgrammeWithDetails[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<ProgrammeFilterParams>({
    page: 1,
    limit: 10,
    published: true,
    ...initialParams,
  });

  // Fonction pour charger les programmes
  const fetchProgrammes = async () => {
    setLoading(true);
    setError(null);

    try {
      // Construction des paramètres de requête
      const queryParams = new URLSearchParams();
      
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.categorieId) queryParams.append('categorieId', params.categorieId);
      if (params.search) queryParams.append('search', params.search);
      if (params.type) queryParams.append('type', params.type);
      if (params.published !== undefined) queryParams.append('published', params.published.toString());

      // Appel à l'API
      const response = await fetch(`/api/programmes?${queryParams.toString()}`);
      
      if (!response.ok) {
        throw new Error(`Erreur lors de la récupération des programmes: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Une erreur est survenue');
      }

      setProgrammes(data.data.programmes);
      setTotal(data.data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  // Chargement initial et lors des changements de paramètres
  useEffect(() => {
    fetchProgrammes();
  }, [params.page, params.limit, params.categorieId, params.type, params.published]);

  // Fonction pour mettre à jour les paramètres de recherche
  const updateParams = (newParams: Partial<ProgrammeFilterParams>) => {
    setParams(prev => ({
      ...prev,
      ...newParams,
      // Revenir à la première page si les filtres de recherche changent
      ...(newParams.search || newParams.categorieId || newParams.type ? { page: 1 } : {}),
    }));
  };

  // Fonction pour la recherche par texte
  const searchProgrammes = (search: string) => {
    updateParams({ search, page: 1 });
  };

  // Fonction pour filtrer par catégorie
  const filterByCategorie = (categorieId: string | undefined) => {
    updateParams({ categorieId, page: 1 });
  };

  // Fonction pour changer de page
  const changePage = (page: number) => {
    updateParams({ page });
  };

  return {
    programmes,
    total,
    loading,
    error,
    params,
    searchProgrammes,
    filterByCategorie,
    changePage,
    updateParams,
    refresh: fetchProgrammes,
  };
}

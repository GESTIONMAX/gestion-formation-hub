import { useState, useEffect, useCallback } from 'react';
import { ProgrammeFormation } from '@/lib/types/ProgrammeFormation';

/**
 * Hook personnalisé pour gérer les programmes de formation
 * @returns Un objet contenant les programmes, le chargement, les erreurs et les fonctions de gestion
 */
export const useProgrammesFormation = () => {
  const [programmes, setProgrammes] = useState<ProgrammeFormation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<{id: string, nom: string}[]>([]);

  // Simuler le chargement des données
  useEffect(() => {
    const fetchProgrammes = async () => {
      try {
        setLoading(true);
        // TODO: Remplacer par un appel API réel
        const fakeData: ProgrammeFormation[] = [
          {
            id: '1',
            titre: 'Formation initiale',
            description: 'Description de la formation initiale',
            code: 'FI-001',
            categorie: 'Informatique',
            categorieId: '1',
            objectifsPedagogiques: 'Objectifs pédagogiques de la formation',
            objectifsSpecifiques: ['Objectif 1', 'Objectif 2'],
            programmeDetaille: 'Programme détaillé de la formation',
            publicVise: 'Tout public',
            prerequis: ['Aucun prérequis'],
            duree: 5,
            type: 'catalogue',
            statut: 'actif',
            reference: 'REF-001',
            modalites: 'Présentiel et distanciel',
            tarifIntraEntreprise: 2500,
            tarifInterEntreprise: 2000,
            accessibilite: 'Accessible aux personnes à mobilité réduite',
            eligibleCPF: true,
            accessibleHandicap: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];
        // Simuler un délai de chargement
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simuler des catégories
        const fakeCategories = [
          { id: '1', nom: 'Informatique' },
          { id: '2', nom: 'Management' },
          { id: '3', nom: 'Développement personnel' },
          { id: '4', nom: 'Langues' },
          { id: '5', nom: 'Bureautique' },
        ];
        
        setProgrammes(fakeData);
        setCategories(fakeCategories);
        setError(null);
      } catch (err) {
        setError('Erreur lors du chargement des programmes');
        console.error('Erreur:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgrammes();
  }, []);

  // Fonction pour créer un nouveau programme
  const createProgramme = async (programme: Partial<ProgrammeFormation>) => {
    // TODO: Implémenter l'appel API réel
    const newProgramme: ProgrammeFormation = {
      ...programme,
      id: Math.random().toString(36).substr(2, 9),
      code: programme.code || `PRG-${Math.floor(1000 + Math.random() * 9000)}`,
      categorie: programme.categorie || 'Autre',
      categorieId: programme.categorieId || '0',
      objectifsPedagogiques: programme.objectifsPedagogiques || '',
      objectifsSpecifiques: programme.objectifsSpecifiques || [],
      programmeDetaille: programme.programmeDetaille || '',
      publicVise: programme.publicVise || 'Tout public',
      prerequis: programme.prerequis || [],
      reference: programme.reference || `REF-${Math.floor(1000 + Math.random() * 9000)}`,
      modalites: programme.modalites || 'Présentiel',
      eligibleCPF: programme.eligibleCPF || false,
      accessibleHandicap: programme.accessibleHandicap || false,
      createdAt: new Date(),
      updatedAt: new Date(),
      statut: 'actif',
    } as ProgrammeFormation;

    setProgrammes(prev => [...prev, newProgramme]);
    return newProgramme;
  };

  // Fonction pour mettre à jour un programme existant
  const updateProgramme = async (id: string, updates: Partial<ProgrammeFormation>) => {
    // TODO: Implémenter l'appel API réel
    setProgrammes(prev => 
      prev.map(p => 
        p.id === id ? { ...p, ...updates, updatedAt: new Date() } as ProgrammeFormation : p
      )
    );
    
    return { ...updates, id } as ProgrammeFormation;
  };

  // Fonction pour supprimer un programme
  const deleteProgramme = async (id: string) => {
    // TODO: Implémenter l'appel API réel
    setProgrammes(prev => prev.filter(p => p.id !== id));
    return { success: true };
  };

  // Fonction pour dupliquer un programme
  const duplicateProgramme = async (id: string) => {
    const programmeToDuplicate = programmes.find(p => p.id === id);
    if (!programmeToDuplicate) {
      throw new Error('Programme non trouvé');
    }
    
    const newProgramme = {
      ...programmeToDuplicate,
      id: Math.random().toString(36).substr(2, 9),
      titre: `${programmeToDuplicate.titre} (Copie)`,
      code: `${programmeToDuplicate.code}-COPY`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setProgrammes(prev => [...prev, newProgramme]);
    return newProgramme;
  };

  // Fonction pour archiver un programme
  const archiveProgramme = async (id: string) => {
    return updateProgramme(id, { statut: 'inactif' });
  };

  // Fonction pour réactiver un programme
  const activateProgramme = async (id: string) => {
    return updateProgramme(id, { statut: 'actif' });
  };

  // Fonction pour filtrer les programmes par statut
  const getProgrammesByStatus = useCallback((status: 'actif' | 'inactif' | 'brouillon' | 'tous' = 'tous') => {
    if (status === 'tous') return programmes;
    return programmes.filter(p => p.statut === status);
  }, [programmes]);

  // Fonction pour filtrer les programmes par type
  const getProgrammesByType = useCallback((type: 'catalogue' | 'sur-mesure' | 'tous' = 'tous') => {
    if (type === 'tous') return programmes;
    return programmes.filter(p => p.type === type);
  }, [programmes]);

  // Fonction pour rechercher des programmes
  const searchProgrammes = useCallback((query: string) => {
    if (!query.trim()) return programmes;
    const searchTerm = query.toLowerCase();
    return programmes.filter(p => 
      p.titre.toLowerCase().includes(searchTerm) || 
      p.description.toLowerCase().includes(searchTerm) ||
      p.code.toLowerCase().includes(searchTerm) ||
      p.categorie.toLowerCase().includes(searchTerm)
    );
  }, [programmes]);

  return {
    programmes,
    loading,
    error,
    categories,
    createProgramme,
    updateProgramme,
    deleteProgramme,
    duplicateProgramme,
    archiveProgramme,
    activateProgramme,
    getProgrammesByStatus,
    getProgrammesByType,
    searchProgrammes,
  };
};

export default useProgrammesFormation;

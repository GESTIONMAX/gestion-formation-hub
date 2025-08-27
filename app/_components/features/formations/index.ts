// Export des composants de gestion des formations
export { default as ProcessusPedagogique } from './ProcessusPedagogique';
export { default as ProgrammesManager } from './ProgrammesManager';
export { default as FormationForm } from './FormationForm';
export { default as FormationDetail } from './FormationDetail';
export { default as ProgrammeCatalogue } from '../programmes/ProgrammesCatalogue';

export * from './types';
export * from './hooks';

// Types
export type { Programme, Module, Chapitre } from './types';

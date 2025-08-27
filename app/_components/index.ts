// Core Components
export { CoreHeader } from './core';

// Features
export * from './features';

// Layout Components
export * from './layout';

// Utilitaires
export * from './_lib/lib/utils';

// Types - Export direct des types pour éviter les conflits
import type { ProgrammeFormation, CategorieFormation, Formation } from './_lib/types/programme-formation';
export type { ProgrammeFormation, CategorieFormation, Formation };

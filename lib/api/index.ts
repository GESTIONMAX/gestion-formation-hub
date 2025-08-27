/**
 * API Client - Point d'entrée principal
 * Ce fichier centralise les exports de l'API pour faciliter l'import
 */

// Client standard pour les composants côté client
export { apiClient } from './client';
export { default as defaultApiClient } from './client';

// Client serveur pour les composants Server de Next.js
export { serverApiClient } from './server';
export { default as defaultServerApiClient } from './server';

// Export par défaut du client standard pour compatibilité avec le code existant
export { default } from './client';

// Note: utiliser defaultApiClient pour le côté client et defaultServerApiClient pour le côté serveur
// Ou utiliser les exports nommés apiClient et serverApiClient respectivement

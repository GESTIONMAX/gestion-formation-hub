// Import avec require pour la compatibilité CommonJS
const swaggerSpecs = require('../swagger');

/**
 * Récupère la documentation OpenAPI générée avec swagger-jsdoc
 * @returns Documentation OpenAPI au format JSON
 */
export function getApiDocs() {
  return swaggerSpecs;
}

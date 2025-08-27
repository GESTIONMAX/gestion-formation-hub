import { NextRequest, NextResponse } from 'next/server';
import { getApiDocs } from '../../../lib/swagger';

/**
 * Nom du point d'accès pour la documentation JSON
 * @route GET /api/api-docs/json
 * @group Documentation - Opérations liées à la documentation API
 * @returns {object} 200 - Spécification OpenAPI au format JSON
 */
export async function GET(req: NextRequest) {
  try {
    // Récupère les spécifications OpenAPI générées par swagger-jsdoc
    const spec = getApiDocs();
    
    // Ajouter l'URL de base dynamiquement si nécessaire (utile pour les environnements de déploiement)
    if (req.headers.get('host')) {
      const protocol = req.headers.get('x-forwarded-proto') || 'http';
      const host = req.headers.get('host');
      const baseUrl = `${protocol}://${host}`;
      
      // Mettre à jour l'URL du serveur si nécessaire
      if (spec.servers && spec.servers.length > 0) {
        // Si le serveur de développement local est listé, mettre à jour son URL
        const devServerIndex = spec.servers.findIndex(
          (server: any) => server.description === 'Serveur de développement local'
        );
        
        if (devServerIndex >= 0) {
          spec.servers[devServerIndex].url = baseUrl;
        }
      }
    }

    // Configuration des en-têtes CORS pour permettre l'accès depuis n'importe quelle origine
    return NextResponse.json(spec, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Erreur lors de la génération de la documentation API:', error);
    return NextResponse.json({ error: 'Erreur lors de la génération de la documentation API' }, { status: 500 });
  }
}

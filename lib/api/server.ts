/**
 * API Client pour les composants serveur
 * Cette version est spécialement conçue pour les Server Components de Next.js
 * et n'utilise pas localStorage ni window
 */

// Utiliser les mêmes types que le client API
// TODO: Extraire ces interfaces vers un fichier types.ts partagé
interface Formation {
  id: string;
  // Autres propriétés
}

interface FormationCreate {
  // Propriétés pour créer une formation
}

interface LegalInfo {
  // Propriétés pour les informations légales
}

const API_BASE_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

/**
 * Version du client API optimisée pour les Server Components
 */
class ServerApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    // Configuration de base pour la requête
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers,
      // Force no-store pour les données dynamiques dans les Server Components
      cache: 'no-store',
      next: { revalidate: 0 },
    };

    // Effectuer la requête
    const response = await fetch(url, config);
    
    // Gérer les erreurs
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }

  // Méthodes HTTP génériques
  get<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  post<T>(endpoint: string, data: any) {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put<T>(endpoint: string, data: any) {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // Services spécifiques
  get formations() {
    const basePath = '/formations';
    return {
      list: () => this.get<Formation[]>(basePath),
      get: (id: string) => this.get<Formation>(`${basePath}/${id}`),
      create: (data: FormationCreate) => this.post<Formation>(basePath, data),
      update: (id: string, data: Partial<Formation>) => this.put<Formation>(`${basePath}/${id}`, data),
      delete: (id: string) => this.delete<void>(`${basePath}/${id}`),
    };
  }

  get legal() {
    const basePath = '/legal';
    return {
      getInfo: () => this.get<LegalInfo>(basePath),
      updateInfo: (data: Partial<LegalInfo>) => this.put<LegalInfo>(basePath, data),
    };
  }

  // Ajouter d'autres services au besoin...
}

// Exporter une instance unique
export const serverApiClient = new ServerApiClient();
export default serverApiClient;

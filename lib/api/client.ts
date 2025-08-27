/**
 * API Client centralisé
 * Utilise l'API Fetch pour les requêtes HTTP avec typages forts
 */

// TODO: Définir les types pour les modèles
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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    // Gestion du token d'authentification côté client
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Ajout du token si disponible (client-side only)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth-token') || localStorage.getItem('accessToken');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers,
      ...options,
    };

    const response = await fetch(url, config);
    
    // Gestion des erreurs
    if (!response.ok) {
      if (response.status === 401 && typeof window !== 'undefined') {
        // Redirection en cas de non-authentification
        localStorage.removeItem('auth-token');
        localStorage.removeItem('accessToken');
        window.location.href = '/auth';
      }
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }

  // Méthodes HTTP génériques
  get<T>(endpoint: string) {
    return this.request<T>(endpoint);
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

export const apiClient = new ApiClient();
export default apiClient;

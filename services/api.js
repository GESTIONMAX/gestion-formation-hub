import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || '';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification si disponible
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur pour gérer les réponses et erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Gestion spécifique des erreurs (401, 403, etc.)
    if (error.response && error.response.status === 401) {
      // Redirection vers la page de login ou autre action
      if (typeof window !== 'undefined') {
        // window.location.href = '/login';
        console.error('Session expirée, veuillez vous reconnecter');
      }
    }
    return Promise.reject(error);
  }
);

export default api;

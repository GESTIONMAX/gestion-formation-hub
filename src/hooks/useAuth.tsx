import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import axios from 'axios';

// URL de base de l'API
const API_URL = 'http://localhost:5000';

// Types
interface User {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  register: (email: string, password: string, nom: string, prenom: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Création du contexte d'authentification
const AuthContext = createContext<AuthContextType | null>(null);

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider d'authentification
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Configuration d'axios avec le token JWT
  const setupAxiosInterceptors = (token: string) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');
      
      if (token) {
        try {
          setupAxiosInterceptors(token);
          const response = await axios.get(`${API_URL}/auth/me`);
          setUser(response.data);
          setIsAuthenticated(true);
        } catch (err) {
          console.error('Erreur d\'authentification:', err);
          localStorage.removeItem('accessToken');
        }
      }
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Inscription
  const register = async (email: string, password: string, nom: string, prenom: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post(`${API_URL}/auth/register`, {
        email,
        password,
        nom,
        prenom
      });
      
      const { accessToken, user } = response.data;
      
      localStorage.setItem('accessToken', accessToken);
      setupAxiosInterceptors(accessToken);
      
      setUser(user);
      setIsAuthenticated(true);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Erreur lors de l\'inscription';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Connexion
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      
      const { accessToken, user } = response.data;
      
      localStorage.setItem('accessToken', accessToken);
      setupAxiosInterceptors(accessToken);
      
      setUser(user);
      setIsAuthenticated(true);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Erreur lors de la connexion';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Déconnexion
  const logout = () => {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAuthenticated(false);
  };

  // Valeurs du contexte
  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    isAuthenticated
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

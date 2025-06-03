
import { useState, useEffect } from "react";

interface Apprenant {
  id: string;
  nom: string;
  email: string;
  telephone?: string;
  createdAt: string;
}

export const useApprenants = () => {
  const [apprenants, setApprenants] = useState<Apprenant[]>([]);
  const [loading, setLoading] = useState(true);

  const mockApprenants: Apprenant[] = [
    {
      id: "1",
      nom: "Marie Dubois",
      email: "marie.dubois@email.com",
      telephone: "06 12 34 56 78",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      nom: "Jean Martin",
      email: "jean.martin@email.com",
      telephone: "06 98 76 54 32",
      createdAt: new Date().toISOString(),
    }
  ];

  useEffect(() => {
    const fetchApprenants = async () => {
      setLoading(true);
      setTimeout(() => {
        setApprenants(mockApprenants);
        setLoading(false);
      }, 1000);
    };

    fetchApprenants();
  }, []);

  const createApprenant = async (apprenantData: Omit<Apprenant, "id" | "createdAt">) => {
    const newApprenant: Apprenant = {
      ...apprenantData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    setApprenants(prev => [newApprenant, ...prev]);
    return newApprenant;
  };

  const updateApprenant = async (id: string, apprenantData: Partial<Apprenant>) => {
    setApprenants(prev => 
      prev.map(apprenant => 
        apprenant.id === id ? { ...apprenant, ...apprenantData } : apprenant
      )
    );
  };

  return {
    apprenants,
    loading,
    createApprenant,
    updateApprenant,
  };
};

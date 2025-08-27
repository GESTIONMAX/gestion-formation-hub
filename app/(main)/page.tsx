import dynamic from 'next/dynamic';

// Chargement dynamique du composant pour éviter les problèmes d'hydratation
const HomePage = dynamic(() => import('../../_components/features/accueil/AccueilPage'), {
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center">Chargement...</div>
});

export default function Home() {
  return <HomePage />;
}

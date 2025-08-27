#!/bin/bash

# Création de la structure de dossiers
mkdir -p app/{admin,espace-formation}/{components,lib,api}

# Créer les dossiers pour les pages
mkdir -p app/admin/dashboard
mkdir -p app/admin/utilisateurs
mkdir -p app/admin/formations
mkdir -p app/espace-formation/mes-formations
mkdir -p app/espace-formation/progression
mkdir -p app/espace-formation/documents

# Créer le dossier des composants
mkdir -p app/_components/{admin,formation}

# Création des fichiers de layout
cat > app/admin/layout.tsx << 'EOL'
'use client';

import { ReactNode } from 'react';
import AdminHeader from '../../_components/admin/AdminHeader';
import AdminSidebar from '../../_components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
EOL

cat > app/espace-formation/layout.tsx << 'EOL'
'use client';

import { ReactNode } from 'react';
import FormationHeader from '../../_components/formation/FormationHeader';
import FormationNav from '../../_components/formation/FormationNav';

export default function FormationLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <FormationHeader />
      <div className="flex">
        <FormationNav />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
EOL

# Création des composants de base
cat > app/_components/admin/AdminHeader.tsx << 'EOL'
'use client';

export default function AdminHeader() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">Administration</h1>
      </div>
    </header>
  );
}
EOL

cat > app/_components/admin/AdminSidebar.tsx << 'EOL'
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname.startsWith(path);
  
  return (
    <nav className="w-64 bg-white shadow-md h-screen p-4">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Menu Admin</h2>
        <ul className="space-y-2">
          <li>
            <Link 
              href="/admin/dashboard" 
              className={`block px-4 py-2 rounded ${
                isActive('/admin/dashboard') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Tableau de bord
            </Link>
          </li>
          <li>
            <Link 
              href="/admin/utilisateurs" 
              className={`block px-4 py-2 rounded ${
                isActive('/admin/utilisateurs') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Utilisateurs
            </Link>
          </li>
          <li>
            <Link 
              href="/admin/formations" 
              className={`block px-4 py-2 rounded ${
                isActive('/admin/formations') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Formations
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
EOL

cat > app/_components/formation/FormationHeader.tsx << 'EOL'
'use client';

export default function FormationHeader() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">Espace Formation</h1>
      </div>
    </header>
  );
}
EOL

cat > app/_components/formation/FormationNav.tsx << 'EOL'
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function FormationNav() {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname.startsWith(path);
  
  return (
    <nav className="w-64 bg-white shadow-md h-screen p-4">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Navigation</h2>
        <ul className="space-y-2">
          <li>
            <Link 
              href="/espace-formation/mes-formations" 
              className={`block px-4 py-2 rounded ${
                isActive('/espace-formation/mes-formations') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Mes formations
            </Link>
          </li>
          <li>
            <Link 
              href="/espace-formation/progression" 
              className={`block px-4 py-2 rounded ${
                isActive('/espace-formation/progression') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Ma progression
            </Link>
          </li>
          <li>
            <Link 
              href="/espace-formation/documents" 
              className={`block px-4 py-2 rounded ${
                isActive('/espace-formation/documents') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Mes documents
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
EOL

# Création des pages de base
cat > app/admin/page.tsx << 'EOL'
import { redirect } from 'next/navigation';

export default function AdminPage() {
  redirect('/admin/dashboard');
}
EOL

cat > app/admin/dashboard/page.tsx << 'EOL'
'use client';

export default function DashboardPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Tableau de bord administrateur</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium">Utilisateurs</h3>
          <p className="text-2xl font-bold mt-2">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium">Formations</h3>
          <p className="text-2xl font-bold mt-2">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium">Documents</h3>
          <p className="text-2xl font-bold mt-2">0</p>
        </div>
      </div>
    </div>
  );
}
EOL

# Page utilisateurs
cat > app/admin/utilisateurs/page.tsx << 'EOL'
'use client';

export default function UtilisateursPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Gestion des utilisateurs</h2>
      <div className="bg-white p-6 rounded-lg shadow">
        <p>Liste des utilisateurs à venir...</p>
      </div>
    </div>
  );
}
EOL

# Page formations
cat > app/admin/formations/page.tsx << 'EOL'
'use client';

export default function FormationsPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Gestion des formations</h2>
      <div className="bg-white p-6 rounded-lg shadow">
        <p>Gestion des formations à venir...</p>
      </div>
    </div>
  );
}
EOL

cat > app/espace-formation/page.tsx << 'EOL'
import { redirect } from 'next/navigation';

export default function FormationPage() {
  redirect('/espace-formation/mes-formations');
}
EOL

cat > app/espace-formation/mes-formations/page.tsx << 'EOL
'use client';

export default function MesFormationsPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Mes formations</h2>
      <div className="bg-white p-6 rounded-lg shadow">
        <p>Vous n'êtes inscrit à aucune formation pour le moment.</p>
      </div>
    </div>
  );
}
EOL

# Pages vides pour la progression et les documents
cat > app/espace-formation/progression/page.tsx << 'EOL
'use client';

export default function ProgressionPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Ma progression</h2>
      <div className="bg-white p-6 rounded-lg shadow">
        <p>Votre progression sera affichée ici.</p>
      </div>
    </div>
  );
}
EOL

cat > app/espace-formation/documents/page.tsx << 'EOL
'use client';

export default function DocumentsPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Mes documents</h2>
      <div className="bg-white p-6 rounded-lg shadow">
        <p>Aucun document disponible pour le moment.</p>
      </div>
    </div>
  );
}
EOL

echo "Structure du projet configurée avec succès !"
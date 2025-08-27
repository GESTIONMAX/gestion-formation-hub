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
              className={`block px-4 py-2 rounded ${isActive('/espace-formation/mes-formations') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              Mes formations
            </Link>
          </li>
          <li>
            <Link 
              href="/espace-formation/progression" 
              className={`block px-4 py-2 rounded ${isActive('/espace-formation/progression') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              Ma progression
            </Link>
          </li>
          <li>
            <Link 
              href="/espace-formation/documents" 
              className={`block px-4 py-2 rounded ${isActive('/espace-formation/documents') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              Mes documents
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

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
              className={`block px-4 py-2 rounded ${isActive('/admin/dashboard') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              Tableau de bord
            </Link>
          </li>
          <li>
            <Link 
              href="/admin/utilisateurs" 
              className={`block px-4 py-2 rounded ${isActive('/admin/utilisateurs') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              Utilisateurs
            </Link>
          </li>
          <li>
            <Link 
              href="/admin/formations" 
              className={`block px-4 py-2 rounded ${isActive('/admin/formations') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              Formations
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

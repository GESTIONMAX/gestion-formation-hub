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

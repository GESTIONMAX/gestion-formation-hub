import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClientProviders } from './components/providers/ClientProviders';
import { ReactQueryProvider } from './components/providers/ReactQueryProvider';
import { AuthClientProvider } from './components/providers/AuthClientProvider';
import { BodyAttributes } from './components/providers/BodyAttributes';
import './globals.css';

// Précharge la police Inter avec le sous-ensemble latin
export const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GestionMax Formation Hub',
  description: 'Plateforme de gestion de formations professionnelles',
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      {/* Suppression de cz-shortcut-listen qui cause l'erreur d'hydratation */}
      <body className={inter.className} suppressHydrationWarning={true}>
        <ReactQueryProvider>
          <AuthClientProvider>
            <ClientProviders>
              <BodyAttributes>
                {children}
              </BodyAttributes>
            </ClientProviders>
          </AuthClientProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

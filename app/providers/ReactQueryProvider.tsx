"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useState } from "react";

export function ReactQueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Désactiver le rechargement automatique lors de la perte de focus
            refetchOnWindowFocus: false,
            // Désactiver les nouvelles requêtes lors de la reconnexion
            refetchOnReconnect: false,
            // Désactiver le rechargement lors du remontée du composant
            refetchOnMount: false,
            // Temps de cache par défaut (5 minutes)
            staleTime: 5 * 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

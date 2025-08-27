/**
 * Types pour les API Routes de Next.js
 */
import { NextRequest } from 'next/server';

export interface RouteContext<T = Record<string, string>> {
  params: T;
}

// Types spécifiques pour nos routes dynamiques
export type ProgrammeIdContext = RouteContext<{
  id: string;
}>;

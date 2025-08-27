import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combine et fusionne les classes CSS avec Tailwind
 * Utile pour composer des classes conditionnelles et les fusionner
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formater une date en format français
 * @param date - Date à formater
 * @returns Date formatée en string (ex: 01/01/2025)
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/**
 * Tronquer un texte s'il dépasse une certaine longueur
 * @param text - Texte à tronquer
 * @param maxLength - Longueur maximale
 * @returns Texte tronqué avec ... à la fin si nécessaire
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

/**
 * Générer des initiales à partir d'un nom et prénom
 * @param nom - Nom
 * @param prenom - Prénom (optionnel)
 * @returns Initiales en majuscules
 */
export function getInitials(nom: string, prenom?: string): string {
  const firstInitial = prenom ? prenom.charAt(0).toUpperCase() : "";
  const lastInitial = nom.charAt(0).toUpperCase();
  return `${firstInitial}${lastInitial}`;
}

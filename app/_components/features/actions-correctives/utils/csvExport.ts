import type { ActionCorrective } from "../hooks/useActionsCorrectives";

/**
 * Échappe les champs CSV pour éviter les problèmes avec les séparateurs
 */
function escapeCSVField(field: string | number | undefined | null): string {
  if (field === undefined || field === null) {
    return "";
  }
  
  const stringField = String(field);
  
  // Si le champ contient des virgules, des guillemets ou des sauts de ligne, l'encadrer de guillemets
  if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
    // Échapper les guillemets en les doublant
    return `"${stringField.replace(/"/g, '""')}"`;
  }
  
  return stringField;
}

/**
 * Convertit une date ISO en format français (DD/MM/YYYY)
 */
function formatDateFR(isoDate: string | undefined): string {
  if (!isoDate) return "";
  try {
    const date = new Date(isoDate);
    return date.toLocaleDateString('fr-FR');
  } catch {
    return isoDate || "";
  }
}

/**
 * Transforme un statut technique en format lisible
 */
function formatStatut(statut: string): string {
  const statutMap: Record<string, string> = {
    'planifiee': 'Planifiée',
    'en_cours': 'En cours',
    'terminee': 'Terminée',
    'annulee': 'Annulée'
  };
  return statutMap[statut] || statut;
}

/**
 * Transforme une priorité technique en format lisible
 */
function formatPriorite(priorite: string): string {
  const prioriteMap: Record<string, string> = {
    'faible': 'Faible',
    'moyenne': 'Moyenne',
    'haute': 'Haute',
    'critique': 'Critique'
  };
  return prioriteMap[priorite] || priorite;
}

/**
 * Transforme un type d'origine technique en format lisible
 */
function formatOrigineType(origineType: string): string {
  const origineMap: Record<string, string> = {
    'reclamation': 'Réclamation',
    'incident': 'Incident',
    'audit': 'Audit',
    'veille': 'Veille réglementaire'
  };
  return origineMap[origineType] || origineType;
}

/**
 * Exporte les données des actions correctives au format CSV
 */
export function exportActionsCorrectivesToCSV(actionsCorrectives: ActionCorrective[]): void {
  // Définir les en-têtes CSV
  const headers = [
    'ID',
    'Titre',
    'Description',
    'Statut',
    'Priorité',
    'Type d\'origine',
    'Référence d\'origine',
    'Date d\'origine',
    'Résumé d\'origine',
    'Responsable',
    'Email du responsable',
    'Date d\'échéance',
    'Date de réalisation',
    'Indicateur d\'efficacité',
    'Évaluation d\'efficacité',
    'Avancement (%)',
    'Date de création',
    'Dernière mise à jour'
  ];

  // Préparer les données pour chaque action corrective
  const csvRows = actionsCorrectives.map(action => [
    escapeCSVField(action.id),
    escapeCSVField(action.titre),
    escapeCSVField(action.description),
    escapeCSVField(formatStatut(action.statut)),
    escapeCSVField(formatPriorite(action.priorite)),
    escapeCSVField(formatOrigineType(action.origine_type)),
    escapeCSVField(action.origine_ref),
    escapeCSVField(formatDateFR(action.origine_date)),
    escapeCSVField(action.origine_resume),
    escapeCSVField(action.responsable_nom),
    escapeCSVField(action.responsable_email),
    escapeCSVField(formatDateFR(action.date_echeance)),
    escapeCSVField(formatDateFR(action.date_realisation)),
    escapeCSVField(action.indicateur_efficacite),
    escapeCSVField(action.evaluation_efficacite),
    escapeCSVField(action.avancement),
    escapeCSVField(formatDateFR(action.created_at)),
    escapeCSVField(formatDateFR(action.updated_at))
  ].join(','));

  // Ajouter les en-têtes et concaténer toutes les lignes
  const csvContent = [headers.join(','), ...csvRows].join('\n');
  
  // Créer un objet Blob avec le contenu CSV
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  // Créer un élément a pour télécharger le fichier
  const link = document.createElement('a');
  link.setAttribute('href', url);
  
  // Date actuelle au format français pour le nom du fichier
  const datePart = new Date().toLocaleDateString('fr-FR').replace(/\//g, '-');
  link.setAttribute('download', `actions-correctives_${datePart}.csv`);
  
  // Append to the body (required for Firefox)
  document.body.appendChild(link);
  
  // Trigger the download
  link.click();
  
  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

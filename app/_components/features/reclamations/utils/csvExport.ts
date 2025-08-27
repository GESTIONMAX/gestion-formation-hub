import { Reclamation } from "../hooks/useReclamations";

// Utilitaire pour formater une date en format français
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    return '';
  }
};

// Utilitaire pour échapper les champs CSV
const escapeCSV = (field: string): string => {
  if (field === null || field === undefined) return '';
  const stringField = String(field);
  // Si le champ contient des virgules, des guillemets ou des sauts de ligne, l'entourer de guillemets
  if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
    // Doubler les guillemets pour les échapper
    return `"${stringField.replace(/"/g, '""')}"`;
  }
  return stringField;
};

// Fonction principale pour exporter les réclamations en CSV
export const exportReclamationsToCSV = (reclamations: Reclamation[]): void => {
  // Définition des en-têtes
  const headers = [
    'ID',
    'Nom',
    'Email',
    'Téléphone',
    'Sujet',
    'Message',
    'Statut',
    'Priorité',
    'Notes Internes',
    'Date de Création',
    'Date de Résolution',
    'Date de Mise à Jour'
  ];

  // Mapper les réclamations au format CSV
  const csvRows = reclamations.map(reclamation => [
    reclamation.id,
    reclamation.nom,
    reclamation.email,
    reclamation.telephone || '',
    reclamation.sujet,
    reclamation.message,
    reclamation.statut,
    reclamation.priorite,
    reclamation.notes_internes || '',
    formatDate(reclamation.created_at),
    reclamation.date_resolution ? formatDate(reclamation.date_resolution) : '',
    formatDate(reclamation.updated_at)
  ].map(escapeCSV).join(','));

  // Assembler le contenu CSV complet
  const csvContent = [headers.join(','), ...csvRows].join('\n');

  // Créer le blob et le lien de téléchargement
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `reclamations_${new Date().toISOString().slice(0, 10)}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


import { Competence } from "@/types/competence";

export const exportCompetencesToCSV = (competences: Competence[]) => {
  const headers = [
    'Nom',
    'Description',
    'Catégorie',
    'Domaine de Développement',
    'Niveau Actuel',
    'Objectif Niveau',
    'Progression (%)',
    'Statut',
    'Action Prévue',
    'Plateforme Formation',
    'Lien Formation',
    'Type Preuve',
    'Contenu Preuve',
    'Date Création',
    'Date Modification'
  ];

  const csvContent = [
    headers.join(','),
    ...competences.map(competence => [
      `"${competence.nom}"`,
      `"${competence.description}"`,
      `"${competence.categorie}"`,
      `"${competence.domaineDeveloppement}"`,
      competence.niveauActuel,
      competence.objectifNiveau,
      Math.round((competence.niveauActuel / competence.objectifNiveau) * 100),
      `"${competence.statut}"`,
      `"${competence.actionPrevue}"`,
      `"${competence.plateformeFomation || ''}"`,
      `"${competence.lienFormation || ''}"`,
      `"${competence.typePreuve}"`,
      `"${competence.contenuPreuve}"`,
      `"${competence.dateCreation.toLocaleDateString('fr-FR')}"`,
      `"${competence.dateModification.toLocaleDateString('fr-FR')}"`
    ].join(','))
  ].join('\n');

  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `competences_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

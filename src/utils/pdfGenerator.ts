
import jsPDF from 'jspdf';

interface Formation {
  id: string;
  titre: string;
  description: string;
  objectifs: string;
  programme: string;
  duree: string;
  public: string;
  version: number;
  dateCreation: string;
  dateModification: string;
}

export const generateFormationPDF = (formation: Formation) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;

  // Helper function to add text with word wrapping
  const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 12) => {
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return y + (lines.length * fontSize * 0.35);
  };

  // Header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Programme de Formation', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 15;

  // Title
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  yPosition = addWrappedText(formation.titre, margin, yPosition, pageWidth - 2 * margin, 16);
  yPosition += 10;

  // Version and dates
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Version: ${formation.version}`, margin, yPosition);
  doc.text(`Durée: ${formation.duree}`, pageWidth - margin - 60, yPosition);
  yPosition += 8;
  doc.text(`Créé le: ${new Date(formation.dateCreation).toLocaleDateString('fr-FR')}`, margin, yPosition);
  doc.text(`Modifié le: ${new Date(formation.dateModification).toLocaleDateString('fr-FR')}`, pageWidth - margin - 80, yPosition);
  yPosition += 15;

  // Description
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Description', margin, yPosition);
  yPosition += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  yPosition = addWrappedText(formation.description, margin, yPosition, pageWidth - 2 * margin, 11);
  yPosition += 10;

  // Check if we need a new page
  if (yPosition > pageHeight - 60) {
    doc.addPage();
    yPosition = margin;
  }

  // Public cible
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Public cible', margin, yPosition);
  yPosition += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  yPosition = addWrappedText(formation.public, margin, yPosition, pageWidth - 2 * margin, 11);
  yPosition += 10;

  // Check if we need a new page
  if (yPosition > pageHeight - 60) {
    doc.addPage();
    yPosition = margin;
  }

  // Objectifs
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Objectifs pédagogiques', margin, yPosition);
  yPosition += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  yPosition = addWrappedText(formation.objectifs, margin, yPosition, pageWidth - 2 * margin, 11);
  yPosition += 10;

  // Check if we need a new page
  if (yPosition > pageHeight - 60) {
    doc.addPage();
    yPosition = margin;
  }

  // Programme
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Programme détaillé', margin, yPosition);
  yPosition += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  yPosition = addWrappedText(formation.programme, margin, yPosition, pageWidth - 2 * margin, 11);

  // Footer
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(`Certifié Qualiopi - Page ${i}/${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
  }

  // Generate filename
  const fileName = `formation-${formation.titre.replace(/[^a-zA-Z0-9]/g, '_')}-v${formation.version}.pdf`;
  
  // Download the PDF
  doc.save(fileName);
};

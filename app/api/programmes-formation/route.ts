import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { ProgrammeFormation } from '@/types/programme';

// Utilisation de PrismaClient avec singleton pattern pour éviter trop de connexions
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
}

// Données de démonstration pour le développement
const mockProgrammes: ProgrammeFormation[] = [
  {
    id: '1',
    code: 'DEV-WEB-001',
    titre: 'Formation Développeur Web Front-End',
    description: 'Formation complète pour devenir développeur web front-end',
    type: 'catalogue',
    duree: '35 heures',
    modalites: 'Présentiel',
    categorieId: '1',
    categorie: {
      id: '1',
      titre: 'Développement Web',
      code: 'DEV-WEB',
      description: 'Formations en développement web'
    },
    estActif: true
  },
  {
    id: '2',
    code: 'DATA-SCI-001',
    titre: 'Initiation à la Data Science',
    description: 'Formation pour démarrer dans le domaine de la data science',
    type: 'catalogue',
    duree: '21 heures',
    modalites: 'Distanciel',
    categorieId: '2',
    categorie: {
      id: '2',
      titre: 'Data Science',
      code: 'DATA-SCI',
      description: 'Formations en data science et analyse de données'
    },
    estActif: true
  }
];

export async function GET() {
  try {
    // Tentative d'utilisation de Prisma si disponible
    try {
      const programmes = await prisma.programmeFormation.findMany({
        include: { categorie: true },
        where: { estActif: true }
      });
      return NextResponse.json(programmes);
    } catch (dbError) {
      console.error('Erreur DB, utilisation des données mock:', dbError);
      // Fallback sur les données mock en cas d'erreur ou si Prisma n'est pas configuré
      return NextResponse.json(mockProgrammes);
    }
  } catch (error) {
    console.error('Erreur GET programmes-formation:', error);
    return NextResponse.json(
      { error: 'Erreur serveur lors de la récupération des programmes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validation basique des champs requis
    if (!data.titre || !data.code || !data.description || !data.categorieId) {
      return NextResponse.json(
        { error: 'Champs obligatoires manquants' },
        { status: 400 }
      );
    }

    // Tentative d'utilisation de Prisma si disponible
    try {
      const nouveauProgramme = await prisma.programmeFormation.create({
        data: {
          ...data,
          estActif: data.estActif ?? true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        include: { categorie: true }
      });
      return NextResponse.json(nouveauProgramme, { status: 201 });
    } catch (dbError) {
      console.error('Erreur DB création, simulation avec mock:', dbError);
      // Simulation de création avec un ID unique
      const nouveauId = Date.now().toString();
      const nouveauProgramme = { ...data, id: nouveauId, estActif: data.estActif ?? true };
      mockProgrammes.push(nouveauProgramme as ProgrammeFormation);
      return NextResponse.json(nouveauProgramme, { status: 201 });
    }
  } catch (error) {
    console.error('Erreur POST programmes-formation:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du programme de formation' },
      { status: 500 }
    );
  }
}

// Handler PUT pour modifier un programme existant
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    
    if (!data.id) {
      return NextResponse.json(
        { error: 'ID du programme requis' },
        { status: 400 }
      );
    }

    // Tentative d'utilisation de Prisma si disponible
    try {
      const programmeExistant = await prisma.programmeFormation.findUnique({
        where: { id: data.id }
      });

      if (!programmeExistant) {
        return NextResponse.json(
          { error: 'Programme non trouvé' },
          { status: 404 }
        );
      }

      const programmeMisAJour = await prisma.programmeFormation.update({
        where: { id: data.id },
        data: {
          ...data,
          updatedAt: new Date()
        },
        include: { categorie: true }
      });

      return NextResponse.json(programmeMisAJour);
    } catch (dbError) {
      console.error('Erreur DB modification, simulation avec mock:', dbError);
      // Simulation de mise à jour avec des données mock
      const index = mockProgrammes.findIndex(p => p.id === data.id);
      if (index === -1) {
        return NextResponse.json(
          { error: 'Programme non trouvé' },
          { status: 404 }
        );
      }
      mockProgrammes[index] = { ...mockProgrammes[index], ...data };
      return NextResponse.json(mockProgrammes[index]);
    }
  } catch (error) {
    console.error('Erreur PUT programmes-formation:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la modification du programme' },
      { status: 500 }
    );
  }
}

// Handler DELETE pour supprimer un programme
export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID du programme requis' },
        { status: 400 }
      );
    }

    // Tentative d'utilisation de Prisma si disponible
    try {
      const programmeExistant = await prisma.programmeFormation.findUnique({
        where: { id }
      });

      if (!programmeExistant) {
        return NextResponse.json(
          { error: 'Programme non trouvé' },
          { status: 404 }
        );
      }

      // Option 1: Suppression physique
      // await prisma.programmeFormation.delete({ where: { id } });

      // Option 2: Suppression logique (recommandée)
      await prisma.programmeFormation.update({
        where: { id },
        data: { estActif: false }
      });

      return NextResponse.json({ message: 'Programme supprimé avec succès' });
    } catch (dbError) {
      console.error('Erreur DB suppression, simulation avec mock:', dbError);
      // Simulation de suppression avec des données mock
      const index = mockProgrammes.findIndex(p => p.id === id);
      if (index === -1) {
        return NextResponse.json(
          { error: 'Programme non trouvé' },
          { status: 404 }
        );
      }
      // Suppression logique
      mockProgrammes[index].estActif = false;
      return NextResponse.json({ message: 'Programme supprimé avec succès' });
    }
  } catch (error) {
    console.error('Erreur DELETE programmes-formation:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du programme' },
      { status: 500 }
    );
  }
}

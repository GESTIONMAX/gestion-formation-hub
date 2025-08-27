import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const searchParams = request.nextUrl.searchParams;
    const etape = searchParams.get('etape'); // avant, pendant, apres
    
    // Récupérer tous les dossiers de l'apprenant
    const dossiers = await prisma.dossierFormation.findMany({
      where: { apprenantId: id },
      include: {
        programme: true,
      },
    });
    
    const dossierIds = dossiers.map(dossier => dossier.id);
    
    // Construire la clause where pour filtrer par étape si nécessaire
    const whereClause: any = { 
      dossierFormationId: { in: dossierIds } 
    };
    
    if (etape) {
      whereClause.etape = etape;
    }
    
    // Récupérer les documents
    const documents = await prisma.documentFormation.findMany({
      where: whereClause,
      include: {
        dossierFormation: {
          include: {
            programme: true,
          },
        },
      },
      orderBy: {
        dateCreation: 'desc',
      },
    });
    
    // Organiser les documents par étape
    const documentsParEtape = {
      avant: documents.filter(doc => doc.etape === 'avant'),
      pendant: documents.filter(doc => doc.etape === 'pendant'),
      apres: documents.filter(doc => doc.etape === 'apres'),
    };
    
    return NextResponse.json({
      dossiers,
      documents,
      documentsParEtape,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des documents:', error);
    return NextResponse.json(
      { error: 'Erreur serveur lors de la récupération des documents' },
      { status: 500 }
    );
  }
}

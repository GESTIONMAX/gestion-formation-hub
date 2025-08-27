import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const apprenant = await prisma.apprenant.findUnique({
      where: { id },
      include: {
        dossiers: {
          include: {
            programme: true,
            documents: true,
          },
          orderBy: {
            dateInscription: 'desc',
          },
        },
      },
    });

    if (!apprenant) {
      return NextResponse.json(
        { error: 'Apprenant non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json(apprenant);
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de l\'apprenant:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await request.json();

    const apprenant = await prisma.apprenant.update({
      where: { id },
      data,
    });

    return NextResponse.json(apprenant);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'apprenant:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

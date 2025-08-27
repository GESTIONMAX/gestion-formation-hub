import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../../lib/prisma/client';
import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { verifyApprenantAuth } from '../../../../../../lib/auth/apprenantsMiddleware';

// Durée de validité du token en secondes (24h)
const TOKEN_EXPIRATION = 24 * 60 * 60;

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Vérifier l'authentification
    const authResult = await verifyApprenantAuth(request);
    if (!authResult.authenticated) {
      return NextResponse.json(
        { success: false, message: authResult.error },
        { status: 401 }
      );
    }

    // Vérifier que l'ID dans l'URL correspond à l'ID de l'apprenant authentifié
    if (authResult.apprenantId !== params.id) {
      return NextResponse.json(
        { success: false, message: 'Accès non autorisé' },
        { status: 403 }
      );
    }

    const { motDePasse } = await request.json();

    // Valider le mot de passe
    if (!motDePasse || motDePasse.length < 8) {
      return NextResponse.json(
        { success: false, message: 'Le mot de passe doit contenir au moins 8 caractères' },
        { status: 400 }
      );
    }

    // Hasher le nouveau mot de passe
    const hashedPassword = await hash(motDePasse, 10);

    // Générer un nouveau token JWT
    const token = sign(
      {
        userId: params.id,
        email: authResult.email,
        role: 'apprenant',
      },
      process.env.JWT_SECRET || 'secret-fallback-not-secure',
      { expiresIn: TOKEN_EXPIRATION }
    );

    // Calculer la date d'expiration du token
    const dateExpirationToken = new Date();
    dateExpirationToken.setSeconds(dateExpirationToken.getSeconds() + TOKEN_EXPIRATION);
    
    // Récupérer l'apprenant actuel
    const apprenant = await prisma.apprenant.findUnique({
      where: { id: params.id },
    });
    
    if (!apprenant) {
      return NextResponse.json(
        { success: false, message: 'Apprenant non trouvé' },
        { status: 404 }
      );
    }

    // Utiliser $executeRaw pour contourner les vérifications de typage
    await prisma.$executeRaw`
      UPDATE "apprenants" 
      SET "mot_de_passe" = ${hashedPassword}, 
          "token_acces" = ${token}, 
          "date_expiration_token" = ${dateExpirationToken}, 
          "premier_acces" = false 
      WHERE "id" = ${params.id}
    `;

    return NextResponse.json({
      success: true,
      message: 'Mot de passe modifié avec succès',
      newToken: token,
    });
  } catch (error) {
    console.error('Erreur lors du changement de mot de passe:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors du changement de mot de passe' },
      { status: 500 }
    );
  }
}

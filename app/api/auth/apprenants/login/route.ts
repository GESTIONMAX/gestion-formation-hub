import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma/client';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

// Durée de validité du token en secondes (24h)
const TOKEN_EXPIRATION = 24 * 60 * 60;

export async function POST(request: NextRequest) {
  try {
    const { email, motDePasse } = await request.json();

    if (!email || !motDePasse) {
      return NextResponse.json(
        { success: false, message: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    // Rechercher l'apprenant par email
    const apprenant = await prisma.apprenant.findUnique({
      where: { email },
      select: {
        id: true,
        nom: true,
        prenom: true,
        email: true,
        motDePasse: true,
        estActif: true,
        premierAcces: true,
      },
    });

    if (!apprenant) {
      return NextResponse.json(
        { success: false, message: 'Identifiants invalides' },
        { status: 401 }
      );
    }

    if (!apprenant.estActif) {
      return NextResponse.json(
        { success: false, message: 'Ce compte a été désactivé' },
        { status: 403 }
      );
    }

    if (!apprenant.motDePasse) {
      return NextResponse.json(
        { success: false, message: 'Aucun mot de passe défini pour ce compte' },
        { status: 401 }
      );
    }

    // Vérifier le mot de passe
    const passwordMatch = await compare(motDePasse, apprenant.motDePasse);
    if (!passwordMatch) {
      return NextResponse.json(
        { success: false, message: 'Identifiants invalides' },
        { status: 401 }
      );
    }

    // Générer un token JWT
    const token = sign(
      {
        userId: apprenant.id,
        email: apprenant.email,
        role: 'apprenant',
      },
      process.env.JWT_SECRET || 'secret-fallback-not-secure',
      { expiresIn: TOKEN_EXPIRATION }
    );

    // Calculer la date d'expiration du token
    const dateExpirationToken = new Date();
    dateExpirationToken.setSeconds(dateExpirationToken.getSeconds() + TOKEN_EXPIRATION);

    // Mettre à jour le token dans la base de données
    await prisma.apprenant.update({
      where: { id: apprenant.id },
      data: {
        tokenAcces: token,
        dateExpirationToken,
        premierAcces: false,
      },
    });

    return NextResponse.json({
      success: true,
      token,
      apprenant: {
        id: apprenant.id,
        nom: apprenant.nom,
        prenom: apprenant.prenom,
        email: apprenant.email,
        premierAcces: apprenant.premierAcces,
      },
      expiration: dateExpirationToken,
    });
  } catch (error) {
    console.error('Erreur lors de l\'authentification:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de l\'authentification' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma/client';
import { hash } from 'bcrypt';
import { randomBytes } from 'crypto';
import { sendMail } from '../../../../../lib/services/mailService';

// Fonction pour générer un mot de passe aléatoire
function generateRandomPassword(length = 10) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
  const bytes = randomBytes(length);
  let password = '';

  for (let i = 0; i < length; i++) {
    const index = bytes[i] % charset.length;
    password += charset[index];
  }

  return password;
}

// Route pour générer/réinitialiser le mot de passe d'un apprenant
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email requis' },
        { status: 400 }
      );
    }

    // Vérifier si l'apprenant existe
    const apprenant = await prisma.apprenant.findUnique({
      where: { email },
      select: {
        id: true,
        nom: true,
        prenom: true,
        email: true,
        estActif: true,
      },
    });

    if (!apprenant) {
      return NextResponse.json(
        { success: false, message: 'Aucun apprenant trouvé avec cet email' },
        { status: 404 }
      );
    }

    if (!apprenant.estActif) {
      return NextResponse.json(
        { success: false, message: 'Ce compte a été désactivé' },
        { status: 403 }
      );
    }

    // Générer un nouveau mot de passe
    const newPassword = generateRandomPassword();
    
    // Hasher le mot de passe
    const hashedPassword = await hash(newPassword, 10);

    // Mettre à jour le mot de passe dans la base de données
    await prisma.apprenant.update({
      where: { id: apprenant.id },
      data: {
        motDePasse: hashedPassword,
        premierAcces: true, // Forcer le premier accès pour demander le changement de mot de passe
      },
    });

    // Envoyer le mot de passe par email (dans un environnement de production)
    try {
      await sendMail({
        to: apprenant.email,
        subject: 'Votre nouveau mot de passe GestionMax',
        text: `Bonjour ${apprenant.prenom || apprenant.nom},\n\nVoici votre nouveau mot de passe pour accéder à votre espace apprenant : ${newPassword}\n\nNous vous recommandons de le changer lors de votre première connexion.\n\nL'équipe GestionMax`,
      });
    } catch (emailError) {
      console.error('Erreur lors de l\'envoi de l\'email:', emailError);
      // On continue même si l'email échoue, l'administrateur pourra communiquer le mot de passe manuellement
    }

    return NextResponse.json({
      success: true,
      message: 'Mot de passe réinitialisé avec succès',
      // En développement uniquement, retourner le mot de passe
      ...(process.env.NODE_ENV === 'development' && { password: newPassword }),
    });
  } catch (error) {
    console.error('Erreur lors de la réinitialisation du mot de passe:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la réinitialisation du mot de passe' },
      { status: 500 }
    );
  }
}

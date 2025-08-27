import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import { prisma } from '../prisma/client';

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

/**
 * Vérifie que l'utilisateur est un apprenant authentifié
 */
export async function verifyApprenantAuth(request: NextRequest) {
  try {
    // Récupérer le token depuis le header Authorization ou le cookie
    const authHeader = request.headers.get('Authorization');
    let token;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      // Token présent dans le header Authorization
      token = authHeader.substring(7);
    } else {
      // Essayer de récupérer le token depuis les cookies
      const tokenCookie = request.cookies.get('apprenant_token');
      if (!tokenCookie?.value) {
        return { authenticated: false, error: 'Token d\'authentification manquant' };
      }
      token = tokenCookie.value;
    }

    // Vérifier le token JWT
    const secret = process.env.JWT_SECRET || 'secret-fallback-not-secure';
    const decoded = verify(token, secret) as JwtPayload;

    // Vérifier que le token appartient à un apprenant
    if (decoded.role !== 'apprenant') {
      return { authenticated: false, error: 'Role invalide' };
    }

    // Vérifier que l'apprenant existe et est actif
    const apprenant = await prisma.apprenant.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        estActif: true,
        tokenAcces: true,
        dateExpirationToken: true,
      },
    });

    if (!apprenant) {
      return { authenticated: false, error: 'Apprenant non trouvé' };
    }

    if (!apprenant.estActif) {
      return { authenticated: false, error: 'Compte apprenant inactif' };
    }

    // Vérifier que le token en base correspond au token fourni
    if (apprenant.tokenAcces !== token) {
      return { authenticated: false, error: 'Token invalide ou expiré' };
    }

    // Vérifier que le token n'est pas expiré
    if (apprenant.dateExpirationToken && new Date() > apprenant.dateExpirationToken) {
      return { authenticated: false, error: 'Token expiré' };
    }

    // L'utilisateur est authentifié avec succès
    return { 
      authenticated: true, 
      apprenantId: apprenant.id, 
      email: apprenant.email 
    };
  } catch (error) {
    console.error('Erreur d\'authentification:', error);
    return { authenticated: false, error: 'Erreur d\'authentification' };
  }
}

/**
 * Middleware pour protéger les routes API des apprenants
 */
export async function apprenantApiMiddleware(request: NextRequest) {
  const authResult = await verifyApprenantAuth(request);
  
  if (!authResult.authenticated) {
    return NextResponse.json(
      { success: false, message: authResult.error },
      { status: 401 }
    );
  }

  // On continue avec la requête, l'authentification est validée
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('X-Apprenant-Id', authResult.apprenantId);
  requestHeaders.set('X-Apprenant-Email', authResult.email);
  
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

/**
 * Middleware pour protéger les routes pages des apprenants
 */
export async function apprenantPageMiddleware(request: NextRequest) {
  const authResult = await verifyApprenantAuth(request);
  
  if (!authResult.authenticated) {
    const loginUrl = new URL('/apprenants/login', request.url);
    loginUrl.searchParams.set('redirectUrl', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // On continue avec la requête, l'authentification est validée
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('X-Apprenant-Id', authResult.apprenantId);
  requestHeaders.set('X-Apprenant-Email', authResult.email);
  
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

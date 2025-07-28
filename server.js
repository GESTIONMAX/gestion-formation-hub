// server.js
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import { default as CredentialsProvider } from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prisma = new PrismaClient();

const app = express();
const port = 3000;

// Activer CORS pour toutes les requêtes
app.use(cors());
app.use(express.json());

// Configuration NextAuth
const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            }
          });
          
          if (!user || !user.password) {
            return null;
          }
          
          const passwordMatch = await bcrypt.compare(credentials.password, user.password);
          
          if (!passwordMatch) {
            return null;
          }
          
          return {
            id: user.id,
            email: user.email,
            name: `${user.prenom} ${user.nom}`,
            role: user.role,
            prenom: user.prenom,
            nom: user.nom
          };
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.prenom = user.prenom;
        token.nom = user.nom;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.prenom = token.prenom;
        session.user.nom = token.nom;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 jours
  },
  secret: process.env.NEXTAUTH_SECRET
};

// Route API NextAuth.js simplifiée
app.post('/api/auth/signin', async (req, res) => {
  try {
    const result = await NextAuth({
      ...authOptions,
      req: req,
      res: res
    });
    res.json(result);
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route de base pour vérifier l'état de la session
app.get('/api/auth/session', async (req, res) => {
  try {
    const result = await NextAuth({
      ...authOptions,
      req: req,
      res: res
    });
    res.json(result);
  } catch (error) {
    console.error('Session error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`API Auth Server listening at http://localhost:${port}`);
});

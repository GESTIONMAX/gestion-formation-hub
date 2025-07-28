import { PrismaClient } from '@prisma/client';

// Exporter une instance PrismaClient pour être utilisée dans toute l'application
const prisma = new PrismaClient();

export default prisma;

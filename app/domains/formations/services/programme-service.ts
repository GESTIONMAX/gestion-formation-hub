import prisma from "../../../../lib/prisma/client";
import { type Programme, type FormationDetails, type ProgrammePersonnalise, type Categorie } from "@prisma/client";

export type ProgrammeWithDetails = Programme & {
  formationDetails?: FormationDetails | null;
  programmePersonnalise?: ProgrammePersonnalise | null;
  categorie: Categorie;
};

export type ProgrammeFilterParams = {
  categorieId?: string;
  search?: string;
  type?: "STANDARD" | "PERSONNALISE";
  page?: number;
  limit?: number;
  published?: boolean;
};

/**
 * Service pour la gestion des programmes de formation
 */
export class ProgrammeService {
  /**
   * Récupère tous les programmes avec pagination et filtres
   */
  static async getAllProgrammes({
    categorieId,
    search,
    type,
    page = 1,
    limit = 10,
    published = true,
  }: ProgrammeFilterParams): Promise<{
    programmes: ProgrammeWithDetails[];
    total: number;
    page: number;
    limit: number;
  }> {
    const skip = (page - 1) * limit;

    // Construction des critères de filtrage
    const where: any = {};
    
    if (published) {
      where.published = true;
    }
    
    if (categorieId) {
      where.categorieId = categorieId;
    }
    
    if (type) {
      if (type === "STANDARD") {
        where.formationDetails = { isNot: null };
      } else if (type === "PERSONNALISE") {
        where.programmePersonnalise = { isNot: null };
      }
    }
    
    if (search) {
      where.OR = [
        { titre: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    // Exécution des requêtes
    const [programmes, total] = await Promise.all([
      prisma.programme.findMany({
        where,
        include: {
          formationDetails: true,
          programmePersonnalise: true,
          categorie: true,
        },
        skip,
        take: limit,
        orderBy: {
          updatedAt: "desc",
        },
      }),
      prisma.programme.count({ where }),
    ]);

    return {
      programmes,
      total,
      page,
      limit,
    };
  }

  /**
   * Récupère un programme par son ID
   */
  static async getProgrammeById(id: string): Promise<ProgrammeWithDetails | null> {
    return prisma.programme.findUnique({
      where: { id },
      include: {
        formationDetails: true,
        programmePersonnalise: true,
        categorie: true,
      },
    });
  }

  /**
   * Crée un nouveau programme standard
   */
  static async createStandardProgramme({
    programme,
    formationDetails,
  }: {
    programme: Omit<Programme, "id" | "createdAt" | "updatedAt">;
    formationDetails: Omit<FormationDetails, "id" | "programmeId">;
  }) {
    return prisma.$transaction(async (tx) => {
      // Créer le programme de base
      const newProgramme = await tx.programme.create({
        data: programme,
      });

      // Ajouter les détails de formation standard
      await tx.formationDetails.create({
        data: {
          ...formationDetails,
          programmeId: newProgramme.id,
        },
      });

      // Retourner le programme créé avec ses détails
      return tx.programme.findUnique({
        where: { id: newProgramme.id },
        include: {
          formationDetails: true,
          categorie: true,
        },
      });
    });
  }

  /**
   * Crée un nouveau programme personnalisé
   */
  static async createPersonnaliseProgramme({
    programme,
    programmePersonnalise,
  }: {
    programme: Omit<Programme, "id" | "createdAt" | "updatedAt">;
    programmePersonnalise: Omit<ProgrammePersonnalise, "id" | "programmeId">;
  }) {
    return prisma.$transaction(async (tx) => {
      // Créer le programme de base
      const newProgramme = await tx.programme.create({
        data: programme,
      });

      // Ajouter les détails du programme personnalisé
      await tx.programmePersonnalise.create({
        data: {
          ...programmePersonnalise,
          programmeId: newProgramme.id,
        },
      });

      // Retourner le programme créé avec ses détails
      return tx.programme.findUnique({
        where: { id: newProgramme.id },
        include: {
          programmePersonnalise: true,
          categorie: true,
        },
      });
    });
  }

  /**
   * Mise à jour d'un programme existant
   */
  static async updateProgramme(
    id: string,
    data: Partial<Programme>
  ): Promise<Programme> {
    return prisma.programme.update({
      where: { id },
      data,
    });
  }

  /**
   * Suppression d'un programme
   */
  static async deleteProgramme(id: string): Promise<boolean> {
    try {
      await prisma.$transaction([
        // Supprimer d'abord les détails associés
        prisma.formationDetails.deleteMany({
          where: { programmeId: id },
        }),
        prisma.programmePersonnalise.deleteMany({
          where: { programmeId: id },
        }),
        // Puis supprimer le programme
        prisma.programme.delete({
          where: { id },
        }),
      ]);
      return true;
    } catch (error) {
      console.error("Erreur lors de la suppression du programme:", error);
      return false;
    }
  }

  /**
   * Récupère toutes les catégories disponibles
   */
  static async getAllCategories(): Promise<Categorie[]> {
    return prisma.categorie.findMany({
      orderBy: {
        nom: "asc",
      },
    });
  }
}

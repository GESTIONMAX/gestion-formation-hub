import { NextResponse } from "next/server";
import { ProgrammeService } from "@/app/domains/formations/services/programme-service";

/**
 * GET /api/categories
 * Récupère la liste de toutes les catégories
 */
export async function GET(request: Request) {
  try {
    const categories = await ProgrammeService.getAllCategories();
    
    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Une erreur est survenue lors de la récupération des catégories",
      },
      { status: 500 }
    );
  }
}

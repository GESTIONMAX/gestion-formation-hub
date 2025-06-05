export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      competences: {
        Row: {
          action_prevue: string
          categorie: Database["public"]["Enums"]["categorie_competence"]
          contenu_preuve: string
          created_at: string
          date_creation: string
          date_modification: string
          description: string
          domaine_developpement: string
          formateur_id: string | null
          id: string
          lien_formation: string | null
          niveau_actuel: number
          nom: string
          objectif_niveau: number
          plateforme_formation: string | null
          statut: Database["public"]["Enums"]["statut_competence"]
          type_preuve: Database["public"]["Enums"]["type_preuve"]
          updated_at: string
        }
        Insert: {
          action_prevue: string
          categorie: Database["public"]["Enums"]["categorie_competence"]
          contenu_preuve: string
          created_at?: string
          date_creation?: string
          date_modification?: string
          description: string
          domaine_developpement: string
          formateur_id?: string | null
          id?: string
          lien_formation?: string | null
          niveau_actuel: number
          nom: string
          objectif_niveau: number
          plateforme_formation?: string | null
          statut: Database["public"]["Enums"]["statut_competence"]
          type_preuve: Database["public"]["Enums"]["type_preuve"]
          updated_at?: string
        }
        Update: {
          action_prevue?: string
          categorie?: Database["public"]["Enums"]["categorie_competence"]
          contenu_preuve?: string
          created_at?: string
          date_creation?: string
          date_modification?: string
          description?: string
          domaine_developpement?: string
          formateur_id?: string | null
          id?: string
          lien_formation?: string | null
          niveau_actuel?: number
          nom?: string
          objectif_niveau?: number
          plateforme_formation?: string | null
          statut?: Database["public"]["Enums"]["statut_competence"]
          type_preuve?: Database["public"]["Enums"]["type_preuve"]
          updated_at?: string
        }
        Relationships: []
      }
      reclamations: {
        Row: {
          assignee_id: string | null
          created_at: string
          date_resolution: string | null
          email: string
          id: string
          message: string
          nom: string
          notes_internes: string | null
          priorite: Database["public"]["Enums"]["priorite_reclamation"]
          statut: Database["public"]["Enums"]["statut_reclamation"]
          sujet: string
          telephone: string | null
          updated_at: string
        }
        Insert: {
          assignee_id?: string | null
          created_at?: string
          date_resolution?: string | null
          email: string
          id?: string
          message: string
          nom: string
          notes_internes?: string | null
          priorite?: Database["public"]["Enums"]["priorite_reclamation"]
          statut?: Database["public"]["Enums"]["statut_reclamation"]
          sujet: string
          telephone?: string | null
          updated_at?: string
        }
        Update: {
          assignee_id?: string | null
          created_at?: string
          date_resolution?: string | null
          email?: string
          id?: string
          message?: string
          nom?: string
          notes_internes?: string | null
          priorite?: Database["public"]["Enums"]["priorite_reclamation"]
          statut?: Database["public"]["Enums"]["statut_reclamation"]
          sujet?: string
          telephone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      categorie_competence:
        | "technique"
        | "pedagogique"
        | "relationnelle"
        | "organisationnelle"
      priorite_reclamation: "basse" | "normale" | "haute" | "urgente"
      statut_competence: "planifie" | "en-cours" | "realise" | "reporte"
      statut_reclamation: "nouvelle" | "en_cours" | "resolue" | "fermee"
      type_preuve: "fichier" | "url"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      categorie_competence: [
        "technique",
        "pedagogique",
        "relationnelle",
        "organisationnelle",
      ],
      priorite_reclamation: ["basse", "normale", "haute", "urgente"],
      statut_competence: ["planifie", "en-cours", "realise", "reporte"],
      statut_reclamation: ["nouvelle", "en_cours", "resolue", "fermee"],
      type_preuve: ["fichier", "url"],
    },
  },
} as const

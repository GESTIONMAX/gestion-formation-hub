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
      actions_correctives: {
        Row: {
          avancement: number
          created_at: string
          date_echeance: string | null
          description: string
          id: string
          indicateur_efficacite: string | null
          origine_date: string | null
          origine_ref: string | null
          origine_resume: string | null
          origine_type: string
          priorite: string
          responsable_email: string | null
          responsable_nom: string | null
          statut: string
          titre: string
          updated_at: string
        }
        Insert: {
          avancement?: number
          created_at?: string
          date_echeance?: string | null
          description: string
          id?: string
          indicateur_efficacite?: string | null
          origine_date?: string | null
          origine_ref?: string | null
          origine_resume?: string | null
          origine_type: string
          priorite?: string
          responsable_email?: string | null
          responsable_nom?: string | null
          statut?: string
          titre: string
          updated_at?: string
        }
        Update: {
          avancement?: number
          created_at?: string
          date_echeance?: string | null
          description?: string
          id?: string
          indicateur_efficacite?: string | null
          origine_date?: string | null
          origine_ref?: string | null
          origine_resume?: string | null
          origine_type?: string
          priorite?: string
          responsable_email?: string | null
          responsable_nom?: string | null
          statut?: string
          titre?: string
          updated_at?: string
        }
        Relationships: []
      }
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
      documents_actions_correctives: {
        Row: {
          action_corrective_id: string
          auteur: string
          created_at: string
          date_document: string
          id: string
          nom: string
          type: string
          url: string | null
        }
        Insert: {
          action_corrective_id: string
          auteur: string
          created_at?: string
          date_document?: string
          id?: string
          nom: string
          type: string
          url?: string | null
        }
        Update: {
          action_corrective_id?: string
          auteur?: string
          created_at?: string
          date_document?: string
          id?: string
          nom?: string
          type?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_actions_correctives_action_corrective_id_fkey"
            columns: ["action_corrective_id"]
            isOneToOne: false
            referencedRelation: "actions_correctives"
            referencedColumns: ["id"]
          },
        ]
      }
      documents_formation: {
        Row: {
          contenu_json: Json | null
          created_at: string
          date_generation: string
          dossier_formation_id: string | null
          id: string
          nom_fichier: string
          statut: string
          type_document: string
          updated_at: string
          url_document: string | null
        }
        Insert: {
          contenu_json?: Json | null
          created_at?: string
          date_generation?: string
          dossier_formation_id?: string | null
          id?: string
          nom_fichier: string
          statut?: string
          type_document: string
          updated_at?: string
          url_document?: string | null
        }
        Update: {
          contenu_json?: Json | null
          created_at?: string
          date_generation?: string
          dossier_formation_id?: string | null
          id?: string
          nom_fichier?: string
          statut?: string
          type_document?: string
          updated_at?: string
          url_document?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_formation_dossier_formation_id_fkey"
            columns: ["dossier_formation_id"]
            isOneToOne: false
            referencedRelation: "dossiers_formation"
            referencedColumns: ["id"]
          },
        ]
      }
      dossiers_formation: {
        Row: {
          apprenant_email: string
          apprenant_nom: string
          apprenant_prenom: string
          created_at: string
          date_debut: string | null
          date_fin: string | null
          formation_titre: string
          id: string
          notes_formateur: string | null
          numero_dossier: string | null
          programme_personnalise_id: string | null
          statut: string
          updated_at: string
        }
        Insert: {
          apprenant_email: string
          apprenant_nom: string
          apprenant_prenom: string
          created_at?: string
          date_debut?: string | null
          date_fin?: string | null
          formation_titre: string
          id?: string
          notes_formateur?: string | null
          numero_dossier?: string | null
          programme_personnalise_id?: string | null
          statut?: string
          updated_at?: string
        }
        Update: {
          apprenant_email?: string
          apprenant_nom?: string
          apprenant_prenom?: string
          created_at?: string
          date_debut?: string | null
          date_fin?: string | null
          formation_titre?: string
          id?: string
          notes_formateur?: string | null
          numero_dossier?: string | null
          programme_personnalise_id?: string | null
          statut?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "dossiers_formation_programme_personnalise_id_fkey"
            columns: ["programme_personnalise_id"]
            isOneToOne: false
            referencedRelation: "programmes_personnalises"
            referencedColumns: ["id"]
          },
        ]
      }
      historique_actions_correctives: {
        Row: {
          action: string
          action_corrective_id: string
          commentaire: string | null
          created_at: string
          date_action: string
          id: string
          utilisateur: string
        }
        Insert: {
          action: string
          action_corrective_id: string
          commentaire?: string | null
          created_at?: string
          date_action?: string
          id?: string
          utilisateur: string
        }
        Update: {
          action?: string
          action_corrective_id?: string
          commentaire?: string | null
          created_at?: string
          date_action?: string
          id?: string
          utilisateur?: string
        }
        Relationships: [
          {
            foreignKeyName: "historique_actions_correctives_action_corrective_id_fkey"
            columns: ["action_corrective_id"]
            isOneToOne: false
            referencedRelation: "actions_correctives"
            referencedColumns: ["id"]
          },
        ]
      }
      positionnement_requests: {
        Row: {
          adresse: string | null
          attestation_besoin: boolean | null
          code_postal: string | null
          created_at: string
          date_naissance: string | null
          email: string
          experience_wordpress: string | null
          formation_selectionnee: string | null
          id: string
          niveau_maitrise: string | null
          nom_beneficiaire: string
          objectifs_principaux: string | null
          prenom_beneficiaire: string
          programme_formation: string | null
          sexe: string | null
          situation_handicap: string | null
          status: string | null
          statut: string | null
          telephone: string
          updated_at: string
          ville: string | null
        }
        Insert: {
          adresse?: string | null
          attestation_besoin?: boolean | null
          code_postal?: string | null
          created_at?: string
          date_naissance?: string | null
          email: string
          experience_wordpress?: string | null
          formation_selectionnee?: string | null
          id?: string
          niveau_maitrise?: string | null
          nom_beneficiaire: string
          objectifs_principaux?: string | null
          prenom_beneficiaire: string
          programme_formation?: string | null
          sexe?: string | null
          situation_handicap?: string | null
          status?: string | null
          statut?: string | null
          telephone: string
          updated_at?: string
          ville?: string | null
        }
        Update: {
          adresse?: string | null
          attestation_besoin?: boolean | null
          code_postal?: string | null
          created_at?: string
          date_naissance?: string | null
          email?: string
          experience_wordpress?: string | null
          formation_selectionnee?: string | null
          id?: string
          niveau_maitrise?: string | null
          nom_beneficiaire?: string
          objectifs_principaux?: string | null
          prenom_beneficiaire?: string
          programme_formation?: string | null
          sexe?: string | null
          situation_handicap?: string | null
          status?: string | null
          statut?: string | null
          telephone?: string
          updated_at?: string
          ville?: string | null
        }
        Relationships: []
      }
      programmes_personnalises: {
        Row: {
          competences_visees: string[] | null
          created_at: string
          duree_estimee: number | null
          evaluation_prevue: string | null
          id: string
          modalites_pedagogiques: string | null
          objectifs_specifiques: string | null
          planning_propose: Json | null
          positionnement_request_id: string | null
          prerequis_adaptes: string | null
          ressources_necessaires: string[] | null
          statut: string
          titre: string
          updated_at: string
        }
        Insert: {
          competences_visees?: string[] | null
          created_at?: string
          duree_estimee?: number | null
          evaluation_prevue?: string | null
          id?: string
          modalites_pedagogiques?: string | null
          objectifs_specifiques?: string | null
          planning_propose?: Json | null
          positionnement_request_id?: string | null
          prerequis_adaptes?: string | null
          ressources_necessaires?: string[] | null
          statut?: string
          titre: string
          updated_at?: string
        }
        Update: {
          competences_visees?: string[] | null
          created_at?: string
          duree_estimee?: number | null
          evaluation_prevue?: string | null
          id?: string
          modalites_pedagogiques?: string | null
          objectifs_specifiques?: string | null
          planning_propose?: Json | null
          positionnement_request_id?: string | null
          prerequis_adaptes?: string | null
          ressources_necessaires?: string[] | null
          statut?: string
          titre?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "programmes_personnalises_positionnement_request_id_fkey"
            columns: ["positionnement_request_id"]
            isOneToOne: false
            referencedRelation: "positionnement_requests"
            referencedColumns: ["id"]
          },
        ]
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
      create_positionnement_request: {
        Args:
          | {
              p_nom_beneficiaire: string
              p_prenom_beneficiaire: string
              p_email: string
              p_telephone: string
              p_formation_selectionnee?: string
              p_date_naissance?: string
              p_sexe?: string
              p_situation_handicap?: string
              p_adresse?: string
              p_code_postal?: string
              p_ville?: string
              p_statut?: string
              p_experience_wordpress?: string
              p_objectifs_principaux?: string
              p_competences_recherchees?: string
              p_niveau_maitrise?: string
              p_programme_formation?: string
            }
          | {
              p_nom_beneficiaire: string
              p_prenom_beneficiaire: string
              p_email: string
              p_telephone: string
              p_formation_selectionnee?: string
              p_date_naissance?: string
              p_sexe?: string
              p_situation_handicap?: string
              p_adresse?: string
              p_code_postal?: string
              p_ville?: string
              p_statut?: string
              p_experience_wordpress?: string
              p_objectifs_principaux?: string
              p_niveau_maitrise?: string
              p_programme_formation?: string
            }
        Returns: string
      }
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

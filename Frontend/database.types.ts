export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      capacity_logs: {
        Row: {
          created_at: string
          hours_logged: number | null
          id: string
          stress_level: number | null
          tenant_id: string
          user_id: string | null
          week_start: string | null
        }
        Insert: {
          created_at?: string
          hours_logged?: number | null
          id?: string
          stress_level?: number | null
          tenant_id: string
          user_id?: string | null
          week_start?: string | null
        }
        Update: {
          created_at?: string
          hours_logged?: number | null
          id?: string
          stress_level?: number | null
          tenant_id?: string
          user_id?: string | null
          week_start?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "capacity_logs_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "capacity_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          contact_name: string | null
          created_at: string
          email: string | null
          health_score: number | null
          id: string
          last_interaction: string | null
          logo_symbol: string | null
          name: string
          onboarding_status: string | null
          phone: string | null
          status: string | null
          stripe_customer_id: string | null
          tenant_id: string
          tier: string | null
          total_revenue: number | null
          website: string | null
        }
        Insert: {
          contact_name?: string | null
          created_at?: string
          email?: string | null
          health_score?: number | null
          id?: string
          last_interaction?: string | null
          logo_symbol?: string | null
          name: string
          onboarding_status?: string | null
          phone?: string | null
          status?: string | null
          stripe_customer_id?: string | null
          tenant_id: string
          tier?: string | null
          total_revenue?: number | null
          website?: string | null
        }
        Update: {
          contact_name?: string | null
          created_at?: string
          email?: string | null
          health_score?: number | null
          id?: string
          last_interaction?: string | null
          logo_symbol?: string | null
          name?: string
          onboarding_status?: string | null
          phone?: string | null
          status?: string | null
          stripe_customer_id?: string | null
          tenant_id?: string
          tier?: string | null
          total_revenue?: number | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clients_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          amount: number
          client_id: string | null
          id: string
          issued_at: string | null
          status: string | null
          tenant_id: string
        }
        Insert: {
          amount: number
          client_id?: string | null
          id?: string
          issued_at?: string | null
          status?: string | null
          tenant_id: string
        }
        Update: {
          amount?: number
          client_id?: string | null
          id?: string
          issued_at?: string | null
          status?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          created_at: string
          email: string
          estimated_value: number | null
          id: string
          interested_in_offering_id: string | null
          name: string | null
          probability: number | null
          source: string | null
          status: string | null
          tenant_id: string
        }
        Insert: {
          created_at?: string
          email: string
          estimated_value?: number | null
          id?: string
          interested_in_offering_id?: string | null
          name?: string | null
          probability?: number | null
          source?: string | null
          status?: string | null
          tenant_id: string
        }
        Update: {
          created_at?: string
          email?: string
          estimated_value?: number | null
          id?: string
          interested_in_offering_id?: string | null
          name?: string | null
          probability?: number | null
          source?: string | null
          status?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "leads_interested_in_offering_id_fkey"
            columns: ["interested_in_offering_id"]
            isOneToOne: false
            referencedRelation: "offerings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      legal_docs: {
        Row: {
          client_id: string | null
          content_markdown: string | null
          created_at: string
          id: string
          ip_address: string | null
          is_active: boolean | null
          signed_at: string | null
          tenant_id: string
          title: string
          type: string | null
          version: string | null
        }
        Insert: {
          client_id?: string | null
          content_markdown?: string | null
          created_at?: string
          id?: string
          ip_address?: string | null
          is_active?: boolean | null
          signed_at?: string | null
          tenant_id: string
          title: string
          type?: string | null
          version?: string | null
        }
        Update: {
          client_id?: string | null
          content_markdown?: string | null
          created_at?: string
          id?: string
          ip_address?: string | null
          is_active?: boolean | null
          signed_at?: string | null
          tenant_id?: string
          title?: string
          type?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "legal_docs_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "legal_docs_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      offerings: {
        Row: {
          description: string | null
          id: string
          is_public: boolean | null
          name: string
          price: number
          root_sop_id: string | null
          tenant_id: string
        }
        Insert: {
          description?: string | null
          id?: string
          is_public?: boolean | null
          name: string
          price: number
          root_sop_id?: string | null
          tenant_id: string
        }
        Update: {
          description?: string | null
          id?: string
          is_public?: boolean | null
          name?: string
          price?: number
          root_sop_id?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "offerings_root_sop_id_fkey"
            columns: ["root_sop_id"]
            isOneToOne: false
            referencedRelation: "sops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offerings_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          role: string | null
          tenant_id: string
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          role?: string | null
          tenant_id: string
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          client_id: string | null
          deadline: string | null
          id: string
          name: string
          status: string | null
          tenant_id: string
        }
        Insert: {
          client_id?: string | null
          deadline?: string | null
          id?: string
          name: string
          status?: string | null
          tenant_id: string
        }
        Update: {
          client_id?: string | null
          deadline?: string | null
          id?: string
          name?: string
          status?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_projects_clients"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      sops: {
        Row: {
          content_markdown: string | null
          created_at: string
          department: string
          department_icon: string | null
          estimated_time: number | null
          id: string
          is_template: boolean | null
          locked: boolean | null
          tenant_id: string
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          content_markdown?: string | null
          created_at?: string
          department: string
          department_icon?: string | null
          estimated_time?: number | null
          id?: string
          is_template?: boolean | null
          locked?: boolean | null
          tenant_id: string
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          content_markdown?: string | null
          created_at?: string
          department?: string
          department_icon?: string | null
          estimated_time?: number | null
          id?: string
          is_template?: boolean | null
          locked?: boolean | null
          tenant_id?: string
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sops_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          assigned_to: string | null
          created_at: string
          due_date: string | null
          id: string
          project_id: string | null
          sop_id: string | null
          status: string | null
          tenant_id: string
          title: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          due_date?: string | null
          id?: string
          project_id?: string | null
          sop_id?: string | null
          status?: string | null
          tenant_id: string
          title: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          due_date?: string | null
          id?: string
          project_id?: string | null
          sop_id?: string | null
          status?: string | null
          tenant_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_sop_id_fkey"
            columns: ["sop_id"]
            isOneToOne: false
            referencedRelation: "sops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenants: {
        Row: {
          config_json: Json | null
          created_at: string
          id: string
          name: string
          slug: string
          subscription_status: string | null
          tier: string | null
        }
        Insert: {
          config_json?: Json | null
          created_at?: string
          id?: string
          name: string
          slug: string
          subscription_status?: string | null
          tier?: string | null
        }
        Update: {
          config_json?: Json | null
          created_at?: string
          id?: string
          name?: string
          slug?: string
          subscription_status?: string | null
          tier?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_tenant_id: { Args: never; Returns: string }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const


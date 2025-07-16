export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      authorized_admins: {
        Row: {
          created_at: string | null
          email: string
          id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
        }
        Relationships: []
      }
      cows: {
        Row: {
          age: number | null
          birthdate: string | null
          comments: string | null
          created_at: string | null
          father: string | null
          gender: string | null
          id: string
          lactation: boolean | null
          lactationday: string | null
          mother: string | null
          name: string
          origine: string | null
          updated_at: string | null
        }
        Insert: {
          age?: number | null
          birthdate?: string | null
          comments?: string | null
          created_at?: string | null
          father?: string | null
          gender?: string | null
          id?: string
          lactation?: boolean | null
          lactationday?: string | null
          mother?: string | null
          name: string
          origine?: string | null
          updated_at?: string | null
        }
        Update: {
          age?: number | null
          birthdate?: string | null
          comments?: string | null
          created_at?: string | null
          father?: string | null
          gender?: string | null
          id?: string
          lactation?: boolean | null
          lactationday?: string | null
          mother?: string | null
          name?: string
          origine?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      customers: {
        Row: {
          address: string | null
          area: string | null
          contact_number: string | null
          created_at: string | null
          delivery_agent: string | null
          geopin: string | null
          id: string
          name: string
          quantity: number | null
          unit: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          area?: string | null
          contact_number?: string | null
          created_at?: string | null
          delivery_agent?: string | null
          geopin?: string | null
          id?: string
          name: string
          quantity?: number | null
          unit?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          area?: string | null
          contact_number?: string | null
          created_at?: string | null
          delivery_agent?: string | null
          geopin?: string | null
          id?: string
          name?: string
          quantity?: number | null
          unit?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      feed_records: {
        Row: {
          bajari_juvar: number | null
          bajari_makai: number | null
          bajari_sheradi: number | null
          chana_bhusu: number | null
          cow_id: string | null
          created_at: string | null
          deworming: string | null
          disease: string | null
          ghau_bhusu: number | null
          grower_above_6_months: number | null
          grower_below_6_months: number | null
          id: string
          juvar_bajari: number | null
          kapas_khod: number | null
          makai: number | null
          makai_khod: number | null
          medical_note: string | null
          milk_output: number | null
          milk_output_evening: number | null
          milk_output_morning: number | null
          readymade_feed: number | null
          record_date: string | null
          saileg: number | null
          sheradi_kucha: number | null
          tuver_bhusu: number | null
          updated_at: string | null
          vaccine: string | null
          vegetable_waste: number | null
        }
        Insert: {
          bajari_juvar?: number | null
          bajari_makai?: number | null
          bajari_sheradi?: number | null
          chana_bhusu?: number | null
          cow_id?: string | null
          created_at?: string | null
          deworming?: string | null
          disease?: string | null
          ghau_bhusu?: number | null
          grower_above_6_months?: number | null
          grower_below_6_months?: number | null
          id?: string
          juvar_bajari?: number | null
          kapas_khod?: number | null
          makai?: number | null
          makai_khod?: number | null
          medical_note?: string | null
          milk_output?: number | null
          milk_output_evening?: number | null
          milk_output_morning?: number | null
          readymade_feed?: number | null
          record_date?: string | null
          saileg?: number | null
          sheradi_kucha?: number | null
          tuver_bhusu?: number | null
          updated_at?: string | null
          vaccine?: string | null
          vegetable_waste?: number | null
        }
        Update: {
          bajari_juvar?: number | null
          bajari_makai?: number | null
          bajari_sheradi?: number | null
          chana_bhusu?: number | null
          cow_id?: string | null
          created_at?: string | null
          deworming?: string | null
          disease?: string | null
          ghau_bhusu?: number | null
          grower_above_6_months?: number | null
          grower_below_6_months?: number | null
          id?: string
          juvar_bajari?: number | null
          kapas_khod?: number | null
          makai?: number | null
          makai_khod?: number | null
          medical_note?: string | null
          milk_output?: number | null
          milk_output_evening?: number | null
          milk_output_morning?: number | null
          readymade_feed?: number | null
          record_date?: string | null
          saileg?: number | null
          sheradi_kucha?: number | null
          tuver_bhusu?: number | null
          updated_at?: string | null
          vaccine?: string | null
          vegetable_waste?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "feed_records_cow_id_fkey"
            columns: ["cow_id"]
            isOneToOne: false
            referencedRelation: "cows"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          customer_id: string | null
          customer_name: string
          id: string
          item: string
          order_date: string
          quantity: number
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          customer_name: string
          id?: string
          item: string
          order_date: string
          quantity: number
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          customer_name?: string
          id?: string
          item?: string
          order_date?: string
          quantity?: number
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_authorized_admin: {
        Args: { user_email: string }
        Returns: boolean
      }
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
  public: {
    Enums: {},
  },
} as const

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author_name: string | null
          content: string
          created_at: string | null
          excerpt: string | null
          featured_image: string | null
          id: string
          is_published: boolean | null
          published_at: string | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          author_name?: string | null
          content: string
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          is_published?: boolean | null
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          author_name?: string | null
          content?: string
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          is_published?: boolean | null
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      careers: {
        Row: {
          benefits: string[] | null
          created_at: string | null
          department: string
          description: string
          id: string
          is_active: boolean | null
          location: string
          requirements: string[] | null
          salary_range: string | null
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          benefits?: string[] | null
          created_at?: string | null
          department: string
          description: string
          id?: string
          is_active?: boolean | null
          location: string
          requirements?: string[] | null
          salary_range?: string | null
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          benefits?: string[] | null
          created_at?: string | null
          department?: string
          description?: string
          id?: string
          is_active?: boolean | null
          location?: string
          requirements?: string[] | null
          salary_range?: string | null
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      digital_services: {
        Row: {
          category: Database["public"]["Enums"]["digital_category"]
          created_at: string | null
          delivery_time: string | null
          description: string
          features: string[] | null
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          max_price: number | null
          min_price: number | null
          short_description: string | null
          slug: string
          supported_devices: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category: Database["public"]["Enums"]["digital_category"]
          created_at?: string | null
          delivery_time?: string | null
          description: string
          features?: string[] | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          max_price?: number | null
          min_price?: number | null
          short_description?: string | null
          slug: string
          supported_devices?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["digital_category"]
          created_at?: string | null
          delivery_time?: string | null
          description?: string
          features?: string[] | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          max_price?: number | null
          min_price?: number | null
          short_description?: string | null
          slug?: string
          supported_devices?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      investment_plans: {
        Row: {
          created_at: string | null
          description: string | null
          duration_months: number
          features: string[] | null
          id: string
          is_active: boolean | null
          is_popular: boolean | null
          max_deposit: number
          min_deposit: number
          name: string
          profit_rate: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration_months: number
          features?: string[] | null
          id?: string
          is_active?: boolean | null
          is_popular?: boolean | null
          max_deposit: number
          min_deposit: number
          name: string
          profit_rate: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration_months?: number
          features?: string[] | null
          id?: string
          is_active?: boolean | null
          is_popular?: boolean | null
          max_deposit?: number
          min_deposit?: number
          name?: string
          profit_rate?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      service_bookings: {
        Row: {
          budget_range: string | null
          company_name: string | null
          created_at: string | null
          customer_email: string
          customer_name: string
          customer_phone: string | null
          id: string
          project_details: string
          quantity: number | null
          selected_features: string[] | null
          service_id: string | null
          service_type: string | null
          status: string | null
          ticket_id: string
          timeline: string | null
          updated_at: string | null
        }
        Insert: {
          budget_range?: string | null
          company_name?: string | null
          created_at?: string | null
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          id?: string
          project_details: string
          quantity?: number | null
          selected_features?: string[] | null
          service_id?: string | null
          service_type?: string | null
          status?: string | null
          ticket_id: string
          timeline?: string | null
          updated_at?: string | null
        }
        Update: {
          budget_range?: string | null
          company_name?: string | null
          created_at?: string | null
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          id?: string
          project_details?: string
          quantity?: number | null
          selected_features?: string[] | null
          service_id?: string | null
          service_type?: string | null
          status?: string | null
          ticket_id?: string
          timeline?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_bookings_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "software_services"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          id: string
          key: string
          updated_at: string | null
          value: Json
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string | null
          value: Json
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string | null
          value?: Json
        }
        Relationships: []
      }
      social_media_services: {
        Row: {
          category: Database["public"]["Enums"]["social_media_category"]
          created_at: string | null
          delivery_time: string | null
          description: string
          features: string[] | null
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          max_price: number | null
          min_price: number | null
          price_unit: string | null
          short_description: string | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          category: Database["public"]["Enums"]["social_media_category"]
          created_at?: string | null
          delivery_time?: string | null
          description: string
          features?: string[] | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          max_price?: number | null
          min_price?: number | null
          price_unit?: string | null
          short_description?: string | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["social_media_category"]
          created_at?: string | null
          delivery_time?: string | null
          description?: string
          features?: string[] | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          max_price?: number | null
          min_price?: number | null
          price_unit?: string | null
          short_description?: string | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      software_services: {
        Row: {
          category: Database["public"]["Enums"]["software_category"]
          created_at: string | null
          description: string
          features: string[] | null
          icon_name: string | null
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          price_range: string | null
          short_description: string | null
          slug: string
          technologies: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category: Database["public"]["Enums"]["software_category"]
          created_at?: string | null
          description: string
          features?: string[] | null
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          price_range?: string | null
          short_description?: string | null
          slug: string
          technologies?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["software_category"]
          created_at?: string | null
          description?: string
          features?: string[] | null
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          price_range?: string | null
          short_description?: string | null
          slug?: string
          technologies?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      digital_category:
        | "frp_unlock"
        | "mobile_unlock"
        | "iphone_bypass"
        | "apple_id"
        | "gmail_services"
        | "android_flash"
        | "sim_services"
        | "firmware"
        | "device_repair"
      social_media_category:
        | "youtube"
        | "instagram"
        | "facebook"
        | "twitter"
        | "tiktok"
        | "linkedin"
        | "telegram"
        | "spotify"
        | "verified_accounts"
      software_category:
        | "business_management"
        | "education"
        | "healthcare"
        | "hospitality"
        | "retail"
        | "custom_development"
        | "web_development"
        | "mobile_apps"
        | "cloud_solutions"
        | "ecommerce"
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
    Enums: {
      app_role: ["admin", "moderator", "user"],
      digital_category: [
        "frp_unlock",
        "mobile_unlock",
        "iphone_bypass",
        "apple_id",
        "gmail_services",
        "android_flash",
        "sim_services",
        "firmware",
        "device_repair",
      ],
      social_media_category: [
        "youtube",
        "instagram",
        "facebook",
        "twitter",
        "tiktok",
        "linkedin",
        "telegram",
        "spotify",
        "verified_accounts",
      ],
      software_category: [
        "business_management",
        "education",
        "healthcare",
        "hospitality",
        "retail",
        "custom_development",
        "web_development",
        "mobile_apps",
        "cloud_solutions",
        "ecommerce",
      ],
    },
  },
} as const

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      health_specialists: {
        Row: {
          id: string
          name: string
          specialty: string
          location: string
          contact_phone: string | null
          contact_email: string | null
          years_experience: number | null
          rating: number | null
          hourly_rate: number | null
          description: string | null
          therapy_services: string[]
          accessibility_features: string[] | null
          languages_spoken: string[] | null
          availability_hours: Json | null
          created_at: string
          updated_at: string
          embedding: number[] | null
        }
        Insert: {
          id?: string
          name: string
          specialty: string
          location: string
          contact_phone?: string | null
          contact_email?: string | null
          years_experience?: number | null
          rating?: number | null
          hourly_rate?: number | null
          description?: string | null
          therapy_services?: string[]
          accessibility_features?: string[] | null
          languages_spoken?: string[] | null
          availability_hours?: Json | null
          created_at?: string
          updated_at?: string
          embedding?: number[] | null
        }
        Update: {
          id?: string
          name?: string
          specialty?: string
          location?: string
          contact_phone?: string | null
          contact_email?: string | null
          years_experience?: number | null
          rating?: number | null
          hourly_rate?: number | null
          description?: string | null
          therapy_services?: string[]
          accessibility_features?: string[] | null
          languages_spoken?: string[] | null
          availability_hours?: Json | null
          created_at?: string
          updated_at?: string
          embedding?: number[] | null
        }
        Relationships: []
      }
      schools: {
        Row: {
          id: string
          name: string
          type: string
          location: string
          contact_phone: string | null
          contact_email: string | null
          website: string | null
          age_range: string | null
          capacity: number | null
          current_enrollment: number | null
          tuition_fees: number | null
          description: string | null
          special_programs: string[]
          accessibility_features: string[] | null
          languages_of_instruction: string[] | null
          extracurricular_activities: string[] | null
          created_at: string
          updated_at: string
          embedding: number[] | null
        }
        Insert: {
          id?: string
          name: string
          type: string
          location: string
          contact_phone?: string | null
          contact_email?: string | null
          website?: string | null
          age_range?: string | null
          capacity?: number | null
          current_enrollment?: number | null
          tuition_fees?: number | null
          description?: string | null
          special_programs?: string[]
          accessibility_features?: string[] | null
          languages_of_instruction?: string[] | null
          extracurricular_activities?: string[] | null
          created_at?: string
          updated_at?: string
          embedding?: number[] | null
        }
        Update: {
          id?: string
          name?: string
          type?: string
          location?: string
          contact_phone?: string | null
          contact_email?: string | null
          website?: string | null
          age_range?: string | null
          capacity?: number | null
          current_enrollment?: number | null
          tuition_fees?: number | null
          description?: string | null
          special_programs?: string[]
          accessibility_features?: string[] | null
          languages_of_instruction?: string[] | null
          extracurricular_activities?: string[] | null
          created_at?: string
          updated_at?: string
          embedding?: number[] | null
        }
        Relationships: []
      }
      outdoor_clubs: {
        Row: {
          id: string
          name: string
          activity_type: string
          location: string
          contact_phone: string | null
          contact_email: string | null
          website: string | null
          age_range: string
          max_participants: number | null
          current_participants: number | null
          monthly_fee: number | null
          description: string | null
          activities: string[] | null
          support_services: string[] | null
          accessibility_features: string[] | null
          meeting_schedule: string | null
          created_at: string
          updated_at: string
          embedding: number[] | null
        }
        Insert: {
          id?: string
          name: string
          activity_type: string
          location: string
          contact_phone?: string | null
          contact_email?: string | null
          website?: string | null
          age_range?: string
          max_participants?: number | null
          current_participants?: number | null
          monthly_fee?: number | null
          description?: string | null
          activities?: string[] | null
          support_services?: string[] | null
          accessibility_features?: string[] | null
          meeting_schedule?: string | null
          created_at?: string
          updated_at?: string
          embedding?: number[] | null
        }
        Update: {
          id?: string
          name?: string
          activity_type?: string
          location?: string
          contact_phone?: string | null
          contact_email?: string | null
          website?: string | null
          age_range?: string
          max_participants?: number | null
          current_participants?: number | null
          monthly_fee?: number | null
          description?: string | null
          activities?: string[] | null
          support_services?: string[] | null
          accessibility_features?: string[] | null
          meeting_schedule?: string | null
          created_at?: string
          updated_at?: string
          embedding?: number[] | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          id: string
          user_id: string | null
          child_name: string | null
          child_age: number | null
          disability_type: string[] | null
          support_needs: string[] | null
          interests: string[] | null
          location_preference: string | null
          budget_range: string | null
          transportation_needs: boolean | null
          communication_preferences: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          child_name?: string | null
          child_age?: number | null
          disability_type?: string[] | null
          support_needs?: string[] | null
          interests?: string[] | null
          location_preference?: string | null
          budget_range?: string | null
          transportation_needs?: boolean | null
          communication_preferences?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          child_name?: string | null
          child_age?: number | null
          disability_type?: string[] | null
          support_needs?: string[] | null
          interests?: string[] | null
          location_preference?: string | null
          budget_range?: string | null
          transportation_needs?: boolean | null
          communication_preferences?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      search_history: {
        Row: {
          id: string
          user_id: string | null
          search_type: string
          search_query: string | null
          search_filters: Json | null
          results_count: number | null
          ai_enabled: boolean | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          search_type: string
          search_query?: string | null
          search_filters?: Json | null
          results_count?: number | null
          ai_enabled?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          search_type?: string
          search_query?: string | null
          search_filters?: Json | null
          results_count?: number | null
          ai_enabled?: boolean | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "search_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      favorites: {
        Row: {
          id: string
          user_id: string | null
          item_type: string
          item_id: string
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          item_type: string
          item_id: string
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          item_type?: string
          item_id?: string
          notes?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      match_health_specialists: {
        Args: {
          query_embedding: string
          match_threshold?: number
          match_count?: number
        }
        Returns: {
          id: string
          name: string
          specialty: string
          location: string
          contact_phone: string
          contact_email: string
          years_experience: number
          rating: number
          hourly_rate: number
          description: string
          therapy_services: string[]
          accessibility_features: string[]
          languages_spoken: string[]
          similarity: number
        }[]
      }
      match_schools: {
        Args: {
          query_embedding: string
          match_threshold?: number
          match_count?: number
        }
        Returns: {
          id: string
          name: string
          type: string
          location: string
          contact_phone: string
          contact_email: string
          website: string
          age_range: string
          capacity: number
          current_enrollment: number
          tuition_fees: number
          description: string
          special_programs: string[]
          accessibility_features: string[]
          languages_of_instruction: string[]
          extracurricular_activities: string[]
          similarity: number
        }[]
      }
      match_outdoor_clubs: {
        Args: {
          query_embedding: string
          match_threshold?: number
          match_count?: number
        }
        Returns: {
          id: string
          name: string
          activity_type: string
          location: string
          contact_phone: string
          contact_email: string
          website: string
          age_range: string
          max_participants: number
          current_participants: number
          monthly_fee: number
          description: string
          activities: string[]
          support_services: string[]
          accessibility_features: string[]
          meeting_schedule: string
          similarity: number
        }[]
      }
      search_health_specialists_by_vector: {
        Args: {
          query_embedding: number[]
          match_threshold?: number
          match_count?: number
        }
        Returns: {
          id: string
          name: string
          specialty: string
          location: string
          description: string
          similarity: number
        }[]
      }
      search_schools_by_vector: {
        Args: {
          query_embedding: number[]
          match_threshold?: number
          match_count?: number
        }
        Returns: {
          id: string
          name: string
          type: string
          location: string
          description: string
          similarity: number
        }[]
      }
      search_outdoor_clubs_by_vector: {
        Args: {
          query_embedding: number[]
          match_threshold?: number
          match_count?: number
        }
        Returns: {
          id: string
          name: string
          type: string
          location: string
          description: string
          similarity: number
        }[]
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"]) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    ? (PublicSchema["Tables"] & PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema["Enums"] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

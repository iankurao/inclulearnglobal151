export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      favorites: {
        Row: {
          created_at: string
          id: string
          resource_id: string
          resource_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          resource_id: string
          resource_type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          resource_id?: string
          resource_type?: string
          user_id?: string
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
      health_specialists: {
        Row: {
          activities: string[] | null
          bio: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          description: string | null
          embedding: string | null
          id: string
          location: string | null
          name: string | null
          programs: string[] | null
          services: string[] | null
          specialty: string | null
        }
        Insert: {
          activities?: string[] | null
          bio?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          embedding?: string | null
          id?: string
          location?: string | null
          name?: string | null
          programs?: string[] | null
          services?: string[] | null
          specialty?: string | null
        }
        Update: {
          activities?: string[] | null
          bio?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          embedding?: string | null
          id?: string
          location?: string | null
          name?: string | null
          programs?: string[] | null
          services?: string[] | null
          specialty?: string | null
        }
        Relationships: []
      }
      outdoor_clubs: {
        Row: {
          activities: string[] | null
          bio: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          description: string | null
          embedding: string | null
          id: string
          location: string | null
          name: string | null
          programs: string[] | null
          services: string[] | null
          specialty: string | null
        }
        Insert: {
          activities?: string[] | null
          bio?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          embedding?: string | null
          id?: string
          location?: string | null
          name?: string | null
          programs?: string[] | null
          services?: string[] | null
          specialty?: string | null
        }
        Update: {
          activities?: string[] | null
          bio?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          embedding?: string | null
          id?: string
          location?: string | null
          name?: string | null
          programs?: string[] | null
          services?: string[] | null
          specialty?: string | null
        }
        Relationships: []
      }
      schools: {
        Row: {
          activities: string[] | null
          bio: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          description: string | null
          embedding: string | null
          id: string
          location: string | null
          name: string | null
          programs: string[] | null
          services: string[] | null
          specialty: string | null
        }
        Insert: {
          activities?: string[] | null
          bio?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          embedding?: string | null
          id?: string
          location?: string | null
          name?: string | null
          programs?: string[] | null
          services?: string[] | null
          specialty?: string | null
        }
        Update: {
          activities?: string[] | null
          bio?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          embedding?: string | null
          id?: string
          location?: string | null
          name?: string | null
          programs?: string[] | null
          services?: string[] | null
          specialty?: string | null
        }
        Relationships: []
      }
      search_history: {
        Row: {
          created_at: string
          id: string
          query: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          query: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          query?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "search_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          created_at: string
          id: string
          preferences: Json
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          preferences: Json
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          preferences?: Json
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string | null
          id: string
          user_metadata: Json | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          user_metadata?: Json | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          user_metadata?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
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
      match_documents: {
        Args: {
          query_embedding: string
          match_threshold: number
          match_count: number
          table_name: string
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

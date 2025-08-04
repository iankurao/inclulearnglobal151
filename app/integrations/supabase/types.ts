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
          bio: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          id: string
          location: string
          name: string
          profile_picture_url: string | null
          services: string[] | null
          specialty: string
          user_id: string | null
          embedding: string | null
        }
        Insert: {
          bio?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          location: string
          name: string
          profile_picture_url?: string | null
          services?: string[] | null
          specialty: string
          user_id?: string | null
          embedding?: string | null
        }
        Update: {
          bio?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          location?: string
          name?: string
          profile_picture_url?: string | null
          services?: string[] | null
          specialty?: string
          user_id?: string | null
          embedding?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "health_specialists_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      outdoor_clubs: {
        Row: {
          activities: string[] | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          description: string | null
          id: string
          location: string
          name: string
          user_id: string | null
          embedding: string | null
        }
        Insert: {
          activities?: string[] | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location: string
          name: string
          user_id?: string | null
          embedding?: string | null
        }
        Update: {
          activities?: string[] | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string
          name?: string
          user_id?: string | null
          embedding?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "outdoor_clubs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      schools: {
        Row: {
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          description: string | null
          id: string
          location: string
          logo_url: string | null
          name: string
          programs: string[] | null
          user_id: string | null
          embedding: string | null
        }
        Insert: {
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location: string
          logo_url?: string | null
          name: string
          programs?: string[] | null
          user_id?: string | null
          embedding?: string | null
        }
        Update: {
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string
          logo_url?: string | null
          name?: string
          programs?: string[] | null
          user_id?: string | null
          embedding?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "schools_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
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
          preferences: Json | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          preferences?: Json | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          preferences?: Json | null
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
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
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
          _table: string
          _column: string
        }
        Returns: {
          id: string
          content: string
          similarity: number
          metadata: Json
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

type PublicSchema = Database[keyof Database & "public"]

export type Tables<TableName extends keyof PublicSchema["Tables"] = keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][TableName]["Row"]

export type Enums<EnumName extends keyof PublicSchema["Enums"] = keyof PublicSchema["Enums"]> =
  PublicSchema["Enums"][EnumName]

export type HealthSpecialist = Tables<"health_specialists">
export type School = Tables<"schools">
export type OutdoorClub = Tables<"outdoor_clubs">
export type Favorite = Tables<"favorites">
export type SearchHistory = Tables<"search_history">
export type UserPreference = Tables<"user_preferences">

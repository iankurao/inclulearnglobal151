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
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      health_specialists: {
        Row: {
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          description: string | null
          id: string
          location: string | null
          name: string
          profile_picture_url: string | null
          services_offered: string[] | null
          specialty: string | null
          user_id: string | null
          vector_embedding: string | null
        }
        Insert: {
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          name: string
          profile_picture_url?: string | null
          services_offered?: string[] | null
          specialty?: string | null
          user_id?: string | null
          vector_embedding?: string | null
        }
        Update: {
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          name?: string
          profile_picture_url?: string | null
          services_offered?: string[] | null
          specialty?: string | null
          user_id?: string | null
          vector_embedding?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "health_specialists_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      outdoor_clubs: {
        Row: {
          activities_offered: string[] | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          description: string | null
          id: string
          location: string | null
          logo_url: string | null
          name: string
          user_id: string | null
          vector_embedding: string | null
        }
        Insert: {
          activities_offered?: string[] | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          logo_url?: string | null
          name: string
          user_id?: string | null
          vector_embedding?: string | null
        }
        Update: {
          activities_offered?: string[] | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          logo_url?: string | null
          name?: string
          user_id?: string | null
          vector_embedding?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "outdoor_clubs_user_id_fkey"
            columns: ["user_id"]
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
          location: string | null
          logo_url: string | null
          name: string
          specialization: string[] | null
          user_id: string | null
          vector_embedding: string | null
        }
        Insert: {
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          logo_url?: string | null
          name: string
          specialization?: string[] | null
          user_id?: string | null
          vector_embedding?: string | null
        }
        Update: {
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          logo_url?: string | null
          name?: string
          specialization?: string[] | null
          user_id?: string | null
          vector_embedding?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "schools_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      search_history: {
        Row: {
          created_at: string
          id: string
          search_query: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          search_query: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          search_query?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "search_history_user_id_fkey"
            columns: ["user_id"]
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
          user_type: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          user_type?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          user_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
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
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type HealthSpecialist = Database["public"]["Tables"]["health_specialists"]["Row"]
export type School = Database["public"]["Tables"]["schools"]["Row"]
export type OutdoorClub = Database["public"]["Tables"]["outdoor_clubs"]["Row"]
export type UserProfile = Database["public"]["Tables"]["users"]["Row"]
export type Favorite = Database["public"]["Tables"]["favorites"]["Row"]
export type SearchHistory = Database["public"]["Tables"]["search_history"]["Row"]
export type UserPreference = Database["public"]["Tables"]["user_preferences"]["Row"]

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
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
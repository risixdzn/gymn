export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      avatars: {
        Row: {
          avatar_url: string
          id: string
          owner_id: string | null
        }
        Insert: {
          avatar_url: string
          id: string
          owner_id?: string | null
        }
        Update: {
          avatar_url?: string
          id?: string
          owner_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "avatars_id_fkey"
            columns: ["id"]
            referencedRelation: "objects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "avatars_owner_id_fkey"
            columns: ["owner_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      banners: {
        Row: {
          banner_url: string
          id: string
          owner_id: string | null
        }
        Insert: {
          banner_url: string
          id: string
          owner_id?: string | null
        }
        Update: {
          banner_url?: string
          id?: string
          owner_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "banners_id_fkey"
            columns: ["id"]
            referencedRelation: "objects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "banners_owner_id_fkey"
            columns: ["owner_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      gym: {
        Row: {
          address: string | null
          created_at: string | null
          id: string
          name: string | null
          owner: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          id?: string
          name?: string | null
          owner?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          id?: string
          name?: string | null
          owner?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gym_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          avatar_id: string | null
          banner_id: string | null
          created_at: string | null
          display_name: string | null
          email: string | null
          id: string
          profile: string | null
          username: string | null
        }
        Insert: {
          avatar_id?: string | null
          banner_id?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          id: string
          profile?: string | null
          username?: string | null
        }
        Update: {
          avatar_id?: string | null
          banner_id?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          id?: string
          profile?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_avatar_id_fkey"
            columns: ["avatar_id"]
            referencedRelation: "avatars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_banner_id_fkey"
            columns: ["banner_id"]
            referencedRelation: "banners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_email_exists: {
        Args: {
          email_param: string
        }
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

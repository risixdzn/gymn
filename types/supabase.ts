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
      affiliates: {
        Row: {
          belongs_to: string | null
          id: string
          invite_type: string | null
          user_id: string
          verified: boolean | null
        }
        Insert: {
          belongs_to?: string | null
          id?: string
          invite_type?: string | null
          user_id: string
          verified?: boolean | null
        }
        Update: {
          belongs_to?: string | null
          id?: string
          invite_type?: string | null
          user_id?: string
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "public_affiliates_belongs_to_fkey"
            columns: ["belongs_to"]
            isOneToOne: false
            referencedRelation: "gym"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_affiliates_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
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
            isOneToOne: true
            referencedRelation: "objects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "avatars_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
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
            isOneToOne: true
            referencedRelation: "objects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "banners_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      exercises: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          equipment: string[] | null
          id: string
          level: string[] | null
          muscles: string[] | null
          name: string | null
          visibility: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          equipment?: string[] | null
          id?: string
          level?: string[] | null
          muscles?: string[] | null
          name?: string | null
          visibility?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          equipment?: string[] | null
          id?: string
          level?: string[] | null
          muscles?: string[] | null
          name?: string | null
          visibility?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_exercises_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      gym: {
        Row: {
          address: string | null
          created_at: string | null
          id: string
          name: string | null
          owner: string | null
          referral_code: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          id?: string
          name?: string | null
          owner?: string | null
          referral_code?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          id?: string
          name?: string | null
          owner?: string | null
          referral_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gym_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          action: string | null
          event: string | null
          id: string
          notified_user_id: string | null
          read: boolean | null
          source_gym_id: string | null
          source_user_id: string | null
          time: string
        }
        Insert: {
          action?: string | null
          event?: string | null
          id?: string
          notified_user_id?: string | null
          read?: boolean | null
          source_gym_id?: string | null
          source_user_id?: string | null
          time?: string
        }
        Update: {
          action?: string | null
          event?: string | null
          id?: string
          notified_user_id?: string | null
          read?: boolean | null
          source_gym_id?: string | null
          source_user_id?: string | null
          time?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_source_gym_id_fkey"
            columns: ["source_gym_id"]
            isOneToOne: false
            referencedRelation: "gym"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_notifications_notified_user_id_fkey"
            columns: ["notified_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_notifications_source_user_id_fkey"
            columns: ["source_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_id: string | null
          banner_id: string | null
          bio: string | null
          created_at: string | null
          display_name: string | null
          email: string | null
          id: string
          location: string | null
          profile: string | null
          username: string | null
        }
        Insert: {
          avatar_id?: string | null
          banner_id?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          id: string
          location?: string | null
          profile?: string | null
          username?: string | null
        }
        Update: {
          avatar_id?: string | null
          banner_id?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          id?: string
          location?: string | null
          profile?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_avatar_id_fkey"
            columns: ["avatar_id"]
            isOneToOne: false
            referencedRelation: "avatars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_banner_id_fkey"
            columns: ["banner_id"]
            isOneToOne: false
            referencedRelation: "banners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      workouts: {
        Row: {
          created_at: string
          id: string
          owner: string | null
          workout: Json | null
        }
        Insert: {
          created_at?: string
          id?: string
          owner?: string | null
          workout?: Json | null
        }
        Update: {
          created_at?: string
          id?: string
          owner?: string | null
          workout?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "workouts_owner_fkey"
            columns: ["owner"]
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
      check_email_exists: {
        Args: {
          email_param: string
        }
        Returns: boolean
      }
      gen_gym_ref_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      text_to_uuid: {
        Args: {
          text_uuid: string
        }
        Returns: string
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
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
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
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
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
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
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
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

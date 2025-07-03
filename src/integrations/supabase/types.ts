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
      export_history: {
        Row: {
          created_at: string
          created_by: string
          date_from: string
          date_to: string
          digital_signature: string | null
          export_type: string
          file_hash: string
          file_url: string | null
          id: string
          record_count: number
        }
        Insert: {
          created_at?: string
          created_by: string
          date_from: string
          date_to: string
          digital_signature?: string | null
          export_type: string
          file_hash: string
          file_url?: string | null
          id?: string
          record_count: number
        }
        Update: {
          created_at?: string
          created_by?: string
          date_from?: string
          date_to?: string
          digital_signature?: string | null
          export_type?: string
          file_hash?: string
          file_url?: string | null
          id?: string
          record_count?: number
        }
        Relationships: []
      }
      ledger_audit_log: {
        Row: {
          action: string
          changed_at: string
          changed_by: string
          client_ip: unknown | null
          id: string
          ledger_id: string
          new_values: Json
          old_values: Json | null
          user_agent: string | null
        }
        Insert: {
          action: string
          changed_at?: string
          changed_by: string
          client_ip?: unknown | null
          id?: string
          ledger_id: string
          new_values: Json
          old_values?: Json | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          changed_at?: string
          changed_by?: string
          client_ip?: unknown | null
          id?: string
          ledger_id?: string
          new_values?: Json
          old_values?: Json | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ledger_audit_log_ledger_id_fkey"
            columns: ["ledger_id"]
            isOneToOne: false
            referencedRelation: "petty_cash_ledger"
            referencedColumns: ["id"]
          },
        ]
      }
      petty_cash_ledger: {
        Row: {
          amount: number
          category: Database["public"]["Enums"]["expense_category"] | null
          created_at: string
          current_hash: string
          description: string
          id: string
          is_deleted: boolean
          previous_hash: string | null
          receipt_url: string | null
          running_balance: number
          type: Database["public"]["Enums"]["transaction_type"]
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          category?: Database["public"]["Enums"]["expense_category"] | null
          created_at?: string
          current_hash: string
          description: string
          id?: string
          is_deleted?: boolean
          previous_hash?: string | null
          receipt_url?: string | null
          running_balance: number
          type: Database["public"]["Enums"]["transaction_type"]
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          category?: Database["public"]["Enums"]["expense_category"] | null
          created_at?: string
          current_hash?: string
          description?: string
          id?: string
          is_deleted?: boolean
          previous_hash?: string | null
          receipt_url?: string | null
          running_balance?: number
          type?: Database["public"]["Enums"]["transaction_type"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_ledger_hash: {
        Args: {
          p_id: string
          p_type: Database["public"]["Enums"]["transaction_type"]
          p_amount: number
          p_category: Database["public"]["Enums"]["expense_category"]
          p_description: string
          p_user_id: string
          p_created_at: string
          p_previous_hash: string
        }
        Returns: string
      }
      calculate_running_balance: {
        Args: { p_user_id: string }
        Returns: number
      }
      get_latest_hash: {
        Args: { p_user_id: string }
        Returns: string
      }
    }
    Enums: {
      expense_category:
        | "office_supplies"
        | "meals"
        | "transportation"
        | "utilities"
        | "maintenance"
        | "miscellaneous"
      transaction_type: "expense" | "topup"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      expense_category: [
        "office_supplies",
        "meals",
        "transportation",
        "utilities",
        "maintenance",
        "miscellaneous",
      ],
      transaction_type: ["expense", "topup"],
    },
  },
} as const

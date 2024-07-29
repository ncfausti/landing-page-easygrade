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
      assignments: {
        Row: {
          assignment_id: number
          assignment_name: string | null
          assignment_number: number | null
          assignment_template_id: string
          course_id: number
          created_at: string
          due_date: string | null
          feedback: string[] | null
          number_incorrect: number | null
          pdf_url: string | null
          question_ids: number[] | null
          student_id: number
          subject: string | null
          submission_date: string | null
          submitted_answers: string[] | null
          upload_photo_url: string | null
        }
        Insert: {
          assignment_id?: number
          assignment_name?: string | null
          assignment_number?: number | null
          assignment_template_id?: string
          course_id: number
          created_at?: string
          due_date?: string | null
          feedback?: string[] | null
          number_incorrect?: number | null
          pdf_url?: string | null
          question_ids?: number[] | null
          student_id: number
          subject?: string | null
          submission_date?: string | null
          submitted_answers?: string[] | null
          upload_photo_url?: string | null
        }
        Update: {
          assignment_id?: number
          assignment_name?: string | null
          assignment_number?: number | null
          assignment_template_id?: string
          course_id?: number
          created_at?: string
          due_date?: string | null
          feedback?: string[] | null
          number_incorrect?: number | null
          pdf_url?: string | null
          question_ids?: number[] | null
          student_id?: number
          subject?: string | null
          submission_date?: string | null
          submitted_answers?: string[] | null
          upload_photo_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assignments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "assignments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          assignment_count: number | null
          course_id: number
          course_name: string
          description: string | null
          grade: string | null
          section: string | null
          subject: string | null
        }
        Insert: {
          assignment_count?: number | null
          course_id?: number
          course_name: string
          description?: string | null
          grade?: string | null
          section?: string | null
          subject?: string | null
        }
        Update: {
          assignment_count?: number | null
          course_id?: number
          course_name?: string
          description?: string | null
          grade?: string | null
          section?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      emails: {
        Row: {
          created_at: string
          email: string | null
          id: number
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: number
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: number
        }
        Relationships: []
      }
      enrollments: {
        Row: {
          course_id: number
          enrollment_id: number
          grade: string | null
          student_id: number
        }
        Insert: {
          course_id: number
          enrollment_id?: number
          grade?: string | null
          student_id: number
        }
        Update: {
          course_id?: number
          enrollment_id?: number
          grade?: string | null
          student_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "enrollments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      items: {
        Row: {
          created_at: string
          description: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      private_items: {
        Row: {
          created_at: string
          description: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      questions: {
        Row: {
          answer_choices: string[] | null
          correct_answer: string
          hints: string[] | null
          question_id: number
          question_text: string
          question_type: string | null
        }
        Insert: {
          answer_choices?: string[] | null
          correct_answer: string
          hints?: string[] | null
          question_id?: number
          question_text: string
          question_type?: string | null
        }
        Update: {
          answer_choices?: string[] | null
          correct_answer?: string
          hints?: string[] | null
          question_id?: number
          question_text?: string
          question_type?: string | null
        }
        Relationships: []
      }
      schools: {
        Row: {
          configuration: Json | null
          created_at: string
          id: number
          name: string
          teacher_count: number | null
        }
        Insert: {
          configuration?: Json | null
          created_at?: string
          id?: number
          name: string
          teacher_count?: number | null
        }
        Update: {
          configuration?: Json | null
          created_at?: string
          id?: number
          name?: string
          teacher_count?: number | null
        }
        Relationships: []
      }
      students: {
        Row: {
          added_by_auth_user_id: string | null
          created_at: string | null
          first_name: string
          grade_level: number | null
          id: number
          last_name: string
        }
        Insert: {
          added_by_auth_user_id?: string | null
          created_at?: string | null
          first_name: string
          grade_level?: number | null
          id?: number
          last_name: string
        }
        Update: {
          added_by_auth_user_id?: string | null
          created_at?: string | null
          first_name?: string
          grade_level?: number | null
          id?: number
          last_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "students_added_by_auth_user_id_fkey"
            columns: ["added_by_auth_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      teacher_courses: {
        Row: {
          course_id: number
          teacher_course_id: number
          teacher_id: number
        }
        Insert: {
          course_id: number
          teacher_course_id?: number
          teacher_id: number
        }
        Update: {
          course_id?: number
          teacher_course_id?: number
          teacher_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "teacher_courses_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "teacher_courses_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teacher_courses_by_auth"
            referencedColumns: ["teacher_id"]
          },
          {
            foreignKeyName: "teacher_courses_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["teacher_id"]
          },
        ]
      }
      teachers: {
        Row: {
          auth_id: string | null
          email: string
          first_name: string
          grades_taught: number[] | null
          last_name: string
          school_id: number | null
          subjects_taught: string[] | null
          teacher_id: number
        }
        Insert: {
          auth_id?: string | null
          email: string
          first_name: string
          grades_taught?: number[] | null
          last_name: string
          school_id?: number | null
          subjects_taught?: string[] | null
          teacher_id?: number
        }
        Update: {
          auth_id?: string | null
          email?: string
          first_name?: string
          grades_taught?: number[] | null
          last_name?: string
          school_id?: number | null
          subjects_taught?: string[] | null
          teacher_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "teachers_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teachers_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      user_signup_queue: {
        Row: {
          created_at: string | null
          email: string
          id: number
          name: string
          processed_at: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: number
          name: string
          processed_at?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: number
          name?: string
          processed_at?: string | null
          status?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      teacher_courses_by_auth: {
        Row: {
          auth_id: string | null
          course_description: string | null
          course_id: number | null
          course_name: string | null
          teacher_id: number | null
        }
        Relationships: [
          {
            foreignKeyName: "teacher_courses_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "teachers_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      check_and_stop_processing: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      create_assignments_for_course: {
        Args: {
          p_course_id: number
          p_question_ids: number[]
          p_due_date: string
        }
        Returns: {
          assignment_id: number
          course_id: number
          student_id: number
          assignment_number: number
          assignment_name: string
          feedback: string[]
          submitted_answers: string[]
          number_incorrect: number
          submission_date: string
          created_at: string
          upload_photo_url: string
          question_ids: number[]
          pdf_url: string
          due_date: string
        }[]
      }
      increment_assignment_counter: {
        Args: {
          p_course_id: number
        }
        Returns: {
          new_count: number
        }[]
      }
      process_user_creation_queue_batch: {
        Args: {
          batch_size: number
        }
        Returns: number
      }
      process_user_signup_queue: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      scheduled_process_user_creation_queue: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      submit_and_process_users: {
        Args: {
          users_json: Json
        }
        Returns: undefined
      }
      trigger_user_signup_processing: {
        Args: Record<PropertyKey, never>
        Returns: undefined
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

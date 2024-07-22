import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from './lib/database.types';

export type PromptConfig = {
  grade: number;
  subject: string;
  totalQuestions: number;
  mcqNum: number;
  subjNum: number;
};

export type AppSupabaseClient = SupabaseClient<Database>;
export type Table<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

export type View<T extends keyof Database['public']['Views']> =
  Database['public']['Views'][T]['Row'];
/** One of the providers supported by GoTrue. */
export type AuthProvider =
  | 'apple'
  | 'azure'
  | 'bitbucket'
  | 'discord'
  | 'facebook'
  | 'github'
  | 'gitlab'
  | 'google'
  | 'keycloak'
  | 'linkedin'
  | 'notion'
  | 'slack'
  | 'spotify'
  | 'twitch'
  | 'twitter'
  | 'workos';

export type Subject =
  | 'English'
  | 'Math'
  | 'Social'
  | 'Science'
  | 'EVS'
  | 'Chemistry'
  | 'Physics'
  | 'Biology'
  | 'ICT'
  | 'History'
  | 'Geography'
  | 'Civics';

export type Student = Table<'students'>;
export type InsertStudent = Omit<Student, 'id' | 'created_at' | 'grade_level'>;
export type InsertStudentPayload = Omit<InsertStudent, 'added_by_auth_user_id'>;

export type Course = Table<'courses'>;
export type InsertCourse = Omit<Course, 'course_id' | 'assignment_count'>;

export type Teacher = Table<'teachers'>;
export type InsertTeacher = Omit<Teacher, 'teacher_id'>;
export type InsertTeacherPayload = Omit<
  Teacher,
  'teacher_id' | 'email' | 'auth_id' | 'school_id'
>;

export type TeacherCourse = Table<'teacher_courses'>;
export type InsertTeacherCourse = Omit<TeacherCourse, 'teacher_course_id'>;

export type Enrollment = Table<'enrollments'>;
export type InsertEnrollment = Omit<Enrollment, 'course_id'>;

export type Question = Table<'questions'>;
export type InsertQuestion =
  Database['public']['Tables']['questions']['Insert'];

export type Assignment = Table<'assignments'>;
export type InsertAssignment =
  Database['public']['Tables']['assignments']['Insert'];
export type CourseStudents = { course_id: number; student_ids: number[] };

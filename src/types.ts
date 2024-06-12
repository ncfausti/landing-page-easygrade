import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from './lib/database.types';

export type AppSupabaseClient = SupabaseClient<Database>;
export type Table<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
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
export interface Teacher {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  department?: string;
  subjects_taught?: Subject[];
  grades_taught?: number[];
}

export interface Student {
  first_name: string;
  last_name: string;
  added_by: number;
}

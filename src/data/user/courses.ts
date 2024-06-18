'use server';
import { createSupabaseServerActionClient } from '@/supabase-clients/createSupabaseServerActionClient';
import { revalidatePath } from 'next/cache';
import { InsertCourse } from '@/types';

export async function insertCourseAction(payload: { course: InsertCourse }) {
  const supabaseClient = createSupabaseServerActionClient();
  const { data, error } = await supabaseClient
    .from('courses')
    .insert(payload.course)
    .select('*');

  if (error) {
    throw error;
  }

  revalidatePath('/');
  return data;
}

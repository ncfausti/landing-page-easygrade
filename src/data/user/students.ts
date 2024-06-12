'use server';
import { createSupabaseServerActionClient } from '@/supabase-clients/createSupabaseServerActionClient';
import { revalidatePath } from 'next/cache';
import { Student } from '@/types';

export async function insertStudentsAction(payload: { students: Student[] }) {
  const supabaseClient = createSupabaseServerActionClient();
  const { data, error } = await supabaseClient
    .from('students')
    .insert(payload.students)
    .select('*');

  if (error) {
    throw error;
  }

  revalidatePath('/');
  return data;
}

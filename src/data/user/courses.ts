'use server';
import { createSupabaseServerActionClient } from '@/supabase-clients/createSupabaseServerActionClient';
import { revalidatePath } from 'next/cache';
import { Teacher } from '@/types';

export async function insertTeacherAction(payload: { teacher: Teacher }) {
  const supabaseClient = createSupabaseServerActionClient();

  // Retrieve the user session
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  // Get the user ID from the session
  const { id: auth_id, email } = session.user;

  // add the currently logged in user_id and email to the teacher object
  const teacherRow = { ...payload.teacher, auth_id, email };

  const { data, error } = await supabaseClient
    .from('teachers')
    .insert(teacherRow)
    .select('*');

  if (error) {
    throw error;
  }

  revalidatePath('/');
  return data;
}

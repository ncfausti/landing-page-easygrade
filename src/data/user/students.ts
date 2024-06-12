'use server';
import { createSupabaseServerActionClient } from '@/supabase-clients/createSupabaseServerActionClient';
import { revalidatePath } from 'next/cache';
import { Student } from '@/types';

export async function insertStudentsAction(payload: { students: Student[] }) {
  const supabaseClient = createSupabaseServerActionClient();
  // Retrieve the user session
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  // Get the user ID from the session
  const userId = session.user.id;
  // get the currently logged in user's id

  // add the currently logged in user's id to each student object
  const studentRows = payload.students.map((student) => {
    return {
      ...student,
      added_by_auth_user_id: userId,
    };
  });

  const { data, error } = await supabaseClient
    .from('students')
    .insert(studentRows)
    .select('*');

  if (error) {
    throw error;
  }

  revalidatePath('/');
  return data;
}

'use server';
import { createSupabaseServerActionClient } from '@/supabase-clients/createSupabaseServerActionClient';
import { revalidatePath } from 'next/cache';
import { InsertCourse } from '@/types';

export async function insertCourseAction(payload: { course: InsertCourse }) {
  const supabaseClient = createSupabaseServerActionClient();

  // Retrieve the user session
  // const {
  //   data: { session },
  // } = await supabaseClient.auth.getSession();

  // Get the user ID from the session
  // const { id: auth_id, email } = session.user;

  // get the teacher's id using auth_id

  // console.log(teacherData, teacherError);

  // add the currently logged in user_id and email to the teacher object
  // const courseRow = { ...payload.course };

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

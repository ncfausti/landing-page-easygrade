'use server';
import { createSupabaseServerActionClient } from '@/supabase-clients/createSupabaseServerActionClient';
import { revalidatePath } from 'next/cache';
import { InsertStudent } from '@/types';

export async function insertStudentsAction(payload: {
  students: InsertStudent[];
}) {
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

  if (studentRows.length === 0) {
    throw new Error('No students provided');
  }

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

export async function insertStudentsAndEnrollmentsAction(payload: {
  students: InsertStudent[];
  course_id: number;
}) {
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

  if (studentRows.length === 0) {
    throw new Error('No students provided');
  }

  const { data: studentRecords, error: studentError } = await supabaseClient
    .from('students')
    .insert(studentRows)
    .select('*');

  // insert enrollments for each student in the course
  const enrollmentRows = studentRecords.map((student) => {
    return {
      student_id: student.id,
      course_id: payload.course_id,
    };
  });

  const { data: enrollmentRecords, error: enrollmentError } =
    await supabaseClient.from('enrollments').insert(enrollmentRows).select('*');

  if (studentError) {
    throw studentError;
  }

  if (enrollmentError) {
    throw enrollmentError;
  }

  revalidatePath('/');
  return { students: studentRecords, enrollments: enrollmentRecords };
}

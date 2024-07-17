'use server';
import { getSupabaseServerActionClientAndCurrentUser } from '@/supabase-clients/createSupabaseServerActionClient';
import { revalidatePath } from 'next/cache';
import { InsertStudentPayload } from '@/types';
export async function insertStudentsAction(payload: {
  students: InsertStudentPayload[];
}) {
  const { currentUser, supabaseClient } =
    await getSupabaseServerActionClientAndCurrentUser();

  // add the currently logged in user's id to each student object
  const studentRows = payload.students.map((student) => {
    return {
      ...student,
      added_by_auth_user_id: currentUser.id,
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
  students: InsertStudentPayload[];
  course_id: number;
}) {
  const { currentUser, supabaseClient } =
    await getSupabaseServerActionClientAndCurrentUser();

  // add the currently logged in user's id to each student object
  const studentRows = payload.students.map((student) => {
    return {
      ...student,
      added_by_auth_user_id: currentUser.id,
    };
  });

  if (studentRows.length === 0) {
    throw new Error('No students provided');
  }

  const { data: studentRecords, error: studentError } = await supabaseClient
    .from('students')
    .insert(studentRows)
    .select('*');

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

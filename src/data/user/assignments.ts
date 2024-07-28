'use server';
import { createSupabaseServerActionClient } from '@/supabase-clients/createSupabaseServerActionClient';
import { revalidatePath } from 'next/cache';
import { InsertAssignment } from '@/types';

export const createAllAssignmentsForCourseAction = async ({
  assignment_template_id,
  course_id,
  question_ids = [],
}: {
  assignment_template_id: string;
  course_id: number;
  question_ids: number[];
}) => {
  if (!course_id) {
    throw new Error('No course_id provided');
  }
  if (typeof course_id !== 'number') {
    throw new Error('course_id must be a number');
  }
  if (course_id < 0) {
    throw new Error('course_id must be greater than 0');
  }

  const supabaseClient = createSupabaseServerActionClient();

  // get all students for course
  const { data: studentIds, error: studentsError } = await supabaseClient
    .from('enrollments')
    .select('student_id')
    .eq('course_id', course_id);

  if (studentsError) {
    throw studentsError;
  }

  if (studentIds.length === 0) {
    throw new Error('No students found for course');
  }

  const oneWeekFromNow = new Date();
  const daysToComplete = 7; // should be configurable in the future
  oneWeekFromNow.setDate(oneWeekFromNow.getDate() + daysToComplete);

  // Format the date to ISO string for `timestamptz`
  const oneWeekFromNowISO = oneWeekFromNow.toISOString();

  const assignments: InsertAssignment[] = studentIds.map((student) => ({
    course_id,
    student_id: student.student_id,
    assignment_name: 'Homework',
    due_date: oneWeekFromNowISO,
    question_ids,
    assignment_template_id,
  }));

  const { data, error } = await supabaseClient
    .from('assignments')
    .insert(assignments);

  if (error) {
    throw error;
  }

  // revalidatePath('/homework');
  return data;
};

export async function fetchGradeData(
  assignment_template_id: string,
  student_id: string
) {
  const supabase = createSupabaseServerActionClient();
  const { data, error } = await supabase
    .from('assignments')
    .select('*')
    .eq('assignment_template_id', assignment_template_id)
    .eq('student_id', parseInt(student_id))
    .single();

  if (error) throw error;
  return data;
}

export async function fetchAssignmentData(assignment_template_id: string) {
  const supabase = createSupabaseServerActionClient();
  const { data, error } = await supabase
    .from('assignments')
    .select('*')
    .eq('assignment_template_id', parseInt(assignment_template_id));

  if (error) throw error;
  return data;
}

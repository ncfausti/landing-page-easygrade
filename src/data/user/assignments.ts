'use server';
import { createSupabaseServerActionClient } from '@/supabase-clients/createSupabaseServerActionClient';
import { revalidatePath } from 'next/cache';
import { InsertAssignment } from '@/types';
import { redirect } from 'next/navigation';

export const createAllAssignmentsForCourseAction = async ({
  assignment_template_id,
  course_id,
  question_ids = [],
  subject,
}: {
  assignment_template_id: string;
  course_id: number;
  question_ids: number[];
  subject: string;
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
    subject,
  }));

  const { error } = await supabaseClient
    .from('assignments')
    .insert(assignments);

  if (error) {
    throw error;
  }

  revalidatePath('/homework');
  redirect(`/course/${course_id}?aid=${assignment_template_id}`);
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

export async function saveImageUrlToAssignment(
  student_id: number,
  assignment_template_id: string,
  url: string
) {
  const supabase = createSupabaseServerActionClient();
  // TODO: do some checks for the assignment_id, template_id, student_id all match etc

  const { error } = await supabase
    .from('assignments')
    .update({ upload_photo_url: url })
    .eq('assignment_template_id', assignment_template_id)
    .eq('student_id', student_id);

  if (error) throw error;
}

export async function saveGradeToAssignment(
  student_id: number,
  assignment_template_id: string,
  number_incorrect: number
) {
  const supabase = createSupabaseServerActionClient();

  const { error } = await supabase
    .from('assignments')
    .update({ number_incorrect })
    .eq('assignment_template_id', assignment_template_id)
    .eq('student_id', student_id);

  if (error) throw error;
}

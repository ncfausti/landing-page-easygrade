'use server';
import { createSupabaseServerActionClient } from '@/supabase-clients/createSupabaseServerActionClient';
import { revalidatePath } from 'next/cache';
import {
  InsertCourse,
  InsertTeacher,
  InsertTeacherPayload,
  InsertTeacherCourse,
  InsertQuestion,
} from '@/types';

export async function getTeacherIdFromAuthIdAction(payload: {
  auth_id: string;
}) {
  const supabaseClient = createSupabaseServerActionClient();

  const { data, error } = await supabaseClient
    .from('teachers')
    .select('teacher_id')
    .eq('auth_id', payload.auth_id);

  if (error) {
    throw error;
  }

  return data;
}

export async function insertTeacherAction(payload: {
  teacher: InsertTeacherPayload;
}) {
  const supabaseClient = createSupabaseServerActionClient();

  // Retrieve the user session
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  // Get the user ID from the session
  const { id: auth_id, email } = session.user;

  // add the currently logged in user_id and email to the teacher object
  const teacherRow: InsertTeacher = { ...payload.teacher, auth_id, email };

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

export async function insertTeacherAndSetupCourseAction(payload: {
  teacher: InsertTeacherPayload;
}) {
  const supabaseClient = createSupabaseServerActionClient();

  // Retrieve the user session
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  // Get the user ID from the session
  const { id: auth_id, email } = session.user;

  // add the currently logged in user_id and email to the teacher object
  const teacherRow: InsertTeacher = { ...payload.teacher, auth_id, email };

  const { data: teacherInsertData, error: teacherInsertError } =
    await supabaseClient.from('teachers').insert(teacherRow).select('*');

  const [teacherRecord] = teacherInsertData;

  const courseRow: InsertCourse = {
    course_name: `${teacherRecord.first_name}'s first course`,
    description: 'Description of course goes here. Change in dashboard.',
  };

  const { data: courseInsertData, error: courseInsertError } =
    await supabaseClient.from('courses').insert(courseRow).select('*');

  const [courseRecord] = courseInsertData;

  const teacherCourse: InsertTeacherCourse = {
    teacher_id: teacherRecord.teacher_id,
    course_id: courseRecord.course_id,
  };

  const { data: teacherCoursesInsertData, error: teacherCoursesInsertError } =
    await supabaseClient
      .from('teacher_courses')
      .insert(teacherCourse)
      .select('*');

  const [teacherCourseRecord] = teacherCoursesInsertData;

  if (teacherInsertError) {
    throw teacherInsertError;
  }

  if (courseInsertError) {
    throw courseInsertError;
  }

  if (teacherCoursesInsertError) {
    throw teacherCoursesInsertError;
  }

  revalidatePath('/');

  return {
    teacher: teacherRecord,
    course: courseRecord,
    teacherCourse: teacherCourseRecord,
  };
}

export async function insertQuestions(payload: {
  questions: InsertQuestion[];
}) {
  const supabase = createSupabaseServerActionClient();
  const { questions } = payload;

  // Insert data into the questions table
  const { data, error } = await supabase
    .from('questions')
    .insert(questions)
    .select();

  if (error) {
    throw error;
  }

  revalidatePath('/');
  return data;
}

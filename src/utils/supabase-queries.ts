import { AppSupabaseClient, AuthProvider, Table } from '@/types';
import { toSiteURL } from './helpers';
import { createSupabaseServerComponentClient } from '@/supabase-clients/createSupabaseServerComponentClient';

export const getAllItems = async (
  supabase: AppSupabaseClient
): Promise<Array<Table<'items'>>> => {
  const { data, error } = await supabase.from('items').select('*');

  if (error) {
    throw error;
  }

  return data;
};

export const insertItem = async (
  supabase: AppSupabaseClient,
  item: { name: string; description: string }
): Promise<Table<'items'>> => {
  const { data, error } = await supabase
    .from('items')
    .insert(item)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const updateItem = async (
  supabase: AppSupabaseClient,
  item: { id: string; name: string; description: string }
) => {
  const { data, error } = await supabase.from('items').update(item).single();

  if (error) {
    throw error;
  }

  return data;
};

export const deleteItem = async (supabase: AppSupabaseClient, id: string) => {
  const { error } = await supabase.from('items').delete().match({ id });

  if (error) {
    throw error;
  }

  return true;
};

export const getItem = async (
  supabase: AppSupabaseClient,
  id: string
): Promise<Table<'items'>> => {
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const signInWithMagicLink = async (
  supabase: AppSupabaseClient,
  email: string
) => {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: toSiteURL('/auth/callback'),
    },
  });

  if (error) {
    throw error;
  }
};

export const signInWithPassword = async (
  supabase: AppSupabaseClient,
  email: string,
  password: string
) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }
};

export const resetPassword = async (
  supabase: AppSupabaseClient,
  email: string
) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: toSiteURL('/update-password'),
  });

  if (error) {
    throw error;
  }
};

export const updatePassword = async (
  supabase: AppSupabaseClient,
  password: string
) => {
  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    throw error;
  }
};

export const signInWithProvider = async (
  supabase: AppSupabaseClient,
  provider: AuthProvider
) => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: toSiteURL('/auth/callback'),
    },
  });

  if (error) {
    throw error;
  }
};

export const signUp = async (
  supabase: AppSupabaseClient,
  email: string,
  password: string
) => {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: toSiteURL('/auth/callback'),
    },
  });

  if (error) {
    throw error;
  }
};

export const getAllPrivateItems = async (
  supabase: AppSupabaseClient
): Promise<Array<Table<'private_items'>>> => {
  const { data, error } = await supabase.from('private_items').select('*');

  if (error) {
    throw error;
  }

  return data;
};

export const getAllStudents = async (): // supabase: AppSupabaseClient
Promise<Array<Table<'students'>>> => {
  const supabase = createSupabaseServerComponentClient();

  const { data, error } = await supabase.from('students').select('*');

  if (error) {
    throw error;
  }

  return data;
};

export const insertPrivateItem = async (
  supabase: AppSupabaseClient,
  item: { name: string; description: string }
): Promise<Table<'private_items'>> => {
  const { data, error } = await supabase
    .from('private_items')
    .insert(item)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const updatePrivateItem = async (
  supabase: AppSupabaseClient,
  item: { id: string; name: string; description: string }
) => {
  const { data, error } = await supabase
    .from('private_items')
    .update(item)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const deletePrivateItem = async (
  supabase: AppSupabaseClient,
  id: string
) => {
  const { error } = await supabase.from('private_items').delete().match({ id });

  if (error) {
    throw error;
  }

  return true;
};

export const getPrivateItem = async (
  supabase: AppSupabaseClient,
  id: string
): Promise<Table<'private_items'>> => {
  const { data, error } = await supabase
    .from('private_items')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const insertTeacher = async (
  supabase: AppSupabaseClient,
  teacher: Table<'teachers'>
): Promise<Table<'teachers'>> => {
  const { data, error } = await supabase
    .from('teachers')
    .insert(teacher)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const insertStudents = async (
  supabase: AppSupabaseClient,
  students: Table<'students'>
): Promise<Table<'students'>> => {
  const { data, error } = await supabase.from('students').insert(students);

  if (error) {
    throw error;
  }

  return data;
};

async function getAuthUser(supabase: AppSupabaseClient) {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  return data;
}

export async function getCurrentTeachersCourses() {
  console.log('getCurrentTeachersCourses on the server');
  const supabaseClient = createSupabaseServerComponentClient();

  const { user } = await getAuthUser(supabaseClient);

  const { data, error } = await supabaseClient
    .from('teacher_courses_by_auth')
    .select('teacher_id, course_id, course_name, course_description')
    .eq('auth_id', user.id);

  if (error) {
    console.error('Error fetching courses:', error);
    return [];
  }

  return data;
}

export const getAllCourses = async (): Promise<
  Array<Table<'private_items'>>
> => {
  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase.from('private_items').select('*');

  if (error) {
    throw error;
  }

  return data;
};

export async function fetchStudentsByIds(studentIds: number[]) {
  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .in('id', studentIds); // Use the `in` operator to filter by student IDs

  if (error) {
    console.error('Error fetching students:', error);
    return [];
  }

  return data;
}

// uses aggresive caching since we removed 'use server' from the top of file
export const getCourseAndStudents = async (
  id: string
): Promise<CourseWithStudents> => {
  const supabase = createSupabaseServerComponentClient();
  console.log('id: ', id);
  const { data: course, error } = await supabase
    .from('courses')
    .select('*')
    .eq('course_id', parseInt(id))
    .single();

  const { data: studentIds, error: enrollmentError } = await supabase
    .from('enrollments')
    .select('student_id')
    .eq('course_id', parseInt(id));

  if (enrollmentError) {
    throw enrollmentError;
  }

  if (error) {
    throw error;
  }

  const students = await fetchStudentsByIds(
    studentIds.map((enrollment) => enrollment.student_id)
  );

  return {
    course_id: course.course_id,
    course_name: course.course_name,
    description: course.description,
    students,
  };
};

type CourseWithStudents = Table<'courses'> & {
  students: Table<'students'>[];
};

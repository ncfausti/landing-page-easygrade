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

export async function insertTeachersAction(payload: {
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
  const teacherRows: InsertTeacher[] = { ...payload.teacher, auth_id, email };

  const { data, error } = await supabaseClient
    .from('teachers')
    .insert(teacherRows)
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

type UserSubmission = {
  name: string;
  email: string;
};

export async function submitUserList(users: UserSubmission[]) {
  // modify this to submit the users to the server
  // and send the job to the queue
  console.log('submitUserList', users);
  const jobQueue = new Queue('signupQueue', {
    connection: {
      host: process.env.REDIS_HOST,
      port: 6379,
      password: process.env.REDIS_PASSWORD,
    },
  });

  // const { users } = req.body; // Expecting an array of {email, name} objects

  try {
    const job = await jobQueue.add('process_signup', { users });
    console.log({ message: 'Job added to queue', jobId: job.id });
  } catch (error) {
    console.log({ message: 'Error adding job to queue', error: error.message });
  }

  // const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  // const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  // const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  //   auth: {
  //     autoRefreshToken: false,
  //     persistSession: false,
  //   },
  // });

  // const usersArray = Array.isArray(users) ? users : [users];

  // const { data, error } = await supabase.rpc('submit_and_process_users', {
  //   users_json: usersArray,
  // });

  // if (error) throw error;
  return 'success';
}

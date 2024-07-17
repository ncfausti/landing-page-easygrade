'use server';

import { insertStudentsAndEnrollmentsAction } from '@/data/user/students';
import {
  createSupabaseServerActionClient,
  getSupabaseServerActionClientAndCurrentUser,
} from '@/supabase-clients/createSupabaseServerActionClient';
import { revalidatePath } from 'next/cache';
import {
  InsertCourse,
  InsertTeacherCourse,
  InsertStudentPayload,
} from '@/types';
import { z } from 'zod';
import { getTeacherIdFromAuthIdAction } from './teachers';

export async function insertCourseAction(payload: { course: InsertCourse }) {
  const supabaseClient = createSupabaseServerActionClient();
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

const sectionSchema = z.object({
  subjects: z.array(z.string()).min(1, 'At least one subject is required'),
});

const gradeSchema = z.object({
  grade: z.string().min(1, 'Grade is required'),
  sections: z.array(sectionSchema).min(1, 'At least one section is required'),
});

export async function createGradeSections(prevState, formData) {
  const gradeData = [];
  const errors = {};

  // Parse form data
  for (const [key, value] of formData.entries()) {
    if (key.startsWith('grade-')) {
      const gradeIndex = key.split('-')[1];
      const grade = value;
      const sections = [];

      // Find all sections for this grade
      let sectionIndex = 0;
      while (true) {
        const subjects = [];
        for (const [subjectKey, subjectValue] of formData.entries()) {
          if (
            subjectKey.startsWith(`subject-${gradeIndex}-${sectionIndex}-`) &&
            subjectValue === 'on'
          ) {
            subjects.push(subjectKey.split('-')[3]);
          }
        }
        if (subjects.length === 0) break;
        sections.push({ subjects });
        sectionIndex++;
      }

      gradeData.push({ grade, sections });
    }
  }

  try {
    gradeData.forEach((grade) => {
      gradeSchema.parse(grade);
    });

    // Here you would typically save the grade data to your database
    console.log('Grade data to be created:', gradeData);

    return { message: 'Grade sections created successfully!', errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) => {
        errors[err.path.join('.')] = err.message;
      });
    } else {
      console.log(errors);
      errors.general = 'An unexpected error occurred';
    }
    return { message: null, errors };
  }
}

const classSchema = z.object({
  grade: z.string().min(1, 'Grade is required'),
  section: z.string().min(1, 'Section is required'),
  subject: z.string().min(1, 'Subject is required'),
  students: z.string().min(1, 'At least one student is required'),
});

const classesSchema = z
  .array(classSchema)
  .min(1, 'At least one class is required');

export async function setupTeacherClassesAction(classes) {
  try {
    const validatedData = classesSchema.parse(classes);
    const { currentUser, supabaseClient } =
      await getSupabaseServerActionClientAndCurrentUser();

    const [{ teacher_id }] = await getTeacherIdFromAuthIdAction({
      auth_id: currentUser.id,
    });

    let enrollmentsCount = 0;
    const teacherCourses: InsertTeacherCourse[] = [];

    // OPTIMIZE: Use a single transaction to insert all data
    for (const classData of validatedData) {
      const { grade, section, subject, students } = classData;

      // 2. save classes
      const insertCourseRecord: InsertCourse = {
        course_name: `${grade} - ${section} - ${subject}`,
        description: `Class ${grade} - ${section} - ${subject}`,
        grade,
        section,
        subject,
      };

      // 3. save students
      const studentRecords: InsertStudentPayload[] = students
        .split('\n')
        .map((student) => {
          const [first_name, last_name] = student.split(' ');

          return {
            first_name,
            last_name: last_name || first_name,
          };
        });

      const [courseInsertResult] = await insertCourseAction({
        course: insertCourseRecord,
      });
      const { course_id } = courseInsertResult;

      const insertedStudentsAndEnrollments =
        await insertStudentsAndEnrollmentsAction({
          students: studentRecords,
          course_id,
        });

      // update teacherCourses records to get inserted after loop
      teacherCourses.push({ course_id, teacher_id });
      enrollmentsCount += insertedStudentsAndEnrollments.students.length;
    }

    const { data: teacherCoursesInsertData } = await supabaseClient
      .from('teacher_courses')
      .insert(teacherCourses)
      .select('*');

    return {
      message: 'Classes setup successfully!',
      coursesCount: teacherCoursesInsertData.length,
      enrollmentsCount,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = {};
      error.errors.forEach((err) => {
        errors[err.path.join('.')] = err.message;
      });
      return { errors };
    } else {
      throw error;
    }
  }
}

'use server';
import { createSupabaseServerActionClient } from '@/supabase-clients/createSupabaseServerActionClient';
import { revalidatePath } from 'next/cache';
import { InsertCourse } from '@/types';
import { z } from 'zod';

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
    gradeData.forEach((grade, index) => {
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
      errors.general = 'An unexpected error occurred';
    }
    return { message: null, errors };
  }
}

// const classSchema = z.object({
//   grade: z.string().min(1, 'Grade is required'),
//   section: z.string().min(1, 'Section is required'),
//   subject: z.string().min(1, 'Subject is required'),
//   students: z.string().min(1, 'At least one student is required'),
// });

// 'use server'

// import { z } from 'zod';

// const classSchema = z.object({
//   grade: z.string().min(1, "Grade is required"),
//   section: z.string().min(1, "Section is required"),
//   subject: z.string().min(1, "Subject is required"),
//   students: z.string().min(1, "At least one student is required"),
// });

const classSchema = z.object({
  grade: z.string().min(1, 'Grade is required'),
  section: z.string().min(1, 'Section is required'),
  subject: z.string().min(1, 'Subject is required'),
  students: z.string().min(1, 'At least one student is required'),
});

const classesSchema = z
  .array(classSchema)
  .min(1, 'At least one class is required');

export async function setupTeacherClasses(classes) {
  console.log(classes);
  try {
    const validatedData = classesSchema.parse(classes);

    // Here you would typically save the classes to your database
    console.log('Classes to be created:', validatedData);

    return { message: 'Classes setup successfully!' };
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

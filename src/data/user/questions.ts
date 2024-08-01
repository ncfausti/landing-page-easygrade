// serverAction
'use server';
import { createSupabaseServerActionClient } from '@/supabase-clients/createSupabaseServerActionClient';
import { revalidatePath } from 'next/cache';
import { InsertQuestion } from '@/types';

export const insertQuestionsAction = async (questions: InsertQuestion[]) => {
  'use server';
  const supabaseClient = createSupabaseServerActionClient();

  if (questions.length === 0) {
    throw new Error('No questions provided');
  }

  const { data, error } = await supabaseClient
    .from('questions')
    .insert(questions)
    .select();

  if (error) {
    throw error;
  }

  revalidatePath('/');
  return data;
};

export const deleteQuestionAction = async (questionId: number) => {
  'use server';
  const supabaseClient = createSupabaseServerActionClient();

  if (!questionId) {
    throw new Error('No questionID provided');
  }

  const { data, error } = await supabaseClient
    .from('questions')
    .delete()
    .eq('question_id', questionId);

  if (error) {
    throw error;
  }

  revalidatePath('/homework');
  return { success: true };
};

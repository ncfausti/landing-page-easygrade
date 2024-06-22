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
    .insert(questions);

  if (error) {
    throw error;
  }

  revalidatePath('/');
  return data;
};

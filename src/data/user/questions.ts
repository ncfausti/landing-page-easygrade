// serverAction
'use server';
import { createSupabaseServerActionClient } from '@/supabase-clients/createSupabaseServerActionClient';
import { revalidatePath } from 'next/cache';
import { InsertQuestion, Question } from '@/types';

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

export const updateQuestionAction = async (question: Question) => {
  'use server';
  const supabaseClient = createSupabaseServerActionClient();

  if (!question.question_id) {
    throw new Error('No question provided');
  }

  console.log('Updating question:', question);
  const { error } = await supabaseClient
    .from('questions')
    .update(question)
    .eq('question_id', question.question_id)
    .select()
    .single();

  if (error) {
    console.log('Error updating question:', error);
    return { success: false, error };
  }
  console.log('Question updated successfully!');

  revalidatePath('/homework');
  return { success: true };
};

export const deleteQuestionAction = async (questionId: number) => {
  'use server';
  const supabaseClient = createSupabaseServerActionClient();

  if (!questionId) {
    throw new Error('No questionID provided');
  }

  const { error } = await supabaseClient
    .from('questions')
    .delete()
    .eq('question_id', questionId);

  if (error) {
    return { success: false, error };
  }

  revalidatePath('/homework');
  return { success: true };
};

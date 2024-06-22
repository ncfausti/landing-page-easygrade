import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PromptConfig } from '@/types';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function parseBody(body: ReadableStream<Uint8Array> | null) {
  if (!body) {
    return '';
  }

  const reader = body.getReader();
  const decoder = new TextDecoder('utf-8');
  let result = '';
  let value;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    value = await reader.read();
    if (value.done) {
      break;
    }
    result += decoder.decode(value.value, { stream: true });
  }

  result += decoder.decode();

  return result;
}

export function countCharacterFilter(str: string, char: string) {
  return str.split('').filter((c) => c === char).length;
}
export function progress(completion: string, totalQuestions: number): string {
  return `${countCharacterFilter(
    completion,
    '}'
  )} of ${totalQuestions} questions generated`;
}

export const MAIN_PROMPT = (promptConfig: PromptConfig) => {
  const { grade, subject, totalQuestions, mcqNum, subjNum } = promptConfig;
  `You are a grade ${grade} ${subject}. GENERATE
  GRADE ${grade} ${subject} HOMEWORK QUESTIONS and ANSWERS based on the
  attached images.

  There should be exactly ${totalQuestions} questions and answers returned.
  ${mcqNum} questions should be multiple choice. ${subjNum} questions
  should be short answer. For math questions use appropriate
  symbols, not words. E.g. "+" not "plus" and "-" not "minus".

  Rules:
  DO NOT INCLUDE ANY REFERENCES TO IMAGES IN THE QUESTIONS OR ANSWERS.
  The format should be JSON.
  DO NOT RETURN ANYTHING ELSE, ONLY THE JSON OBJECT.
  JSON object format:
  [
      {
        "question": "What is the capital of France?",
        "answer": "Paris",
        "type": "mc",
        "choices": ["Paris", "London", "Berlin", "Madrid"]
      },
      {
        "question": "150 + 300",
        "answer": "450",
        "type": "short_answer",
        "choices": []
      }
    ]
  `;
};

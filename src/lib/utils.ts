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

export const MAIN_PROMPT = (promptConfig: PromptConfig): string => {
  const { grade, subject, totalQuestions, mcqNum, subjNum, supplementalText } =
    promptConfig;
  return `You are a grade ${grade} ${subject} teacher that generates VALID JSON ONLY.

  Generate GRADE ${grade} ${subject} HOMEWORK QUESTIONS and ANSWERS based on the
  attached supplemental text. Structure the response as VALID JSON.

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
        "question_text": "What is the capital of France?",
        "correct_answer": "Paris",
        "question_type": "mc",
        "answer_choices": ["Paris", "London", "Berlin", "Madrid"]
      },
      {
        "question_text": "150 + 300",
        "correct_answer": "450",
        "question_type": "short_answer",
        "answer_choices": []
      }
  ]

  SUPPLEMENTAL TEXT to BASE QUESTION STYLE AND CONTENT ON:
  ${supplementalText}

  DO NOT RETURN ANYTHING ELSE, ONLY THE VALID JSON OBJECT.
  `;
};

export const arrayToObjectMap = (array: { id: number }[]) => {
  return array.reduce((acc, object) => {
    acc[object.id] = object;
    return acc;
  }, {});
};

export function zip(arr1, arr2) {
  return arr1.map((item, index) => [item, arr2[index]]);
}

// async function processUserCreationQueue(batchSize: number = 10) {

//   for (const user of pendingUsers) {
//     try {
//       // Sign up the user
//       const { data, error } = await supabase.auth.admin.createUser({
//         email: user.email,
//         email_confirm: true,
//         user_metadata: { full_name: user.name }
//       })

//       if (error) throw error

//       // Update the queue item status
//       await supabase
//         .from('user_creation_queue')
//         .update({ status: 'completed', processed_at: new Date().toISOString() })
//         .eq('id', user.id)

//       console.log(`User created successfully: ${user.email}`)
//     } catch (error) {
//       console.error(`Error creating user ${user.email}:`, error)

//       // Update the queue item status to 'failed'
//       await supabase
//         .from('user_creation_queue')
//         .update({ status: 'failed', processed_at: new Date().toISOString() })
//         .eq('id', user.id)
//     }
//   }
// }

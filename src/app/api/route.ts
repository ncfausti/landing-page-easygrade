// THIS FILE IS NOT CURRENTLY USED -- OR is it?

export const maxDuration = 30;
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
const openai = new OpenAI();

export async function POST(req: NextRequest, res: NextResponse) {
  const { body } = req;
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

  if (!result) {
    return new Response(JSON.stringify(res), { status: 400 });
  }

  const response = await openai.chat.completions.create({
    // model: 'gpt-4-turbo',
    model: 'gpt-4o-2024-05-13',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `You are a Math Teacher. Grade this homework. If unsure of an answer, add the question number to 'teacher_review' field and do not include it in the total number of questions.

            Response format examples:
            { incorrect_questions: [1, 3], total_questions: 5, teacher_review: [2] }
            { incorrect_questions: [9], total_questions: 10, teacher_review: [1, 4] }
            { incorrect_questions: [], total_questions: 8, teacher_review: [] }

            RETURN ONLY THE RESPONSE OBJECT AS PROPER JSON. DO NOT RETURN ANYTHING ELSE.
            `,
          },
          {
            type: 'image_url',
            image_url: {
              url: result,
            },
          },
        ],
      },
    ],
  });

  return new Response(JSON.stringify(response), { status: 200 });
}

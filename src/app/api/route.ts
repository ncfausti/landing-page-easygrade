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
    model: 'gpt-4-turbo',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `You are a Math Teacher. Grade this homework. Your response should be total number correct out of total number of questions. If unsure of an answer, mark it as TEACHER REVIEW and do not include it in the total number of questions.`,
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

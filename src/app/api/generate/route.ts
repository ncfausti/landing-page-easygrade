export const maxDuration = 30;
import { NextRequest, NextResponse } from 'next/server';
import { parseBody } from '@/lib/utils';
import OpenAI from 'openai';

const openai = new OpenAI();

export async function GET(req: NextRequest) {
  const { subject, grade } = Object.fromEntries(
    req.nextUrl.searchParams.entries()
  );

  console.log({ subject, grade });
  return new Response(JSON.stringify(subject + grade));
}

export async function POST(req: NextRequest, res: NextResponse) {
  const { body } = req;
  const result = await parseBody(body);
  const { subject, grade } = Object.fromEntries(
    req.nextUrl.searchParams.entries()
  );
  const prompt = `You are a grade ${grade} ${subject} teacher. Generate grade ${grade} ${subject} homework questions based on this image.`;
  console.log('Prompt: ', prompt);
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
            text: prompt,
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

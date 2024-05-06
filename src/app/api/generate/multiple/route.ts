export const maxDuration = 30;
import { NextRequest, NextResponse } from 'next/server';
import { parseBody } from '@/lib/utils';
import OpenAI from 'openai';

const openai = new OpenAI();

export async function GET() {
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'What are in these images? Is there any difference between them?',
          },
          {
            type: 'image_url',
            image_url: {
              url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg',
            },
          },
          {
            type: 'image_url',
            image_url: {
              url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg',
            },
          },
        ],
      },
    ],
  });
  return new Response(JSON.stringify(response), { status: 200 });
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

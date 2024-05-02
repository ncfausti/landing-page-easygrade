import { NextRequest, NextResponse } from 'next/server';
import { parseBody } from '@/lib/utils';
import OpenAI from 'openai';

const openai = new OpenAI();

export async function POST(req: NextRequest, res: NextResponse) {
  const { body } = req;
  const result = await parseBody(body);

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
            text: `You are a 5th grade teacher. Generate homework questions based on this image.`,
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

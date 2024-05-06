export const maxDuration = 30;
import { NextRequest, NextResponse } from 'next/server';
import { parseBody } from '@/lib/utils';
// import OpenAI from 'openai';
// const openai = new OpenAI();

import { StreamingTextResponse, streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

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
  const promptText = `You are a grade ${grade} ${subject} teacher. Generate grade ${grade} ${subject} homework questions based on this image. Use plaintext only. Separate questions with a new line.`;
  console.log('Prompt: ', promptText);

  if (!result) {
    return new Response(JSON.stringify(res), { status: 400 });
  }

  // const { prompt }: { prompt: string } = await req.json();
  // const prompt = `You are a grade 5 math teacher. Generate grade 5 math homework questions.`; // based on this image. Use plaintext only. Separate questions with a new line.`;

  const response = await streamText({
    model: openai('gpt-4-turbo'),
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: promptText,
          },
          {
            type: 'image',
            image: new URL(result),
          },
        ],
      },
    ],
  });

  console.log('stream text called...');
  return new StreamingTextResponse(response.toAIStream());

  // const response = await openai.chat.completions.create({
  //   model: 'gpt-4-turbo',
  //   messages: [
  //     {
  //       role: 'user',
  //       content: [
  //         {
  //           type: 'text',
  //           text: prompt,
  //         },
  //         {
  //           type: 'image_url',
  //           image_url: {
  //             url: result,
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // });

  // return new Response(JSON.stringify(response), { status: 200 });
}

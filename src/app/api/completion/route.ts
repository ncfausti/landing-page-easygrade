import { StreamingTextResponse, streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const { text, images } = JSON.parse(prompt);

  // console.log(images);

  const result = await streamText({
    model: openai('gpt-4-turbo'),
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: text,
          },
          {
            type: 'image',
            image: new URL(images),
          },
        ],
      },
    ],
  });

  return new StreamingTextResponse(result.toAIStream());
}

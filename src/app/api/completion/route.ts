import { StreamingTextResponse, streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const { text, images } = JSON.parse(prompt);

  // console.log(images.length); // 2 (if 2 images are provided
  // TODO: images is currently a string, but it should be an array of strings

  // 1. can I provide streamText with multiple images? YES!
  // 2. can I provide streamText with a pdf?
  // 3. can I provide streamText with a pdf and images?

  const imageToObject = images.map((image) => {
    return {
      type: 'image',
      image: new URL(image),
    };
  });
  const result = await streamText({
    model: openai('gpt-4o-2024-05-13'),
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
            image: new URL(
              'https://plus.unsplash.com/premium_photo-1661871178548-e35aece53d53?q=80&w=3300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            ),
          },
          {
            type: 'image',
            image: new URL(
              'https://plus.unsplash.com/premium_photo-1661871178548-e35aece53d53?q=80&w=3300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            ),
          },
          {
            type: 'image',
            image: new URL(
              'https://plus.unsplash.com/premium_photo-1661871178548-e35aece53d53?q=80&w=3300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            ),
          },
          ...imageToObject.slice(0, 3),
        ],
      },
    ],
  });

  return new StreamingTextResponse(result.toAIStream());
}

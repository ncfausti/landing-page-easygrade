import { StreamingTextResponse, streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
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
    console.log(
      'api/completion/route.ts: calling openAI with text and images now...'
    );
    const result = await streamText({
      model: openai('gpt-4o'),
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: text,
            },
            ...imageToObject.slice(0, 3),
          ],
        },
      ],
    });

    return new StreamingTextResponse(result.toAIStream());
  } catch (e) {
    return new Response(e.message, { status: 500 });
  }
}

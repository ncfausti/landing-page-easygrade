import OpenAI from 'openai';

const openai = new OpenAI();

export async function GET() {
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: 'What’s in this image?' },
          {
            type: 'image_url',
            image_url: {
              url: 'https://cdn-images-1.medium.com/v2/resize:fit:1600/1*0s18SQQ5yXHIjpYNpi3bAA@2x.jpeg',
            },
          },
        ],
      },
    ],
  });

  return new Response(JSON.stringify(response), { status: 200 });
}

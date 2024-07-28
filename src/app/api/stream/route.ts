// // import { openai } from '@ai-sdk/openai';
// import { StreamingTextResponse, streamText } from 'ai';
// import OpenAI from 'openai';
// const openai = new OpenAI();

// export async function POST() {
//   // const { messages } = await req.json();

//   // const result = await streamText({
//   //   model: openai('gpt-4-turbo'),
//   //   messages,
//   // });

//   const stream = await openai.chat.completions.create({
//     model: 'gpt-4',
//     messages: [{ role: 'user', content: 'Say this is a test' }],
//     stream: true,
//   });
//   for await (const chunk of stream) {
//     process.stdout.write(chunk.choices[0]?.delta?.content || '');
//   }

//   return new StreamingTextResponse(stream.toAIStream());
// }

import { openai } from '@ai-sdk/openai';
import { StreamingTextResponse, streamText } from 'ai';

export async function POST(req) {
  const { messages } = await req.json();
  const result = await streamText({
    model: openai('gpt-4-turbo'),
    messages,
  });

  return new StreamingTextResponse(result.toAIStream());
}

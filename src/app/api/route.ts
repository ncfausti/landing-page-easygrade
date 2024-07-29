export const maxDuration = 30;
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
const openai = new OpenAI();

export async function POST(req: NextRequest, res: NextResponse) {
  const { body } = req;
  const requestUrl = new URL(req.url);
  const subject = requestUrl.searchParams.get('subject');
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

  const PROMPT = `
            You are a ${subject} teacher. Use the submitted image to grade the homework assignment.
            Iterate through each question, thinking step-by-step whether the answer is correct or incorrect. If incorrect, state why in the 'reason' field. If unsure, mark the question as correct, but give the reason as "TEACHER REVIEW".

            EXAMPLE JSON RESPONSE:

            [ { correct: true}, { correct: false, reason: "1+1 = 2"}, {correct: true}, {correct: true, reason: "TEACHER REVIEW"}]

            RETURN WELL-FORMED JSON  ONLY
            `;
  console.log(PROMPT);
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: PROMPT,
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

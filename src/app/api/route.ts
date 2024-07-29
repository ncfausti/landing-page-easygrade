export const maxDuration = 30;
import { saveGradeToAssignment } from '@/data/user/assignments';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
const openai = new OpenAI();

export async function POST(req: NextRequest, res: NextResponse) {
  const { body } = req;
  const requestUrl = new URL(req.url);
  const subject = requestUrl.searchParams.get('subject');
  const assignment_template_id = requestUrl.searchParams.get('aid');
  const student_id = requestUrl.searchParams.get('sid');
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

  // simplify this process significantly by including the answers to the questions
  // and asking if the answers are (roughly) match
  // still need to figure out dodgy OCR issues but that should be the ONLY thing we need to worry about
  const PROMPT = `
            You are a ${subject} teacher. Use the submitted image to grade the homework assignment.

            RULES:
            1. Identify how many questions are in the image. Store this value in question_count.
            1b.  Use the numbers in the image to determine the number of questions.
            2. For each question, determine if the answer is correct or incorrect. If correct, mark the question as correct.
            2b.  If incorrect, state why it is incorrect in the 'reason' field.
            2c.  If unsure, mark the question as correct, but give the reason as "TEACHER REVIEW".
            3. Store the number of incorrect questions in incorrect_count.
            4. IF AN ITEM HAS NO ANSWER MARK IT AS INCORRECT.

            EXAMPLE JSON RESPONSE:

            { question_count: 4, incorrect_count: 1, questions: [ { correct: true}, { correct: false, reason: "1+1 = 2"}, {correct: true}, {correct: true, reason: "TEACHER REVIEW"}]}

            RETURN WELL-FORMED JSON ONLY
            DO NOT RETURN ANYTHING ELSE, ONLY THE JSON OBJECT.
            THE RETURNED OBJECT MUST BE ABLE TO BE PARSED INTO JSON.
            `;
  console.log(PROMPT);
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
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

  console.log(response.choices.map((c) => JSON.parse(c.message.content)));
  const [results] = response.choices.map((c) => JSON.parse(c.message.content));

  try {
    await saveGradeToAssignment(
      parseInt(student_id),
      assignment_template_id,
      results.incorrect_count
    );
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }

  return new Response(JSON.stringify(response), { status: 200 });
}

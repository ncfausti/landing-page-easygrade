import { NextRequest } from 'next/server';

export async function GET() {
  return new Response('Hello, world!');
}

export async function POST(req: NextRequest) {
  const { body } = req;
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
  return new Response(result);
}

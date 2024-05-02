import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function parseBody(body: ReadableStream<Uint8Array> | null) {
  if (!body) {
    return '';
  }

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

  return result;
}

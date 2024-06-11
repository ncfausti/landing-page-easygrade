import { createClient } from '@supabase/supabase-js';
// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to create a user profile
async function createUserProfile(email, temporaryPassword) {
  try {
    // Sign up the user
    const { data, error } = await supabase.auth.admin.createUser({
      email: email,
      password: temporaryPassword,
      email_confirm: true,
    });

    if (error) {
      throw error;
    }

    console.log(`User created: ${data.user.email}`);
    console.log(email, ',', temporaryPassword, ',', data.user.id);
    return ``;
  } catch (error) {
    console.error('Error creating user:', error.message);
  }
}

// Example usage
// (async () => {
//   const email = 'ncfausti@gmail.com';
//   const temporaryPassword = Math.random().toString(36).slice(-8);

//   await createUserProfile(email, temporaryPassword);
// })();

import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { email, pw } = Object.fromEntries(req.nextUrl.searchParams.entries());
  const user = await createUserProfile(email, pw);
  return new Response(JSON.stringify([user]));
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

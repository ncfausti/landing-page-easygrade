import { createClient } from '@supabase/supabase-js';
import { verifySignatureAppRouter } from '@upstash/qstash/nextjs';
// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
import { NextRequest } from 'next/server';

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

export async function GetHandler(req: NextRequest) {
  const { email, pw } = Object.fromEntries(req.nextUrl.searchParams.entries());
  const user = await createUserProfile(email, pw);
  return new Response(JSON.stringify([user]));
}

// This is the endpoint that will be invoked by QStash.
// It will take in a JSON object with the following format:
// {
//   "email": "
//   "password": "
// }
// The function will then create a user profile in Supabase with the given email and password.
// The temporary password will be used to create the user profile.
// The user profile will be created using the createUserProfile function.
// The function will return a JSON object with the user's email and ID.
// The function will log the user's email and ID to the console.

export async function PostHandler(request: NextRequest) {
  const payload = await request.json();

  // for (let i = 0; i < 10; i++) {
  //   await fetch('https://firstqstashmessage.requestcatcher.com/test', {
  //     method: 'POST',
  //     body: JSON.stringify({ ...data, addedTS: new Date().toISOString() }),
  //     headers: { 'Content-Type': 'application/json' },
  //   });
  //   await new Promise((resolve) => setTimeout(resolve, 500));
  // }

  // we're scheduling the jobs using batchJSON now so we only need to send the data once
  // the endpoint will get invoked for each job
  payload.hello += `${new Date().toISOString()}`;
  console.log('payload at api/batch-users/add endpoint:', payload);

  await fetch('https://firstqstashmessage.requestcatcher.com/test', {
    method: 'POST',
    body: JSON.stringify({ ...payload, addedTS: new Date().toISOString() }),
    headers: { 'Content-Type': 'application/json' },
  });

  const { email, name } = payload;
  try {
    // Sign up the user
    const { data, error } = await supabase.auth.admin.createUser({
      email: email,
      password: 'Password1234!',
      email_confirm: true,
      user_metadata: { full_name: name },
    });

    if (error) {
      throw error;
    }

    console.log(`User created: ${data.user.email}`);
    console.log(email, ',', 'Password1234!', ',', data.user.id);
    return new Response(JSON.stringify([data.user]));
  } catch (error) {
    console.error('Error creating user:', error.message);
    return new Response(JSON.stringify([]));
  }
}
export const POST = verifySignatureAppRouter(PostHandler);
export const GET = verifySignatureAppRouter(GetHandler);

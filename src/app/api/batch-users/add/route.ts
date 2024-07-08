import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
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

import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
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

export async function POST(request: NextRequest) {
  const data = await request.json();

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
  data.hello += `${new Date().toISOString()}`;
  console.log('Data at api/batch-users/add endpoint:', data);

  await fetch('https://firstqstashmessage.requestcatcher.com/test', {
    method: 'POST',
    body: JSON.stringify({ ...data, addedTS: new Date().toISOString() }),
    headers: { 'Content-Type': 'application/json' },
  });

  return Response.json({ success: true });
}

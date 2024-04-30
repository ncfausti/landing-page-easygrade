import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function uploadPhoto(file) {
  // Sign in anonymously
  // const { user, error: signInError } = await supabase.auth.signIn();
  const { data: user, error } = await supabase.auth.signInAnonymously();

  if (error) {
    console.error('Error signing in:', error);
    return;
  }
  console.log(user);

  // Upload photo to storage
  const { data, error: uploadError } = await supabase.storage
    .from('homework')
    .upload(`${file.name}`, file, {
      cacheControl: '3600', // Optional: set cache control headers
      upsert: false, // Optional: prevent overwriting existing files with the same name
    });

  if (uploadError) {
    console.error('Error uploading file:', uploadError);
    return;
  }

  console.log('File uploaded successfully', data);
}

// Example usage with a file input element
// document.getElementById('file-input').addEventListener('change', (event) => {
//   const file = event.target.files[0];
//   uploadPhoto(file);
// });

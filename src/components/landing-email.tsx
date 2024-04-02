/**
 * v0 by Vercel.
 * @see https://v0.dev/t/uVG77qDcbLd
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
'use client';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function LandingEmail() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  console.log(supabase);

  const [messageText, setMessageText] = useState('');
  const handleTextChange = (event) => {
    setMessageText(event.target.value);
  };

  // Function to insert a row into the Supabase table
  const insertMessage = async () => {
    if (!messageText.trim()) return; // Check if the messageText is not just empty spaces

    const { data, error } = await supabase
      .from('emails') // Your table name
      .insert([
        { email: messageText }, // Use the state variable here
      ]);

    if (error) {
      console.error('Error inserting email:', error);
    } else {
      console.log('email inserted:', data);
      setMessageText(''); // Optionally clear the textbox after insert
    }
  };

  return (
    <>
      <input
        type="email"
        className="border-2 border-black rounded-md p-2"
        value={messageText}
        onChange={handleTextChange}
        placeholder="Enter email address"
      ></input>
      <button
        className="inline-flex h-12 items-center justify-center rounded-md border-2 border-black bg-yellow-500 px-8 text-sm font-extrabold shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
        onClick={insertMessage}
      >
        Submit
      </button>
    </>
  );
}

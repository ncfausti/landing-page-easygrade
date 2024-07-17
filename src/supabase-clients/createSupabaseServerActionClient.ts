'use server';
import { Database } from '@/lib/database.types';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const createSupabaseServerActionClient = () =>
  createServerActionClient<Database>(
    {
      cookies,
    },
    {
      options: {
        global: {
          fetch,
        },
      },
    }
  );

export const getSupabaseServerActionClientAndCurrentUser = async () => {
  const supabaseClient = createSupabaseServerActionClient();
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();
  const currentUser = session.user;
  return { currentUser, supabaseClient };
};

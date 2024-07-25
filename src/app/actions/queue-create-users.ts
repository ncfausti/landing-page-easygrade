'use server';

import { createClient, User } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// type UserSubmission = {
//   name: string;
//   email: string;
// };

// export async function submitUserList(users: UserSubmission[]) {
//   const { data, error } = await supabase
//     .from('user_creation_queue')
//     .insert(users);

//   if (error) throw error;
//   return data;
// }

type UserCreationResult = {
  email: string;
  status: 'success' | 'error';
  data?: { user: User } | { user: null };
  message?: string;
};

function generateRandomPassword(): string {
  // Implement your password generation logic here
  return 'temporaryPassword123!'; // This is just a placeholder
}

export async function createMultipleUsers(
  emailNameList: { email: string; name: string }[]
): Promise<UserCreationResult[]> {
  const results: UserCreationResult[] = [];

  for (const emailName of emailNameList) {
    try {
      const { email, name } = emailName;
      const { data, error } = await supabase.auth.admin.createUser({
        email: email,
        password: generateRandomPassword(),
        email_confirm: true,
        user_metadata: { name },
      });

      if (error) {
        results.push({ email, status: 'error', message: error.message });
      } else {
        results.push({ email, status: 'success', data });
      }
    } catch (error) {
      results.push({
        email: emailName.email,
        status: 'error',
        message: (error as Error).message,
      });
    }
  }

  return results;
}

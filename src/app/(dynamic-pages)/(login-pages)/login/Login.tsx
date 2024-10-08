'use client';
import { RenderProviders } from '@/components/Auth/RenderProviders';
import { Email } from '@/components/Auth/Email';
import { EmailAndPassword } from '@/components/Auth/EmailAndPassword';
import {
  useSignInWithMagicLink,
  useSignInWithPassword,
  useSignInWithProvider,
} from '@/utils/react-query-hooks';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { T } from '@/components/ui/Typography';

export function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isFromConfirmEmail = searchParams.get('confirmed');
  const redirectToLocation = searchParams.get('redirectTo');
  // console.log('isFromConfirmEmail', isFromConfirmEmail);

  function redirectToDashboard() {
    router.refresh();
    router.push('/auth/callback?url=' + redirectToLocation);
  }
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const magicLinkMutation = useSignInWithMagicLink({
    onSuccess: () => {
      setSuccessMessage('A magic link has been sent to your email!');
    },
  });
  const passwordMutation = useSignInWithPassword({
    onSuccess: redirectToDashboard,
  });
  const providerMutation = useSignInWithProvider();
  return (
    <div className="container h-full grid items-center text-left max-w-lg mx-auto overflow-auto">
      <div className="space-y-8 ">
        {/* <Auth providers={['twitter']} supabaseClient={supabase} /> */}
        <div className="flex flex-col items-start gap-0 w-[320px]">
          <T.H4 className="leading-7">Login to autolectual</T.H4>
          <T.P className="text-base text-left text-muted-foreground">
            Login with the account you used to signup.
          </T.P>
        </div>
        <RenderProviders
          providers={[]}
          isLoading={providerMutation.isLoading}
          onProviderLoginRequested={(provider) => {
            providerMutation.mutate({
              provider,
            });
          }}
        />
        <Email
          onSubmit={(email) => {
            magicLinkMutation.mutate({
              email,
            });
          }}
          successMessage={successMessage}
          isLoading={magicLinkMutation.isLoading}
          view="sign-in"
        />
        <hr />
        {isFromConfirmEmail && (
          <T.P className="text-base text-green-600 text-left">
            Your email has been confirmed. You can now login.
          </T.P>
        )}
        <EmailAndPassword
          isLoading={passwordMutation.isLoading}
          onSubmit={(data) => {
            passwordMutation.mutate(data);
          }}
          view="sign-in"
        />
      </div>
    </div>
  );
}

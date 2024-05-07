'use client';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


// Create a client
const queryClient = new QueryClient();
// This layout component can be used with React state, context and more as it is a client component.
export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container relative">
      <section>
        {/* <ExamplesNav /> */}
        <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow">
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
          <Toaster />
        </div>
      </section>
    </div>
  );
};

// <main className="flex-1">
//   <div className="container">
//     <QueryClientProvider client={queryClient}>
//       {children}
//     </QueryClientProvider>
//     <Toaster />
//   </div>
// </main>

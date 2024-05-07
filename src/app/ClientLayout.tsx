'use client';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { cn } from "@/lib/utils"
import { Announcement } from "@/components/announcement"
import { ExamplesNav } from "@/components/examples-nav"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { buttonVariants } from "@/registry/new-york/ui/button"
import Link from "next/link"


// Create a client
const queryClient = new QueryClient();
// This layout component can be used with React state, context and more as it is a client component.
export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container relative">
      <PageHeader>
        <Announcement />
        <PageHeaderHeading className="hidden md:block">
          Check out some examples
        </PageHeaderHeading>
        <PageHeaderHeading className="md:hidden">Examples</PageHeaderHeading>
        <PageHeaderDescription>
          Dashboard, cards, authentication. Some examples built using the
          components. Use this as a guide to build your own.
        </PageHeaderDescription>
        <PageActions>
          <Link href="/docs" className={cn(buttonVariants(), "rounded-[6px]")}>
            Get Started
          </Link>
          <Link
            href="/components"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-[6px]"
            )}
          >
            Components
          </Link>
        </PageActions>
      </PageHeader>
      <section>
        <ExamplesNav />
        <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow">
          {children}
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
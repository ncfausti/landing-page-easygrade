import { ClientLayout } from './ClientLayout';
import { Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { ExternalNavigation } from './Navbar';
import Footer from '@/components/tailwind/Footer';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Navbar } from './Navbar';
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export const metadata = {
  title: 'AssistTeacher',
  description: 'Homework made simple',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto_mono.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://use.typekit.net/fpl1mbs.css"
        ></link>
      </head>
      <body>
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
          <ExternalNavigation />
          <Navbar />
          <ClientLayout>{children}</ClientLayout>
          <Footer />
        </div>
        <SpeedInsights />
      </body>
    </html>
  );
}

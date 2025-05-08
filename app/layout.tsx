import type { Metadata } from 'next';
import { Source_Sans_3 as FontSans } from 'next/font/google';
import './globals.css';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import { ClerkProvider } from '@clerk/nextjs';
import BgGradient from '@/components/common/bg-gradient';
import { Toaster } from 'sonner';

const fontSans = FontSans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Brevia - AI-Powered PDF Summarization',
  description:
    'Save hours of reading time with AI-powered PDF summarization. Transform lengthy PDFs into clear, concise and accurate summaries in seconds with our advanced AI technology.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        <body className={`${fontSans.variable} font-sans antialiased`}>
          <Toaster />
          <div className="relative flex flex-col min-h-screen">
            <BgGradient />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}

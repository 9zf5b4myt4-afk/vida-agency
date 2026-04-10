import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Analytics } from '@vercel/analytics/react'; // <--- THIS IS THE MISSING LINE
import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Your new Premium SEO & Open Graph Configuration
export const metadata: Metadata = {
  metadataBase: new URL('https://vidasystems.agency'),
  title: "Vida Systems | Digital Agency",
  description: "Your trusted partner for digital transformation. We build high-performing websites, digital applications, and software across Francophone Africa.",
  openGraph: {
    title: "Vida Systems | Digital Agency",
    description: "Your trusted partner for digital transformation. We build high-performing websites, digital applications, and software across Francophone Africa.",
    url: 'https://vidasystems.agency',
    siteName: 'Vida Systems',
    images: [
      {
        url: '/og-image.jpg', // We will add this image in the next step!
        width: 1200,
        height: 630,
        alt: 'Vida Systems Agency',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Vida Systems | Digital Agency",
    description: "Your trusted partner for digital transformation. We build high-performing websites, digital applications, and software across Francophone Africa.",
    images: ['/og-image.jpg'],
  },
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html 
      lang={locale} 
      className="scroll-smooth" 
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      translate="no"
    >
      <body className="antialiased bg-[#050505] text-[#fafafa] selection:bg-blue-500/30 flex flex-col min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          
          <div className="grow">
            {children}
          </div>
          
          <Footer />
        </NextIntlClientProvider>
        
        {/* Vercel Analytics tracking injected seamlessly */}
        <Analytics />
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "@/app/globals.css";// Adjusted path since this file is now inside [locale]
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Vida | Digital Agency",
  description: "High-Performance Web Development for Francophone Africa.",
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // Await the params (Next.js 15 standard) and get the dictionary for the current language
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
        {/* We wrap the app so all Client Components can read the JSON dictionaries */}
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {/* The main content area grows to push the footer down */}
          <div className="grow">
            {children}
          </div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
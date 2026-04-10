import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'fr'],

  // Used when no locale matches
  defaultLocale: 'en',
  
  // This tells Vercel to automatically read the user's preferred language/location
  localeDetection: true,
});

export const config = {
  // This matcher tells the middleware to run on all pages EXCEPT API routes, Next.js internals, and images
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
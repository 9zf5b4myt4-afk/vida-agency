import { getRequestConfig } from 'next-intl/server';

const locales = ['en', 'fr'];

export default getRequestConfig(async (config) => {
  // Extract the locale safely (handles both Next 14 and Next 15/16 architectures)
  const requestLocale = await config.requestLocale;
  let locale = requestLocale || config.locale || 'en';

  // Instead of throwing a 404 and crashing, we safely default to English
  if (!locales.includes(locale as any)) {
    locale = 'en';
  }

  return {
    locale: locale as string,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
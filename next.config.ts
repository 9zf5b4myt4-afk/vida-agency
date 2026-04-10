import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Point the plugin to our new config file
const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.vidasystems.agency',
      },
    ],
  },
};

// Export the config wrapped in the translation engine
export default withNextIntl(nextConfig);
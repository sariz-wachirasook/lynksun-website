import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import compress from 'astro-compress';
import robotsTxt from 'astro-robots-txt';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';
import partytown from '@astrojs/partytown';

const { PUBLIC_SITE_URL, NODE_ENV } = loadEnv(import.meta.env, process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  site: PUBLIC_SITE_URL,

  integrations: [
    // @astrojs/sitemap: https://docs.astro.build/en/guides/integrations-guide/sitemap/
    sitemap(),
    // astro-robots-txt: https://github.com/alextim/astro-lib/tree/main/packages/astro-robots-txt#readme
    robotsTxt(),
    // @astrojs/react: https://docs.astro.build/en/guides/integrations-guide/react/
    react(),
    // astro-compress: https://github.com/astro-community/astro-compress#readme
    compress(),
    // @astrojs/partytown: https://docs.astro.build/en/guides/integrations-guide/partytown/
    partytown({
      config: {
        debug: NODE_ENV === 'development',
        forward: ['dataLayer.push'],
      },
    }),
  ],
});

import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import compress from 'astro-compress';
import robotsTxt from 'astro-robots-txt';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';

const { PUBLIC_SITE_URL } = loadEnv(import.meta.env, process.cwd(), '');

console.log('PUBLIC_SITE_URL', PUBLIC_SITE_URL);

// https://astro.build/config
export default defineConfig({
  site: PUBLIC_SITE_URL,

  integrations: [
    // @astrojs/sitemap: https://docs.astro.build/en/guides/integrations-guide/sitemap/
    sitemap(),
    // astro-robots-txt: https://github.com/alextim/astro-lib/tree/main/packages/astro-robots-txt#readme
    robotsTxt(),

    react(),
    // astro-compress: https://github.com/astro-community/astro-compress#readme
    compress(),
  ],
});

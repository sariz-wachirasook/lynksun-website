import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import compress from 'astro-compress';
import robotsTxt from 'astro-robots-txt';
import sitemap from '@astrojs/sitemap';

const site = import.meta.env.SITE_URL;

// https://astro.build/config
export default defineConfig({
  site: site,

  integrations: [
    react(),
    // astro-compress: https://github.com/astro-community/astro-compress#readme
    compress(),
    // astro-robots-txt: https://github.com/alextim/astro-lib/tree/main/packages/astro-robots-txt#readme
    robotsTxt(),
    // @astrojs/sitemap: https://docs.astro.build/en/guides/integrations-guide/sitemap/
    sitemap(),
  ],
});

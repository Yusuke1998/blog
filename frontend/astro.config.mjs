import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import node from "@astrojs/node";
import mdx from '@astrojs/mdx';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.jhonnyprz.site',
  integrations: [mdx(), sitemap(), tailwind()],
  output: 'server',
  server: { port: 8080 },
  adapter: node({
    mode: "standalone"
  })
});
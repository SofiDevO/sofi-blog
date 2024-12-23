import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.itssofi.dev',
  integrations: [react(), tailwind()],
  output: 'hybrid',
  adapter: vercel(),
  experimental: {
    serverIslands: true,
  },
});
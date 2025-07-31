import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

import vercel from "@astrojs/vercel";

import robotsTxt from "astro-robots-txt";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://sofidev.blog/",
  prefetch: {
    prefetchAll: true,
  },
  integrations: [
    react(),
    tailwind(),
    robotsTxt({
      policy: [
        {
          userAgent: "*",
          allow: "/",
          disallow: ["/private", "/login", "/dashboard", "/register"],
        },
      ],
      sitemap: "https://sofidev.blog/sitemap-index.xml",
    }),

    sitemap({
      filter: (page) =>
        !page.includes("/private") &&
        !page.includes("/dashboard") &&
        !page.includes("/register"),
      serialize: (page) => {
        return {
          url: page,
          changefreq: "daily",

          priority: 0.8,
        };
      },
    }),
  ],
  output: "server",
  adapter: vercel(),
});

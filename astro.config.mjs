import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

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
        !page.includes("/register") &&
        !page.includes("/login"),
      serialize: (item) => {
        return {
          url: item.url,
          changefreq: "daily",
          priority: 0.8,
        };
      },
    }),
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
          importers: [
            {
              findFileUrl(url) {
                const aliases = {
                  "@src/": "src/",
                  "@components/": "src/components/",
                  "@atoms/": "src/components/atoms/",
                  "@molecules/": "src/components/molecules/",
                  "@organisms/": "src/components/organisms/",
                  "@layouts/": "src/layouts/",
                  "@utils/": "src/utils/",
                  "@content/": "src/content/",
                  "@pages/": "src/pages/",
                  "@controllers/": "src/controllers/",
                  "@services/": "src/services/",
                  "@data/": "src/data/",
                  "@sass/": "src/sass/",
                  "@img/": "public/img/",
                };
                for (const [alias, folder] of Object.entries(aliases)) {
                  if (url.startsWith(alias)) {
                    return new URL(
                      "./" + folder + url.slice(alias.length),
                      import.meta.url,
                    );
                  }
                }
                return null;
              },
            },
          ],
        },
      },
    },
  },
  output: "server",
  adapter: vercel(),
});

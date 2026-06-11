import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import path from "node:path";

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
    resolve: {
      alias: {
        "@src": path.resolve("./src"),
        "@layouts": path.resolve("./src/layouts"),
        "@shared": path.resolve("./src/shared"),
        "@utils": path.resolve("./src/utils"),
        "@content": path.resolve("./src/content"),
        "@pages": path.resolve("./src/pages"),
        "@services": path.resolve("./src/services"),
        "@sass": path.resolve("./src/sass"),
        "@data": path.resolve("./src/data"),
        "@controllers": path.resolve("./src/controllers"),

      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
          importers: [
            {
              findFileUrl(url) {
                const aliases = {
                  "@src/": "src/",
                  "@layouts/": "src/layouts/",
                  "@shared/": "src/shared/",
                  "@utils/": "src/utils/",
                  "@content/": "src/content/",
                  "@pages/": "src/pages/",
                  "@controllers/": "src/controllers/",
                  "@services/": "src/services/",
                  "@sass/": "src/sass/",

                  "@types/": "src/types/",
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

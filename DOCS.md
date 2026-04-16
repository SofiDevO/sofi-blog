# Astro v6 / Vite 6 Upgrade Guide: Breaking Changes

This document outlines the major breaking changes experienced after migrating the project to **Astro v6** (which ships with **Vite 6** under the hood), specifically detailing what broke, why it broke, and the required implementation fixes.

---

## 1. Sass Module Resolution (`@use` and Aliases)

### The Issue
During the build process, the Sass compiler threw `Can't find stylesheet to import` errors for typescript paths defined in `tsconfig.json` (e.g., `@sass/variables`, `@atoms/Title/title`).

### Why it Broke
By default, Vite 6 migrated its underlying CSS processor from the deprecated `legacy` Dart Sass API to the newer `modern-compiler` API. This new native API handles internal bindings differently and **no longer resolves Vite or TypeScript aliases natively** when encountering `@use` or `@forward` directives.

### Before (Astro v5 / Vite 5)
Previously, standard Sass syntax directly utilized TS/Vite aliases intrinsically:
```scss
// Automatically mapped by Vite compiler legacy API
@use "@sass/variables" as *;
```

### After (Astro v6 / Vite 6)
To restore this functionality within the `modern-compiler`, we establish custom URL importers directly in `astro.config.mjs` using `preprocessorOptions`. This script intercepts requests to aliases and manually translates them into valid `file://` objects (powered by `import.meta.url`), satisfying the new Sass strict format.

```javascript
/* astro.config.mjs */
export default defineConfig({
  // ...
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
          importers: [
            {
              findFileUrl(url) {
                const aliases = {
                  "@atoms/": "src/components/atoms/",
                  "@sass/": "src/sass/",
                  // ... mapping other tsconfig paths
                };
                for (const [alias, folder] of Object.entries(aliases)) {
                  if (url.startsWith(alias)) {
                    // Modern API expects absolute URL formats.
                    return new URL("./" + folder + url.slice(alias.length), import.meta.url);
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
});
```

---

## 2. Environment Variables Destructuring (`import.meta.env`)

### The Issue
Application runtime processes, specifically the `jsonwebtoken` service, were abruptly throwing `secretOrPrivateKey must have a value` errors.

### Why it Broke
Vite 6 enforces much stricter performance checks and heavily relies on **static string replacement** for environment variables. Destructuring `import.meta.env` involves reading object properties *dynamically*, which Vite's transformer willfully ignores. As a result, destructured secrets and authentication parameters were reading as `undefined`.

### Before (Astro v5)
It used to be plausible to access loaded `.env` variables via standard object destructuring:
```javascript
// Vite ignored the dynamic lookup, resolving variables as undefined
const { SECRET_KEY, WPGRAPHQL_URL } = import.meta.env;

const token = Jwt.sign(data, SECRET_KEY, { expiresIn: "1h" }); // SECRET_KEY is undefined causing fatal crash
```

### After (Astro v6 / Vite 6)
You must statically and explicitly state the variable path. This explicitly instructs Vite to swap `import.meta.env.VARIABLE_NAME` literal strings with their evaluated string matches precisely during the build transformation process.

```javascript
// Successfully swapped by literal replacements
const SECRET_KEY = import.meta.env.SECRET_KEY;
const WPGRAPHQL_URL = import.meta.env.WPGRAPHQL_URL;

const token = Jwt.sign(data, SECRET_KEY, { expiresIn: "1h" }); // Secret effectively decoded
```

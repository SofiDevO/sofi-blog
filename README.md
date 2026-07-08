# SofiBlog

A blog web application that uses Astro as the frontend framework and WordPress acting as a Headless CMS coupled via the WPGraphQL plugin. The application takes advantage of Astro's features to provide highly optimized content delivery through a mix of on-the-fly Server-Side Rendering (SSR) and pre-rendered pages (Static Site Generation or SSG), allowing for high performance, robust SEO, and dynamic interactivity when required (such as the authentication and commenting system).

---

## Features

- **Performance**: Built with Astro SSR for optimal performance and SEO
- **Responsive Design**: Mobile-first layout with Tailwind CSS and Sass
- **Dark Mode**: System-aware theme toggle with persistent preference
- **User Authentication**: JWT-based login, registration, and user dashboard
- **Comments System**: Interactive commenting with threaded reply functionality
- **Search**: Full-text search across all blog content
- **Categories**: Organized content sections (tutorials, JavaScript, Astro, etc.)
- **Languages Section**: Structured learning paths by programming language with module detail pages
- **Contributors / Support Page**: Public contributor profiles and GitHub activity animation
- **WordPress Integration**: Headless WordPress CMS via WP GraphQL
- **Sitemap and robots.txt**: Auto-generated with private route filtering
- **Vercel Deployment**: SSR adapter configured for Vercel

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Astro 6.x |
| UI Library | React 19 (islands) |
| Language | TypeScript 5.x |
| Styling | Tailwind CSS 3.x, Sass (SCSS) |
| CMS | WordPress (Headless) + WP GraphQL |
| Auth | JSON Web Tokens (jsonwebtoken) |
| Secrets | Infisical CLI (`infisical run`) |
| Deployment | Vercel (SSR adapter) |
| Package Manager | pnpm |
| Build Tools | Vite (via Astro), astro check |

---

## Upgrading to Astro v6

If you are migrating from previous versions or experiencing issues with Sass `@use` imports or missing environment variables (e.g., `jsonwebtoken` signature errors in production), please review the [Astro v6 Upgrade Guide](./DOCS.md).

---

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm
- WordPress site with WP GraphQL plugin installed and activated

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/SofiDevO/sofi-blog.git
   cd sofi-blog
   ```

2. Install dependencies

   ```bash
   pnpm install
   ```

3. Configure environment variables

   Create a `.env` file based on `dev.env`:

   ```bash
   cp dev.env .env
   ```

   Update the following variables:

   ```env
   SECRET_USER=your_wordpress_username
   SECRET_PASSWORD=your_wordpress_app_password
   WPGRAPHQL_URL=https://your-wordpress-site.com/graphql
   SECRET_KEY=your_jwt_secret_key
   ```

4. Start the development server

   ```bash
   pnpm dev
   ```

   The server starts at `http://localhost:4321`.

5. Build for production

   ```bash
   pnpm build
   ```

---

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server on port 4321 (no secrets manager) |
| `pnpm dev:vault` | Start dev server with Infisical secrets (dev env) |
| `pnpm start` | Alias for `dev:vault` |
| `pnpm build` | Run `astro check` then build for production |
| `pnpm build:vault` | Build with Infisical secrets (prod env) |
| `pnpm preview` | Preview production build locally with Infisical |

---

## Project Structure

```
sofi-blog/
├── astro.config.mjs          # Astro configuration (integrations, Vite aliases, SSR)
├── package.json
├── pnpm-workspace.yaml
├── tailwind.config.mjs
├── tsconfig.json
├── DOCS.md                   # Astro v6 upgrade and migration notes
├── public/                   # Static assets served as-is
└── src/
    ├── consts.ts             # Global app constants
    ├── env.d.ts              # Environment variable type declarations
    ├── controllers/          # Client-side JS controllers (vanilla JS)
    │   ├── comments.controller.js
    │   ├── hamburger.controller.js
    │   └── themeToggle.controller.js
    ├── data/
    │   └── siteData.js       # Site-level metadata (name, description, socials)
    ├── layouts/              # Shared Astro page layouts
    │   ├── Layout.astro      # Main layout (Header + Footer + global styles)
    │   ├── LayoutNoHeader.astro
    │   └── PostTypes.astro
    ├── pages/                # File-based routing (Astro pages)
    │   ├── index.astro       # Home page
    │   ├── login.astro
    │   ├── register.astro
    │   ├── resultados.astro  # Search results page
    │   ├── 404.astro
    │   ├── api/
    │   │   ├── auth/
    │   │   │   ├── login.ts         # POST /api/auth/login
    │   │   │   ├── register.ts      # POST /api/auth/register
    │   │   │   └── signout.ts       # POST /api/auth/signout
    │   │   └── comments/
    │   │       └── replies.ts       # GET /api/comments/replies
    │   ├── authors/
    │   │   ├── index.astro
    │   │   └── [slug].astro
    │   ├── categories/
    │   │   ├── index.astro
    │   │   ├── _components/         # Category-scoped components
    │   │   └── [slug]/
    │   ├── dashboard/               # Protected user dashboard
    │   │   ├── Layout.astro
    │   │   ├── index.astro
    │   │   ├── mis-posts.astro
    │   │   ├── _dashboard.scss
    │   │   ├── styles/
    │   │   └── _components/
    │   ├── home/
    │   │   └── _components/         # Home-scoped components
    │   ├── languages/               # Learning paths by language
    │   │   ├── index.astro          # Languages listing page
    │   │   ├── components/
    │   │   │   └── LanguageCard.astro
    │   │   ├── layouts/
    │   │   └── [slug]/              # Language detail page
    │   │       ├── index.astro
    │   │       └── module/
    │   │           └── [moduleSlug].astro   # Module detail page
    │   ├── post/                    # Blog post detail
    │   │   ├── index.astro
    │   │   ├── [slug].astro
    │   │   ├── button-copy.ts       # Copy-to-clipboard script for code blocks
    │   │   └── _components/
    │   │       ├── CardBento.astro
    │   │       └── post-detail/
    │   │           └── PostDetail.astro
    │   ├── privacy-policy/
    │   └── support/                 # Contributors and open-source support page
    │       ├── index.astro
    │       ├── _support.scss
    │       ├── components/
    │       │   ├── SupportHero.astro
    │       │   ├── contributtors/
    │       │   │   └── _contributtors.scss
    │       │   └── github-anim/     # Animated GitHub branching SVG
    │       │       ├── GithubAnim.astro
    │       │       ├── _github-anim.scss
    │       │       └── svgs/
    │       │           ├── DivergeBranch.astro
    │       │           ├── GitIcon.astro
    │       │           ├── MainBranch.astro
    │       │           ├── MergeBranch.astro
    │       │           └── SofiIcon.astro
    │       └── contributor/
    │           ├── [slug].astro     # Individual contributor profile page
    │           ├── _contributor.scss
    │           └── rollList.js
    ├── sass/                        # Global SCSS design system
    │   ├── main.scss                # Entry point; imports all partials
    │   ├── _variables.scss          # Color palette, font, spacing tokens
    │   ├── _mixins.scss             # Reusable mixins (flexConfig, respond-to, text-gradient)
    │   ├── _animations.scss         # Keyframe animations
    │   ├── _post.scss               # Styles for WordPress Gutenberg HTML rendered inside #post
    │   └── base/
    │       └── _base.scss           # CSS reset and base element rules
    ├── services/                    # External data-fetching layer
    │   ├── wordpress.ts             # WP GraphQL client (fetch wrapper)
    │   ├── auth/
    │   │   ├── index.ts             # Auth service (login, register, token ops)
    │   │   └── getUserByName.ts
    │   └── querys/                  # GraphQL query functions grouped by domain
    │       ├── contributors/
    │       │   ├── contributor.js
    │       │   ├── contributors.js
    │       │   ├── getContributor.ts
    │       │   └── getContributors.ts
    │       ├── languages/
    │       │   ├── getLanguages.ts
    │       │   └── getLanguageDetail.ts
    │       ├── modules/
    │       │   └── getModuleDetail.ts
    │       ├── pages/
    │       │   ├── getAboutPage.ts
    │       │   ├── getLogo.ts
    │       │   ├── getMenu.ts
    │       │   └── page.ts
    │       └── posts/
    │           ├── addPost.ts
    │           ├── getCategories.ts
    │           ├── getCategoriesWithPosts.ts
    │           ├── getComments.ts
    │           ├── getPostBySlug.ts
    │           ├── getPostContent.ts
    │           ├── getPosts.ts
    │           ├── getPostsByCategory.ts
    │           ├── getResults.ts
    │           └── postComment.ts
    ├── shared/                      # Reusable cross-page components and UI primitives
    │   ├── components/              # Feature-level shared components
    │   │   ├── BaseHead.astro       # HTML head (meta, fonts, SEO)
    │   │   ├── ButtonToTop.astro
    │   │   ├── ThemeIcon.astro      # Dark/light mode toggle button
    │   │   ├── Comment/             # Single comment display
    │   │   ├── CommentForm/         # Comment submission form
    │   │   ├── Comments/            # Threaded comments list
    │   │   ├── CookiesBanner/       # React cookie consent banner
    │   │   ├── Footer/
    │   │   ├── Header/
    │   │   │   └── NavMenu/
    │   │   │       ├── NavMenu.astro
    │   │   │       └── MoreInfo.astro
    │   │   ├── MobileMenu/
    │   │   ├── Pagination/
    │   │   ├── PasswordInput/       # Accessible password input with toggle
    │   │   ├── PostCard/            # Blog post card for listings
    │   │   ├── SearchForm/
    │   │   ├── SideBar/
    │   │   │   └── cards-sidebar/
    │   │   └── SwiperCarousel/
    │   ├── icons/
    │   │   └── BackArrow.astro
    │   └── ui/                      # Atomic UI primitives
    │       ├── BackgroundGradient.astro
    │       ├── Button/
    │       ├── DateTag.astro
    │       ├── DividerBottom.astro
    │       ├── DividerTop.astro
    │       ├── GradientBg/
    │       ├── HamburgerBtn/
    │       ├── InputComponent.astro
    │       ├── Loader.astro
    │       ├── Logo/
    │       ├── SocialIcons/
    │       └── Title/
    ├── types/                       # TypeScript type definitions
    │   ├── post.type.ts
    │   ├── author.type.ts
    │   ├── category.type.ts
    │   ├── loggedUser.type.ts
    │   ├── registerUser.type.ts
    │   ├── user.type.ts
    │   ├── languages.type.ts
    │   ├── LanguageDetail.type.ts
    │   ├── moduleDetail.type.ts
    │   ├── contributtors.types.ts
    │   └── contributorResponse.type.ts
    └── utils/                       # Pure utility functions
        ├── index.ts                 # Re-exports barrel
        ├── categoryMapper.ts
        ├── cookies.js               # Cookie read/write helpers
        ├── fast-youtube.ts          # YouTube latest video fetcher
        ├── findCategory.js
        ├── flatListToHierarchical.js  # Converts flat comment list to tree
        ├── formatedDate.js
        ├── groupModules.ts          # Groups modules by language for learning paths
        └── sanatizeHtml.ts
```

---

## Path Aliases

Vite and SCSS both resolve the following aliases (configured in `astro.config.mjs`):

| Alias | Resolves to |
|---|---|
| `@src` | `src/` |
| `@layouts` | `src/layouts/` |
| `@shared` | `src/shared/` |
| `@utils` | `src/utils/` |
| `@content` | `src/content/` |
| `@pages` | `src/pages/` |
| `@services` | `src/services/` |
| `@sass` | `src/sass/` |
| `@data` | `src/data/` |
| `@controllers` | `src/controllers/` |

---

## API Endpoints

All API routes live under `src/pages/api/` and are handled server-side via Vercel SSR.

| Method | Route | Description |
|---|---|---|
| POST | `/api/auth/login` | Authenticate user, issue JWT cookie |
| POST | `/api/auth/register` | Create new WordPress user account |
| POST | `/api/auth/signout` | Clear auth cookie |
| GET | `/api/comments/replies` | Fetch threaded comment replies |

---

## Authentication Flow

1. The user submits credentials via `login.astro`.
2. The form posts to `/api/auth/login.ts`.
3. The login handler calls `src/services/auth/index.ts`, which exchanges credentials with the WordPress REST API.
4. On success, a signed JWT is stored in an HTTP-only cookie using `jsonwebtoken`.
5. Protected pages (e.g., `/dashboard`) read and verify the cookie server-side on each request.
6. Signout clears the cookie via `/api/auth/signout.ts`.

---

## Styling Architecture

The project uses a hybrid Tailwind CSS + Sass approach:

- **Tailwind CSS 3**: Utility classes for layout and spacing.
- **Sass (SCSS)**: Used for complex component styles, the global design system, and WordPress Gutenberg content rendering.
- **`src/sass/_variables.scss`**: Central color palette and design tokens (e.g., `$french-violet`, `$ufo-green`, `$light-violet`).
- **`src/sass/_mixins.scss`**: Reusable mixins including `flexConfig`, `respond-to` breakpoint helper, and `text-gradient`.
- **`src/sass/_post.scss`**: Comprehensive styles for the `#post` container that renders raw Gutenberg HTML from WordPress. Includes tables, code blocks, blockquotes, figures, scrollbar styles, and the image lightbox `<dialog>` element.
- **SCSS aliases**: `@use "@sass/variables"` and `@use "@sass/mixins"` are resolved via the custom SCSS importer in `astro.config.mjs`.

---

## WordPress GraphQL Integration

All data fetching goes through `src/services/wordpress.ts`, which is a typed fetch wrapper around the WP GraphQL endpoint. Query functions are organized by domain under `src/services/querys/`:

- **posts**: Fetch post listings, individual posts by slug, categories, search results, and comments.
- **languages**: Fetch language learning path listings and per-language detail with module lists.
- **modules**: Fetch individual module content by slug (used in `[slug]/module/[moduleSlug].astro`).
- **contributors**: Fetch contributor profiles for the Support page.
- **pages**: Fetch static WordPress pages (About, menu structure, site logo).

---

## Deployment

The site is deployed to Vercel using the official `@astrojs/vercel` SSR adapter.

1. Connect your GitHub repository to Vercel.
2. Set the following environment variables in the Vercel dashboard:

   ```
   SECRET_USER
   SECRET_PASSWORD
   WPGRAPHQL_URL
   SECRET_KEY
   ```

3. Vercel automatically builds and deploys on every push to the `main` branch.

Production URL: `https://sofidev.blog/`

### robots.txt and Sitemap

The following routes are excluded from crawlers and the sitemap:

- `/private`
- `/login`
- `/dashboard`
- `/register`

---

## Categories

The blog organizes content in these main categories:

- **Tutoriales**: Step-by-step tutorials
- **Aprender a Programar**: Learning-to-code content
- **Astro**: Astro framework articles
- **JavaScript**: JavaScript tutorials and tips
- **Escritura**: Writing and documentation

---

## WordPress Backend Requirements

For the frontend to consume data and function correctly, the WordPress backend requires the following mandatory configuration.

### WordPress Installation

Active WordPress installation, either local (XAMPP / Local by Flywheel) or on a cloud server.

### Required Plugins

| Plugin | Purpose |
|---|---|
| WPGraphQL | Enables the GraphQL API, replacing or complementing the traditional REST API |
| WPGraphQL SEO | Extends the schema to expose Yoast SEO metadata in GraphQL queries |
| Yoast SEO | Required alongside WPGraphQL SEO for granular organic positioning control |
| Site Logo for WPGraphQL | Allows extracting the site logo configured in the theme customizer via GraphQL |
| Table of Contents Plus | Simplifies adding tables of contents in long articles; the parsed HTML can be extracted via GraphQL |
| WP Webhooks | Useful for triggering cache invalidation or static rebuilds when a new post is published |

### Optional Image Optimization

**Cloudinary**: Recommended integration at the WordPress level using its official plugin. Stores media in a CDN, saves bandwidth, and obfuscates the original WordPress server URL, reducing technological exposure risk.

---

## Application Flow

### Home Page and Initial SSR View

When a user enters a route (e.g., `/`), Astro invokes the functions inside `src/services/querys/` which make a POST `fetch` request to the WPGraphQL endpoint. Upon receiving the response, Astro composes all HTML on the server by rendering the components from `src/pages/home/_components/`. The fully composed HTML is delivered to the user without heavy client-side JavaScript, guaranteeing maximum speed.

### Post Detail Pages (`/post/[slug]`)

Post detail pages use `export const prerender = true`. At build time, Astro extracts the full list of slugs from WordPress via GraphQL and pre-builds static HTML files for each post. These are served from the edge CDN with extremely high performance.

### Comment Loading and Submission

Comment interactivity is orchestrated through `src/controllers/comments.controller.js`. Since Astro pre-builds or generates HTML server-side, submitting a comment triggers a request to the internal Astro endpoint `/api/comments/replies`. This proxied approach prevents WordPress credentials, tokens, and internal IPs from being exposed to the browser. The endpoint forwards the GraphQL mutation to WordPress using Basic Auth invisibly.

### Authentication Flow

1. The user submits credentials on the `/login` page.
2. The form sends a `POST` request to the Astro SSR endpoint `/api/auth/login.ts`.
3. Astro executes a WPGraphQL `LoginUser` mutation to authenticate the user against WordPress using the WPGraphQL JWT Authentication plugin.
4. WordPress validates the credentials and returns an `authToken` (JWT) along with the user's profile data.
5. The Astro server verifies the response, builds its own payload, and signs it locally using `jsonwebtoken` and the `SECRET_KEY` environment variable.
6. Astro sets this token as a secure, `HttpOnly`, `SameSite=Strict` cookie (`accessToken`) in the client's browser.
7. The user is redirected to `/dashboard`. Subsequent pages and API endpoints read this cookie via the `isLoggedIn()` utility to verify session state and protect restricted views.

---

## Authentication Setup (WordPress and Astro)

To enable the JWT-based login mechanism between Astro and WordPress, specific configuration is required on the WordPress backend.

### Required WordPress Plugins

1. Install and activate **WPGraphQL**.
2. Install and activate **WPGraphQL JWT Authentication** (install from its GitHub repository zip file).

   > **Warning**: Do not confuse this with the "JWT Authentication for WP REST API" plugin, which targets the REST API rather than GraphQL.

3. Ensure no conflicting Basic Auth plugins are active (e.g., "WP-API/Basic-Auth"). Global Basic Auth for GraphQL queries is handled natively by WordPress via Application Passwords.

### Configuration in `wp-config.php`

Add the following lines **before** the `/* That's all, stop editing! Happy publishing. */` comment and before the `require_once ABSPATH . 'wp-settings.php';` call:

```php
define( 'GRAPHQL_JWT_AUTH_SECRET_KEY', 'your_very_long_and_complex_secret_key_with_at_least_64_chars!' );
define( 'GRAPHQL_JWT_AUTH_CORS_ENABLE', true );
```

> **Note**: If the key is too short, WPGraphQL will throw an Internal Server Error stating that the "Provided key is too short" on login attempts.

### Frontend Environment Variable

On the Astro side, ensure your `.env` file contains the `SECRET_KEY` variable:

```env
SECRET_KEY=my_secure_astro_key_123
```

This key is completely independent of the WordPress JWT key. It is used exclusively by Astro to sign and verify the `accessToken` session cookie stored in the browser.

---

## License

This project is licensed under the ISC License. See [LICENSE](./LICENSE) for details.

---

## Author

**SofiDev** - [sofidev.blog](https://sofidev.blog)

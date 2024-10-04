import { k as createAstro, l as createComponent, m as renderTemplate, o as addAttribute, n as maybeRenderHead, p as renderComponent } from './astro/server_Bex-RV_O.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                          */

const SITE_TITLE = "SofiBlog";
const SITE_DESCRIPTION = "Desarrollo web";

const $$Astro = createAstro("https://blog.itssofi.dev");
const $$BaseHead = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseHead;
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site);
  const {
    mainTitle = SITE_TITLE,
    title = "Home",
    description = SITE_DESCRIPTION,
    image = "/img/branding/logo.png"
  } = Astro2.props;
  return renderTemplate`<!-- Global Metadata --><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" type="image/png" href="/img/branding/logo.png"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${mainTitle} | ${title}</title><!-- Canonical URL --><link rel="canonical"${addAttribute(canonicalURL, "href")}><!-- Primary Meta Tags --><meta name="title"${addAttribute(mainTitle, "content")}${addAttribute(title, "title")}><meta name="description"${addAttribute(description, "content")}><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"${addAttribute(Astro2.url, "content")}><meta property="og:title"${addAttribute(mainTitle, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(new URL(image, Astro2.url), "content")}><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"${addAttribute(Astro2.url, "content")}><meta property="twitter:title"${addAttribute(mainTitle, "content")}><meta property="twitter:description"${addAttribute(description, "content")}><meta property="twitter:image"${addAttribute(new URL(image, Astro2.url), "content")}><!-- css librerias/ cdn --><!-- Iconify CDN -->`;
}, "/home/sofidev/laboratorio/sofi-blog/src/components/BaseHead.astro", void 0);

const $$ThemeIcon = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate` ${maybeRenderHead()}<button id="themeToggle" data-astro-cid-hsoaq6cp> ${renderComponent($$result, "iconify-icon", "iconify-icon", { "class": "sun", "icon": "line-md:sun-rising-loop", "width": "32", "height": "32", "style": "color: #ad8700", "data-astro-cid-hsoaq6cp": true })} ${renderComponent($$result, "iconify-icon", "iconify-icon", { "class": "moon", "icon": "line-md:moon-loop", "width": "27", "height": "27", "style": "color: #00ffff", "data-astro-cid-hsoaq6cp": true })} </button> `;
}, "/home/sofidev/laboratorio/sofi-blog/src/components/atoms/ThemeIcon.astro", void 0);

export { $$BaseHead as $, $$ThemeIcon as a };

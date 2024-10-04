import { l as createComponent, m as renderTemplate, n as maybeRenderHead, o as addAttribute, k as createAstro, p as renderComponent, q as renderHead, t as renderSlot } from './astro/server_Bex-RV_O.mjs';
import 'kleur/colors';
import { $ as $$BaseHead, a as $$ThemeIcon } from './ThemeIcon_DL_bWM8E.mjs';
import 'clsx';
/* empty css                          */

const baseURL = `${"https://blog-sofi.api-wordpress.tech/graphql"}`;
async function wpquery({ query, variables = {} }) {
  const res = await fetch(baseURL, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query,
      variables
    })
  });
  if (!res.ok) {
    console.log(res);
    return {};
  }
  const { data } = await res.json();
  return data;
}

const menuData = [
    {text:"About", href:"#" },
    { text: "services", link: "#" },
    { text: "blog", link: "#" },
    { text: "Portafolio", link: "https://itssofi.dev/" }

];

const siteData = {
    siteTitle:"SofiDev",
    siteLogo:"/img/branding/logo.png",
    siteDesc:"Bienvenidos a mi blog. Aca encontraras tutoriales, artículos de programación y otros temas que me encanta escribir",
    siteSlogan:"Desarrollo Web",
    name: "Sofi",
    lastName: "Dev",

};

const $$Logo = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<a href="/" class="logo"> <img class="logo__img"${addAttribute(siteData.siteLogo, "src")}${addAttribute(`logo de ${siteData.siteTitle}`, "alt")}> <div class="logo__container"> <h3>${siteData.name}<span>${siteData.lastName}</span></h3> <p class="logo__slogan">${siteData.siteSlogan}</p> </div> </a>`;
}, "/home/sofidev/laboratorio/sofi-blog/src/components/atoms/Logo/Logo.astro", void 0);

const $$HamburgerBtn = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<button class="hamburger hamburger--collapse" type="button"> <span class="hamburger-box"> <span class="hamburger-inner"></span> </span> </button>`;
}, "/home/sofidev/laboratorio/sofi-blog/src/components/atoms/hamburgerBtn/hamburgerBtn.astro", void 0);

const $$Astro$1 = createAstro("https://blog.itssofi.dev");
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Header;
  const pagePathname = Astro2.url.pathname;
  return renderTemplate` ${maybeRenderHead()}<header class="header"> <div class="header__container "> ${renderComponent($$result, "Logo", $$Logo, {})} <nav class="header__menu"> <ul class="header__list"> ${pagePathname !== "/" && renderTemplate`<li class="header__item"> <a class="header__link" href="/">Home</a> </li>`} ${menuData.map((data) => renderTemplate`<li class="header__item"> <a class="header__link"${addAttribute(data.link, "href")}> ${data.text} </a> </li>`)} <div class="header__icons"></div> </ul> </nav> ${renderComponent($$result, "HamburgerButton", $$HamburgerBtn, {})} </div> </header>`;
}, "/home/sofidev/laboratorio/sofi-blog/src/components/molecules/Header/Header.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$ButtonToTop = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", '<div class="to__top " data-astro-cid-hov2kthu> ', ' </div> <script>\n  const cajaToTop = document.querySelector(".to__top");\n\n  cajaToTop.addEventListener("click", () => {\n    window.scrollTo({ top: 0, behavior: "smooth" });\n  });\n\n  window.addEventListener("scroll", () => {\n    if (window.pageYOffset > 300) {\n      cajaToTop.classList.add("show");\n    } else {\n      cajaToTop.classList.remove("show");\n    }\n  });\n<\/script> '])), maybeRenderHead(), renderComponent($$result, "iconify-icon", "iconify-icon", { "icon": "codicon:triangle-up", "width": "30", "height": "30", "style": "color: #63f6f4e9", "data-astro-cid-hov2kthu": true }));
}, "/home/sofidev/laboratorio/sofi-blog/src/components/atoms/ButtonToTop/ButtonToTop.astro", void 0);

const $$Astro = createAstro("https://blog.itssofi.dev");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const pathName = Astro2.url.pathname;
  return renderTemplate`<html lang="en"> <head>${pathName === "/" ? renderTemplate`${renderComponent($$result, "BaseHead", $$BaseHead, {})}` : renderTemplate`${renderComponent($$result, "BaseHead", $$BaseHead, { "title": pathName.charAt(1).toUpperCase() + pathName.slice(2).split("/")[0] })}`}${renderHead()}</head> <body> ${renderComponent($$result, "ThemeIcon", $$ThemeIcon, {})} ${renderComponent($$result, "ButtonToTop", $$ButtonToTop, {})} ${renderComponent($$result, "Header", $$Header, {})} <main> ${renderSlot($$result, $$slots["default"])} </main> </body></html>`;
}, "/home/sofidev/laboratorio/sofi-blog/src/layouts/Layout.astro", void 0);

export { $$Layout as $, wpquery as w };

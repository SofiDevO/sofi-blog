/* empty css                          */
import { k as createAstro, l as createComponent, m as renderTemplate, p as renderComponent, q as renderHead, t as renderSlot, n as maybeRenderHead, o as addAttribute } from './astro/server_Bex-RV_O.mjs';
import 'kleur/colors';
import { $ as $$BaseHead, a as $$ThemeIcon } from './ThemeIcon_DL_bWM8E.mjs';
import 'clsx';
/* empty css                       */

const $$Astro$2 = createAstro("https://blog.itssofi.dev");
const $$LayoutNoHeader = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$LayoutNoHeader;
  const pathName = Astro2.url.pathname;
  return renderTemplate`<html lang="en"> <head>${pathName === "/" ? renderTemplate`${renderComponent($$result, "BaseHead", $$BaseHead, {})}` : renderTemplate`${renderComponent($$result, "BaseHead", $$BaseHead, { "title": pathName.charAt(1).toUpperCase() + pathName.slice(2).split("/")[0] })}`}${renderHead()}</head> <body> ${renderComponent($$result, "ThemeIcon", $$ThemeIcon, {})} <main> ${renderSlot($$result, $$slots["default"])} </main> </body></html>`;
}, "/home/sofidev/laboratorio/sofi-blog/src/layouts/LayoutNoHeader.astro", void 0);

const $$Astro$1 = createAstro("https://blog.itssofi.dev");
const $$Title = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Title;
  const { titleDesc, clase } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<h2${addAttribute(`title text-gradient ${clase} `, "class")}>${titleDesc}</h2>`;
}, "/home/sofidev/laboratorio/sofi-blog/src/components/atoms/Title/Title.astro", void 0);

const $$Astro = createAstro("https://blog.itssofi.dev");
const $$Button = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Button;
  const { id, text } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<button class="button" type="button"${addAttribute(id, "id")}> <span class="button__content"> ${text} </span> </button>`;
}, "/home/sofidev/laboratorio/sofi-blog/src/components/atoms/Button/Button.astro", void 0);

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate` ${renderComponent($$result, "LayoutNoHeader", $$LayoutNoHeader, { "data-astro-cid-zetdm5md": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="error" data-astro-cid-zetdm5md> <div class="error__container" data-astro-cid-zetdm5md> ${renderComponent($$result2, "Title", $$Title, { "title": "404 NOT FOUND", "size": "big", "data-astro-cid-zetdm5md": true })} <p class="error__message " data-astro-cid-zetdm5md>La pagina a la que tratas de acceder no existe</p> <p class="error__message" data-astro-cid-zetdm5md>Esta página está en construcción. Por favor, vuelve más tarde</p> <img src="/img/sofi-laptop.gif" alt="logo" data-astro-cid-zetdm5md> ${renderComponent($$result2, "Button", $$Button, { "text": "Volver", "id": "backButton", "data-astro-cid-zetdm5md": true })} </div> </section> ` })} `;
}, "/home/sofidev/laboratorio/sofi-blog/src/pages/404.astro", void 0);

const $$file = "/home/sofidev/laboratorio/sofi-blog/src/pages/404.astro";
const $$url = "/404";

export { $$404 as default, $$file as file, $$url as url };

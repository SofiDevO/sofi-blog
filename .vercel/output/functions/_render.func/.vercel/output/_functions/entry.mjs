import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_DnVqbZlp.mjs';
import { manifest } from './manifest_B99pNOdU.mjs';

const serverIslandMap = new Map([
	['Posts', () => import('./chunks/Posts_m4sYKLIM.mjs')],
	['PostCard', () => import('./chunks/PostCard_BOvHz1PL.mjs')],
	['Header', () => import('./chunks/Header_Dm3pveev.mjs')],
]);;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/blog/_slug_.astro.mjs');
const _page3 = () => import('./pages/categories/_slug_.astro.mjs');
const _page4 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/blog/[slug].astro", _page2],
    ["src/pages/categories/[slug].astro", _page3],
    ["src/pages/index.astro", _page4]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "7372243f-71b2-40d4-81a8-2c1514e693f4",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };

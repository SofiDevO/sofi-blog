/* empty css                          */
import { k as createAstro, l as createComponent, m as renderTemplate, n as maybeRenderHead, o as addAttribute, u as unescapeHTML, p as renderComponent } from './astro/server_Bex-RV_O.mjs';
import 'kleur/colors';
import { w as wpquery, $ as $$Layout } from './Layout_D3DMLAEe.mjs';
import 'clsx';
/* empty css                         */

const $$Astro = createAstro("https://blog.itssofi.dev");
const $$PostCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PostCard;
  const {
    link,
    linkBody = "Leer m\xE1s",
    title,
    body,
    image,
    altdesc,
    author,
    authorImage,
    authorFirstName,
    authorLastName,
    categories,
    categorySlug,
    // Recibir el slug de categoría
    date
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<article class="post-card"> <!-- Imagen del post --> <div class="post-card__image-container"> <img${addAttribute(altdesc, "alt")}${addAttribute(image, "src")} class="post-card__image"> <div class="post-card__image-overlay"></div> </div> <!-- Contenido del post --> <div class="post-card__content"> <!-- Autor e información adicional --> <div class="post-card__author"> <img${addAttribute(authorImage, "src")}${addAttribute(`${authorFirstName} ${authorLastName}`, "alt")} class="post-card__author-image"> <div class="post-card__author-info"> <p class="post-card__author-name">${authorFirstName} ${authorLastName}</p> <time${addAttribute(date, "datetime")} class="post-card__date">${new Date(date).toLocaleDateString()}</time> </div> </div> <!-- Título --> <a${addAttribute(link, "href")}> <h3 class="post-card__title">${title}</h3> </a> <!-- Descripción --> <fragment class="post-card__excerpt">${unescapeHTML(body)}</fragment> <!-- Categorías --> <div class="post-card__categories"> ${categories.map((category) => renderTemplate`<a${addAttribute(`/categories/${category.slug}`, "href")} class="post-card__category"> ${category.name} </a>`)} </div> <!-- Leer más link --> <a${addAttribute(link, "href")} class="post-card__read-more"> ${linkBody} <span class="post-card__read-more-icon">&rarr;</span> </a> </div> </article>`;
}, "/home/sofidev/laboratorio/sofi-blog/src/components/atoms/PostCard/PostCard.astro", void 0);

// Fetch the data server-side

const cardsData = await wpquery({
  query: `
      query getPostCards {
        posts {
          nodes {
            title
            slug
            featuredImage {
              node {
                altText
                mediaItemUrl
              }
            }
            author {
              node {
                avatar {
                  url
                }
                firstName
                lastName
                name
                slug
              }
            }
            date
            excerpt
            categories {
              nodes {
                name
                slug
                parent {
                  node {
                    name
                    slug
                  }
                }
              }
            }
          }
        }
      }
    `,
});

const $$Posts = createComponent(($$result, $$props, $$slots) => {
  if (!cardsData?.posts?.nodes) {
    throw new Error("Los datos de las publicaciones no est\xE1n disponibles.");
  }
  const sortedPosts = cardsData.posts.nodes.sort(
    (a, b) => Date.parse(b.date) - Date.parse(a.date)
  );
  const postsByCategory = sortedPosts.reduce((acc, post) => {
    const parentCategory = post.categories.nodes.find(
      (category) => category.parent?.node
    ) ? post.categories.nodes.find((category) => category.parent?.node).parent.node.name : post.categories.nodes[0].name;
    if (!acc[parentCategory]) {
      acc[parentCategory] = [];
    }
    acc[parentCategory].push(post);
    return acc;
  }, {});
  if (Object.keys(postsByCategory).length === 0) {
    throw new Error("No hay posts agrupados por categor\xEDas.");
  }
  return renderTemplate`${maybeRenderHead()}<div class="categories__container"> ${Object.keys(postsByCategory).map((category) => renderTemplate`<section class="category__section"${addAttribute(category, "id")}> <h2 class="category__title">${category}</h2> <ul role="list" class="link-card-grid"> ${postsByCategory[category].map((post) => {
    const categories = post.categories.nodes.map((category2) => ({
      name: category2.name,
      slug: category2.slug,
      parentCategory: category2.parent?.node?.name || null,
      parentCategorySlug: category2.parent?.node?.slug || null
    }));
    const featuredImage = post.featuredImage?.node?.mediaItemUrl || "/img/branding/logo.png";
    const altText = post.featuredImage?.node?.altText || "Imagen no disponible";
    const primaryCategory = post.categories.nodes[0];
    const parentCategory = primaryCategory.parent?.node;
    const categorySlug = parentCategory ? `/categories/${parentCategory.slug}/${primaryCategory.slug}` : `/categories/${primaryCategory.slug}`;
    return renderTemplate`${renderComponent($$result, "PostCard", $$PostCard, { "date": post.date, "link": `/blog/${post.slug}`, "title": post.title, "body": post.excerpt, "linkBody": "Leer m\xE1s", "image": featuredImage, "altText": altText, "author": post.author.node.name, "authorImage": post.author.node.avatar.url, "authorFirstName": post.author.node.firstName, "authorLastName": post.author.node.lastName, "categories": categories, "categorySlug": categorySlug })}`;
  })} </ul> </section>`)} </div>`;
}, "/home/sofidev/laboratorio/sofi-blog/src/components/organisms/Posts/Posts.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "Posts", $$Posts, {})} </main> ` })} `;
}, "/home/sofidev/laboratorio/sofi-blog/src/pages/index.astro", void 0);

const $$file = "/home/sofidev/laboratorio/sofi-blog/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };

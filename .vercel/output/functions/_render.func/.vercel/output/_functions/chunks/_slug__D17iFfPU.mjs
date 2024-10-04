/* empty css                          */
import { k as createAstro, l as createComponent, m as renderTemplate } from './astro/server_Bex-RV_O.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro("https://blog.itssofi.dev");
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  return renderTemplate`<!-- ---
import { wpquery } from "@src/data/wordpress"; // Importa la función para obtener datos de WordPress
import Layout from "@src/layouts/Layout.astro"; // Importa el diseño de la página
import PostCard from "@atoms/PostCard/PostCard.astro"; // Importa el componente PostCard

const { slug } = Astro.params; // Obtén el slug de la categoría desde la URL

// Implementación de getStaticPaths para rutas dinámicas de categorías
export async function getStaticPaths(slug) {
    const cardsData = await wpquery({
        query: \`
            query getPostCards {
                posts {
                    nodes {
                        title
                        slug
                        featuredImage {
                            node {
                                altText
                                mediaItemUrl
                                srcSet
                                sizes
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
                                slug
                            }
                        }
                    }
                }
            }
        \`,
    });

    // Mapeo de los posts para extraer las categorías
    return cardsData.posts.nodes.map((post) => ({
        params: { slug: post.categories.nodes[0]?.slug || "" }, // Usa el slug de la primera categoría
        props: { category: cardsData.posts.nodes }, // Pasa todos los posts como prop
    }));
}

// Obtener los posts de la categoría basada en el slug
const { category = [] } = Astro.props as { category: Post[] };

---

<Layout>
    <section id="category" class="flex items-center justify-center w-full pt-36 pb-20 px-10">
        {category.length > 0 ? (
            <ul role="list" class="link-card-grid">
                {category.map((post) => (
                    <PostCard
                        title={post.title}
                        link={\`/blog/\${post.slug}\`}
                        image={post.featuredImage?.node.mediaItemUrl || "/img/branding/logo.png"}
                        author={post.author.node.name}
                        authorImage={post.author.node.avatar.url}
                        date={post.date}
                        body={post.excerpt}
                    />
                ))}
            </ul>
        ) : (
            <p>No hay posts disponibles para esta categoría.</p>
        )}
    </section>
</Layout>
 -->`;
}, "/home/sofidev/laboratorio/sofi-blog/src/pages/categories/[slug].astro", void 0);

const $$file = "/home/sofidev/laboratorio/sofi-blog/src/pages/categories/[slug].astro";
const $$url = "/categories/[slug]";

export { $$slug as default, $$file as file, $$url as url };
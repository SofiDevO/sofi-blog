import React from "react";
import PostCard from "@src/components/atoms/PostCard/PostCard";
import { cardsData } from "@src/services/getCards.js";

const Posts = () => {


  if (!cardsData?.posts?.nodes) {
    throw new Error("Los datos de las publicaciones no están disponibles.");
  }
  // Ordenar los posts por fecha
  const sortedPosts = cardsData.posts.nodes.sort(
    (a, b) => Date.parse(b.date) - Date.parse(a.date)
  );

  // Agrupar los posts por categorías principales
  const postsByCategory = sortedPosts.reduce((acc, post) => {
    const parentCategory = post.categories.nodes[0]?.name;

    if (!acc[parentCategory]) {
      acc[parentCategory] = [];
    }

    acc[parentCategory].push(post);

    return acc;
  }, {});
  console.log(postsByCategory);

  return (
    <div className="categories__container">
      {Object.keys(postsByCategory).map((category) => (
        <section className="category__section" id={category} key={category}>
          <span className="category__title">
            <h2>{category}</h2>
          </span>
          <ul role="list" className="link-card-grid">
            {postsByCategory[category].map((post) => {
              const categories = post.categories.nodes.map((category) => ({
                name: category.name,
                slug: category.slug,
                parentCategory: category.parent?.node?.name || null,
                parentCategorySlug: category.parent?.node?.slug || null,
              }));

              // Fallback para la imagen destacada
              const featuredImage =
                post.featuredImage?.node?.mediaItemUrl ||
                "/img/branding/logo.png";
              const altText =
                post.featuredImage?.node?.altText || "Imagen no disponible";

              // Lógica para manejar el slug de subcategoría y el padre
              const primaryCategory = post.categories.nodes[0];
              const parentCategory = primaryCategory.parent?.node;

              // Generar el slug correcto según tenga o no padre
              const categorySlug = parentCategory
                ? `/categories/${parentCategory.slug}/${primaryCategory.slug}`
                : `/categories/${primaryCategory.slug}`;

              return (
                <PostCard
                  client:load
                  key={post.slug}
                  date={post.date}
                  link={`/blog/${post.slug}`}
                  title={post.title}
                  excerpt={post.excerpt}
                  linkBody="Leer más"
                  image={featuredImage}
                  altdesc={altText}
                  author={post.author.node.name}
                  authorImage={post.author.node.avatar.url}
                  authorFirstName={post.author.node.firstName}
                  authorLastName={post.author.node.lastName}
                  categories={categories}
                  categorySlug={categorySlug}
                />
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
};

export default Posts;

import { wpquery } from "@/services/wordpress";

export const categoryData = async () => {
  try {
    const data = await wpquery({
      query: `
        query getCategories(last: 100) {
          categories {
            nodes {
              name
              slug
              databaseId
              count
            }
          }
        }
      `,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};import { wpquery } from "@/services/wordpress";

export const getCategorieBySlug = async (slug) => {
  try {
    const data = await wpquery({
      query: `
                query getPostsByCategory {
                    categories(where: {slug: "${slug}"}, last:100){
                        edges {
                            node {
                                id
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
                                name
                            }
                        }
                    }
                }
            `,
    });
    if (data.categories.edges.length === 0) {
      throw new Error("Categoría no encontrada");
    }

    const categoryData = data.categories?.edges?.map((category) => {
        const { posts, ...restCategory } = category.node;
        return {
            ...restCategory,
            posts: posts?.nodes?.map((post) => {
                const { featuredImage, author, excerpt, categories, ...rest } = post;
                return {
                    excerpt: post.excerpt.replace(/\[.*?\]/g, "..."),
                    image: post?.featuredImage?.node,
                    author: post.author?.node,
                    categories: post?.categories?.nodes,
                    ...rest,
                };
            }),
        };
    });
    return categoryData[0];
  } catch (error) {
    return null;
  }
};

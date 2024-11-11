import { wpquery } from "@src/data/wordpress";

export const getCategorieBySlug = async (slug) => {
  try {
    const data = await wpquery({
      query: `
                query getPostsByCategory {
                    categories(where: {slug: "${slug}"}) {
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

    return data.categories.edges[0].node;
  } catch (error) {
    return null;
  }
};

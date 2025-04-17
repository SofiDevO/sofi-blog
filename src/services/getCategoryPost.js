import { wpquery } from "@src/data/wordpress";

export const categoryPost = async (databaseId) => {
  try {
    const data = await wpquery({
      query: `
        query categoryPost {
            posts(where: {categoryIn: ${databaseId}}) {
                nodes {
                excerpt(format: RENDERED)
                featuredImage {
                    node {
                    altText
                    link
                    mediaItemUrl
                    sizes(size: MEDIUM)
                    slug
                    sourceUrl(size: MEDIUM)
                    srcSet(size: LARGE)
                    author {
                        node {
                        avatar {
                            default
                            url
                        }
                        firstName
                        email
                        description
                        lastName
                        name
                        slug
                        }
                    }
                    }
                }
                isSticky
                slug
                title(format: RENDERED)
                categories {
                    nodes {
                    name
                    slug
                    databaseId
                    }
                }
                }
            }
            }
      `,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
import { wpquery } from "@src/data/wordpress";
export const getPostsBySlug = async (slug) => {
    try {
        const data = await wpquery({
            query: `
                query getPostBySlug {
                    postBy(slug: "${slug}") {
                        id
                        title
                        slug
                        author {
                            node {
                                name
                                avatar {
                                    url
                                }
                                firstName
                                lastName
                            }
                        }
                        content
                        date
                        excerpt
                        featuredImage {
                            node {
                                mediaItemUrl
                                altText
                            }
                        }
                    }
                }
            `,
        });

        if (data.postBy === null) {
            throw new Error("Post not found");
        }
        return data.postBy
    }
    catch (error) {
        return null
    }

}

export async function getPostsByUserID( id ) {
    const query = `
        query getPostsByUserrId {
            posts(where: {author: ${id}}) {
                edges {
                    node {
                        id
                        title
                    }
                }
            }
        }
    `;
    const data = await wpquery({ query });
    return data;
}
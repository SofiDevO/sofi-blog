import { wpquery } from "@src/data/wordpress";
export const getPostsBySlug = async (slug) => {
    try {
        const data = await wpquery({
            query: `
                query getPostBySlug {
                    postBy(slug: "${slug}") {
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

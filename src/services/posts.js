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
                                avatar {
                                    url
                                }
                                lastName
                                name
                                firstName
                                description
                                id
                                }
                            }
                        content(format: RENDERED)
                        date
                        excerpt
                        featuredImage {
                            node {
                                altText
                                mediaItemUrl
                                srcSet(size: LARGE)
                                sizes(size: LARGE)
                                altText
                                link
                                sourceUrl(size: LARGE)
                            }
                        }
                         tags {
                            nodes {
                            name
                            }
                        }
                        categories {
                            nodes {
                            name
                            }
                        }
                        commentCount
                        dateGmt
                        modified
                        seo {
                            cornerstone
                            readingTime
                            metaDesc
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
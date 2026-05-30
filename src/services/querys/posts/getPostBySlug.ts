import { wpquery } from "@/services/wordpress";
import type { Post } from "@/types/post.type";
interface PostContentResponse {
  postBy: Post;
}
export const getPostsBySlug = async (slug: string): Promise<Post | null> => {
  try {
    const data = await wpquery<PostContentResponse>({
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
      throw new Error("Post not f ound");
    }
    return data.postBy;
  } catch (error) {
    return null;
  }
};

export async function getPostsByUserID(id: string | number): Promise<any> {
  const query = `
        query getPostsByUserrId {
            posts(where: {author: ${id}}) {
                edges {
                    node {
                        id
                        title
                        slug
                        featuredImage {
                            node {
                                mediaItemUrl
                                altText
                            }
                        }
                    }
                }
            }
        }
    `;
  const data = await wpquery<any>({ query });
  return data;
}

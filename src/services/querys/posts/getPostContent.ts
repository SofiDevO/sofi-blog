import { wpquery } from "@services/wordpress";
import type { Post } from "@src/types/post.type";

interface PostContentResponse {
  posts: {
    nodes: Post[];
  };
}

export const PostContentData = await wpquery<PostContentResponse>({
  query: `
    query getPostContent {
        posts(first: 500) {
            nodes {
            slug
            date
            title
            databaseId
            id
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
        }
    `,
});

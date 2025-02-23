import { wpquery } from "@src/data/wordpress";

export const PostContentData = await wpquery({
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

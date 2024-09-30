import { wpquery } from "@src/data/wordpress";

// Fetch the data server-side

export const cardsData = await wpquery({
  query: `
      query getPostCards {
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
      }
    `,
});
import { wpquery } from "@src/data/wordpress";
export const Postdata = await wpquery({
    query: `
        query getPostContent {
          posts {
            nodes {
              author {
                node {
                  avatar {
                    url
                  }
                  lastName
                  name
                  firstName
                  description
                }
              }
              slug
              date
              title
              content(format: RENDERED)
              contentType {
                node {
                  id
                }
              }
              featuredImage {
                node {
                  mediaItemUrl
                }
              }
            }
          }
          tags {
            nodes {
              name
            }
          }
        }

        `,
  });
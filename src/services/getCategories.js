import { wpquery } from "@src/data/wordpress";
export const data = await wpquery({
    query: `
      query getCategories {
        posts {
          nodes {
            categories {
              nodes {
                slug
              }
            }
          }
        }
      }
    `,
  });
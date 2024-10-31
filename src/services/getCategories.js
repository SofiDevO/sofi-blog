import { wpquery } from "@src/data/wordpress";
export const categoryData = await wpquery({
    query: `
      query getCategories {
        categories {
          nodes {
            slug
            name
          }
        }
      }
    `,
  });
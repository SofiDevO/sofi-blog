import { wpquery } from "@src/data/wordpress";

export const categoryData = async () => {
  try {
    const data = await wpquery({
      query: `
        query getCategories {
          categories {
            nodes {
              name
              slug
              databaseId
              count
            }
          }
        }
      `,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
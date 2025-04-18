import { wpquery } from "@src/data/wordpress";

export const categoryData = async () => {
  try {
    const data = await wpquery({
      query: `
        query getCategories(last: 100) {
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
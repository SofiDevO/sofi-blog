import { wpquery } from "@src/data/wordpress";
export const categoryData = async () => {
  try{
 const data = await wpquery({
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
  }
  catch (error) {
    console.log(error);
  }
};

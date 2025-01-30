import { wpquery } from "@src/data/wordpress";
export  const cardsData = async () =>{
 try{
  const data = await wpquery({
  query: `
      query getPostCards {
        posts {
          nodes {
            title
            slug
            featuredImage {
              node {
                mediaItemUrl
                srcSet
                sizes
                altText
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
})
  return data;
 } catch (error) {
  return {}
 }
}

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
                altText
                mediaItemUrl
                srcSet(size: MEDIUM)
                sizes(size: LARGE)
                altText
                link
                sourceUrl(size: LARGE)
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
                    id
                  }
                }
                id
                uri
              }
            }
            isSticky
          }
        }
        comments {
          edges {
            node {
              id
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

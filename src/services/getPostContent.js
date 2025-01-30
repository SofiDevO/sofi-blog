import { wpquery } from "@src/data/wordpress";
export const Postdata =  async () => {
  try {

const data = await wpquery({
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
                id
              }
            }
            slug
            date
            title
            content(format: RENDERED)
            featuredImage {
              node {
                mediaItemUrl
                srcSet
              }
            }
            isComment
            databaseId
            id
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
          }
          pageInfo {
            endCursor
            startCursor
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
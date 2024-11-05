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
                comments {
                  nodes {
                    author {
                      node {
                        url
                        name
                        avatar {
                          default
                          url
                        }
                      }
                    }
                    commentId
                    content(format: RENDERED)
                    date
                    id
                    replies {
                      nodes {
                        author {
                          node {
                            url
                            name
                            avatar {
                              default
                              url
                            }
                          }
                        }
                        content(format: RENDERED)
                        date
                      }
                    }
                  }
                }
              }
            }
            slug
            date
            title
            content(format: RENDERED)
            contentType {
              node {
                id
                isComment
              }
            }
            featuredImage {
              node {
                mediaItemUrl
              }
            }
            tags {
              nodes {
                name
              }
            }
            isComment
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
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
export const querycontributors = `
        query getContributtors {
          contributtors {
            nodes {
              contribuidores {
                banner {
                  node {
                    altText
                    mediaItemUrl
                    sizes(size: ALX_MEDIUM)
                    srcSet(size: ALX_MEDIUM)
                  }
                }
                customcolor
                cv {
                  node {
                    mediaItemUrl
                  }
                }
                description
                email
                embedVideo
                name
                rol
                profilepic {
                  node {
                    altText
                    mediaItemUrl
                    sizes(size: ALX_SMALL)
                    srcSet(size: ALX_SMALL)
                  }
                }
              }
              socialLinks {
                github
                instagram
                koFi
                linkedin
                twitch
                youtube
              }
              slug
            }
          }
        }
    `;
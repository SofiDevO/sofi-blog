export const querycontributors = `
         query getContributtors {
          contributtors {
            nodes {
              contribuidores {
                banner {
                  node {
                    altText
                    mediaItemUrl
                    sizes(size: MEDIUM)
                    srcSet(size: MEDIUM)
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
                name
                rol
                profilepic {
                  node {
                    altText
                    mediaItemUrl
                    sizes(size: MEDIUM)
                    srcSet(size: MEDIUM)
                  }
                }
                socialLinks {
                  github
                  linkedin
                  portafolio
                  youtube
                  instagram
                  kofi
                  twitch
                }
              }
              slug
            }
          }
        }
    `;
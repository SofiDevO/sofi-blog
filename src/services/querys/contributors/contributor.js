// Fragmento reutilizable para conexiones de usuario ACF
export const AcfUserConnectionFragment = `
  fragment AcfUserConnectionFragment on AcfUserConnection {
    nodes {
      username
      posts {
        nodes {
          title(format: RAW)
          slug
          excerpt(format: RAW)
          featuredImage {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
      avatar {
        url
        default
      }
    }
  }
`;

export const queryContributor = (slug) => `
    query getContributor {
        contributtor(idType: SLUG, id: "${slug}") {
             socialLinks {
                github
                instagram
                koFi
                linkedin
                twitch
                youtube
                }
                title(format: RENDERED)
                contribuidores {
                banner {
                    node {
                    altText
                    mediaItemUrl
                    sizes(size: ALX_MEDIUM)
                    srcSet(size: ALX_MEDIUM)
                    authorDatabaseId
                    }
                }
                customcolor
                cv {
                    node {
                    link
                    }
                }
                description
                email
                name
                profilepic {
                    node {
                    altText
                    mediaItemUrl
                    srcSet(size: ALX_MEDIUM)
                    sizes(size: ALX_MEDIUM)
                    }
                }
                rol
                tuUsuario {
                    ...AcfUserConnectionFragment
                }
                }
                slug
            }
            }
            ${AcfUserConnectionFragment}
`;

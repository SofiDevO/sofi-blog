// Fragmento reutilizable para conexiones de usuario ACF
export const AcfUserConnectionFragment = `
  fragment AcfUserConnectionFragment on AcfUserConnection {
    nodes {
      username
      posts {
        nodes {
          title
          slug
          excerpt
          featuredImage {
            node {
              altText
              mediaItemUrl
            }
          }
          author {
            node {
              lastName
              firstName
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
        title(format: RENDERED)
          contribuidores {
            banner {
              node {
                altText
                mediaItemUrl
                authorDatabaseId
                sizes(size: MEDIUM)
                srcSet(size: MEDIUM)
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
              }
            }
            rol
            tuUsuario {
              ...AcfUserConnectionFragment
            }
            socialLinks {
              github
              instagram
              kofi
              linkedin
              portafolio
              twitch
              youtube
            }
          }
          slug
        }
      }
  ${AcfUserConnectionFragment}
`;



export const queryContributor = (slug)=> `
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
            embedVideo
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
            }
            slug
        }
        }
`
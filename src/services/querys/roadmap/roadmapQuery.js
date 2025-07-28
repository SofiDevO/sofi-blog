
export const roadmapQuery = `
    query getRoadmaps {
        developerRoadMaps {
            nodes {
            content
            slug
            title
            featuredImage {
                node {
                altText
                mediaItemUrl
                sizes(size: ALX_MEDIUM)
                srcSet(size: ALX_MEDIUM)
                }
            }
            infoRoadmap {
                level
                modulos {
                nodes {
                    slug
                }
                }
            }
            }
        }
        }
`;

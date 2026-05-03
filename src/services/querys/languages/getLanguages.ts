import { wpquery } from "@src/data/wordpress";
import type { LanguagesResponse } from "@src/types/languages.type";

export const getLanguages = async () => {
  const data = await wpquery<LanguagesResponse>({
    query: `
        query NewQuery {
          languages {
            nodes {
              title
              slug
              date
              curso {
                description
                modulo {
                  nodes {
                    slug
                    ... on Module {
                      title
                      slug
                      }
                      }
                      }
                excerp
                icon {
                  node {
                    altText
                    mediaItemUrl
                    sizes(size: MEDIUM_LARGE)
                    srcSet(size: MEDIUM)
                  }
                }
              }
            }
          }
        }
    `,
  });

  return data.languages.nodes;
};

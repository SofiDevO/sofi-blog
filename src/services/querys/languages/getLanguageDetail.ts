import { wpquery } from "@services/wordpress";
import type { LanguageDetailResponse } from "@src/types/LanguageDetail.type";

export const getLanguageDetail = async () => {
  const data = await wpquery<LanguageDetailResponse>({
    query: `
        query getLanguageDetail {
            languages {
                nodes {
                curso {
                    icon {
                    node {
                        srcSet(size: MEDIUM)
                        sizes(size: MEDIUM)
                        mediaItemUrl
                    }
                    }
                    modulo {
                    nodes {
                        ... on Module {
                        title
                        slug
                        moduleFields {
                          leccion
                          modulo
                        }
                        }
                    }
                    }
                }
                slug
                title
                content(format: RENDERED)
                }
            }
            }
    `,
  });

  return data?.languages?.nodes;
};

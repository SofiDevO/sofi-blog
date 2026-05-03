import { wpquery } from "@src/data/wordpress";
import type { LanguageDetailResponse } from "@src/types/LanguageDetail.type";

export const getLanguageDetail = async () => {
  const data = await wpquery<LanguageDetailResponse>({
    query: `
        query getLanguageDetail {
            languages {
                nodes {
                curso {
                    description
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
                        }
                    }
                    }
                }
                slug
                title
                }
            }
            }
    `,
  });

  return data?.languages?.nodes;
};

import { wpquery } from "@services/wordpress";
import type { LanguageDetailResponse } from "@types/LanguageDetail.type";

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

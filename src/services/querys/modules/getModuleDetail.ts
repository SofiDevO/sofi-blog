import { wpquery } from "@/services/wordpress";
import type { ModuleDetailResponse, ModuleNode } from "@/types/moduleDetail.type";

export const getModuleDetail = async (): Promise<ModuleNode[]> => {
  const data = await wpquery<ModuleDetailResponse>({
    query: `
      query getModuleDetail {
        modules {
          nodes {
            databaseId
            slug
            title
            moduleFields {
              recursos {
                node {
                  mediaItemUrl
                }
              }
            }
            content(format: RENDERED)
            date
            featuredImage {
              node {
                altText
                mediaItemUrl
                sizes(size: MEDIUM)
                srcSet(size: MEDIUM)
              }
            }
          }
        }
      }
    `,
  });

  return data?.modules?.nodes ?? [];
};

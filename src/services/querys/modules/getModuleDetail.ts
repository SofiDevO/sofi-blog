import { wpquery } from "@services/wordpress";
import type {
  ModuleDetailResponse,
  ModuleNode,
} from "@src/types/moduleDetail.type";

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
              leccion
              modulo
              recursos {
                node {
                  mediaItemUrl
                }
              }
              multimedia
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

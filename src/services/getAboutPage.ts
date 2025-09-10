import { wpquery } from "@src/data/wordpress";
type AboutPage = {
    title: string;
    id: number;
    blocks: Array<{
        name: string;
        attributes: {
            content: string;
            url?: string;
            caption?: string;
            width?: number;
            height?: number;
        };
    }>;
}

import { queryPage } from "./querys/page";

export async function getAboutPage(id: number): Promise<AboutPage> {
  try {
    const data = await wpquery<any>({ query: queryPage(id) });

  const pageNodes = data?.pages?.nodes;

  if (!Array.isArray(pageNodes) || pageNodes.length === 0) {
      throw new Error(`About page not found with id: ${id}`);
    }

    const node = pageNodes[0];

    const aboutPage: AboutPage = {
      title: node?.title ?? "",
      id,
      blocks: Array.isArray(node?.blocks) ? node.blocks : [],
    };

    return aboutPage;
  } catch (error) {
    console.error('Error fetching about page:', error);
    throw new Error(`Failed to fetch about page with id: ${id}`);
  }
}

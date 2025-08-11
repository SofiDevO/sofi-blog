import { wpquery } from "@src/data/wordpress";
import type { CardContributtor, SocialLinks } from "@src/types/contributtors.types";
import { querycontributors } from "./querys/contributors/contributors";
import type { ContributorResponse, Node } from "@src/types/contributorResponse.type";

export const getContributtors: () => Promise<CardContributtor[]> = async () => {
  try {
    const response = await wpquery<ContributorResponse>({ query: querycontributors });

    if (!response?.contributtors?.nodes) {
      console.warn("No contributors data found in response");
      return [];
    }

    const nodes: Node[] = response.contributtors.nodes;

  return nodes.map((user: Node): CardContributtor => {
    const bannerNode = user.contribuidores?.banner?.node;
    const profileNode = user.contribuidores?.profilepic?.node;
    const socialLinks: SocialLinks = user?.contribuidores?.socialLinks;

    const base: CardContributtor = {
      customcolor: user.contribuidores?.customcolor,
      email: user.contribuidores?.email,
      name: user.contribuidores?.name || "Nombre no disponible",
      rol: user.contribuidores?.rol || [],
      slug: user.slug,
      socialLinks: socialLinks || {},
      ...(bannerNode
        ? {
            banner: {
              altText: bannerNode.altText,
              mediaItemUrl: bannerNode.mediaItemUrl,
              sizes: bannerNode.sizes,
              srcSet: bannerNode.srcSet,
            },
          }
        : {}),
      ...(profileNode
        ? {
            profilepic: {
              altText: profileNode.altText,
              mediaItemUrl: profileNode.mediaItemUrl,
              sizes: profileNode.sizes,
              srcSet: profileNode.srcSet,
            },
          }
        : {}),
    };

    return base;
  });
  } catch (error) {
    console.error("Error fetching contributors:", error);
    return [];
  }
};

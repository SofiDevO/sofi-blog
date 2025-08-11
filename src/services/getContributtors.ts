import { wpquery } from "@src/data/wordpress";
import type { CardContributtor, SocialLinks } from "@src/types/contributtors.types";
import { querycontributors } from "./querys/contributors/contributors";
import type { ContributorResponse, Node } from "@src/types/contributorResponse.type";

// Always resolve to an array; never return undefined so callers can safely .map
export const getContributtors: () => Promise<CardContributtor[]> = async () => {
  const data = await wpquery<ContributorResponse["data"]>({ query: querycontributors }).catch(() => undefined);

  const nodes: Node[] = data?.contributtors?.nodes ?? [];

  if (nodes.length === 0) return [];

  return nodes.map((user: Node): CardContributtor => {
    const bannerNode = user.contribuidores?.banner?.node;
    const profileNode = user.contribuidores?.profilepic?.node;
    const socialLinks: SocialLinks = user.socialLinks;

    const base: CardContributtor = {
      customcolor: user.contribuidores?.customcolor,
      email: user.contribuidores?.email,
      name: user.contribuidores?.name,
      rol: user.contribuidores?.rol ?? [],
      slug: user.slug,
      socialLinks,
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
};

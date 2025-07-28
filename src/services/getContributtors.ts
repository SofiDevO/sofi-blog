import { wpquery } from "@src/data/wordpress";
import type { CardContributtor, SocialLinks } from "@src/types/contributtors.types";

import { querycontributors } from "./querys/contributors/contributors";
import type { ContributorResponse, Node } from "@src/types/contributorResponse.type";
export const getContributtors: () => Promise<CardContributtor[]> = async () => {

  const data = await wpquery<ContributorResponse["data"]>({ query:querycontributors});


  const result =
    data &&
    data.contributtors?.nodes?.map((user: Node): CardContributtor  => {
      const banner = user.contribuidores?.banner?.node
      const profilepic = user.contribuidores?.profilepic?.node
      const socialLinks: SocialLinks = user?.socialLinks
      const rol: string[] = user.contribuidores.rol
      return {
        banner: {
          altText: banner.altText,
          mediaItemUrl: banner.mediaItemUrl,
          sizes: banner.sizes,
          srcSet: banner.srcSet
        },
        customcolor: user?.contribuidores?.customcolor,
        email: user?.contribuidores?.email,
        name: user?.contribuidores?.name,
        profilepic: {
          altText: profilepic.altText,
          mediaItemUrl: profilepic.mediaItemUrl,
          sizes: profilepic.sizes,
          srcSet: profilepic.srcSet
        },
        rol: user?.contribuidores?.rol,
        slug: user?.slug,
        socialLinks,
      };
    });
  return result as CardContributtor[];
};

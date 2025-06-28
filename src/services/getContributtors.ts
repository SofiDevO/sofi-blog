import { wpquery } from "@src/data/wordpress";
import type { CardContributtor } from "@src/types/contributtors.types";

import { querycontributors } from "./querys/contributors/contributors";
export const getContributtors: () => Promise<CardContributtor[]> = async () => {
  const query = querycontributors;

  const data = await wpquery({ query });
  const result =
    data &&
    data.contributtors?.nodes?.map((user) => {
      return {
        banner: user?.contribuidores?.banner?.node,
        customcolor: user?.contribuidores?.customcolor,
        email: user?.contribuidores?.email,
        name: user?.contribuidores?.name,
        profilepic: user?.contribuidores?.profilepic.node,
        rol: user?.contribuidores?.rol,
        slug: user?.slug,
        socialLinks: user?.socialLinks,
      };
    });
  return result;
};

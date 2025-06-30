import { wpquery } from "@src/data/wordpress";
import { queryContributor } from "./querys/contributors/contributor";
import type { Contributtor } from "@src/types/contributtors.types";



export async function getContributor(slug): Promise<Contributtor> {
  try {
    const data = await wpquery({ query: queryContributor(slug) });
    return {
      ...data.contributtor.contribuidores,
      socialLinks: data?.contributtor?.socialLinks,
      cv: data?.contributtor?.contribuidores?.cv?.node?.link,
      banner: data?.contributtor?.contribuidores?.banner.node,
      profilepic: data?.contributtor?.contribuidores?.profilepic.node
    };
  } catch (error) {
    console.log(error);
  }
}

import { wpquery } from "@src/data/wordpress";
import { queryContributor } from "./querys/contributors/contributor";
import type { Contributtor } from "@src/types/contributtors.types";

export async function getContributor(slug: string): Promise<Contributtor> {
  try {
    const data = await wpquery({ query: queryContributor(slug) });

    // Extraer datos del usuario si existen
    const userConnection = data?.contributtor?.contribuidores?.tuUsuario?.nodes?.[0];

    return {
      ...data.contributtor.contribuidores,
      socialLinks: data?.contributtor?.socialLinks,
      cv: data?.contributtor?.contribuidores?.cv?.node?.link,
      banner: data?.contributtor?.contribuidores?.banner.node,
      profilepic: data?.contributtor?.contribuidores?.profilepic.node,
      // Incluir información del usuario del fragmento AcfUserConnectionFragment
      tuUsuario: userConnection ? {
        username: userConnection.username,
        avatar: userConnection.avatar,
        posts: userConnection.posts?.nodes || []
      } : null
    };
  } catch (error) {
    console.log('Error fetching contributor:', error);
    throw error;
  }
}
